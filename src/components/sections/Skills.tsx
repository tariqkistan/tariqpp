"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type Simulation,
} from "d3-force";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  SkillChip,
  SkillDetailPanel,
  GraphSkillNode,
  getHitRadius,
  type SimNode,
} from "@/components/ui/SkillNode";
import {
  skills,
  skillLinks,
  skillCategories,
  categoryColors,
  type SkillCategory,
} from "@/data/skills";
import { cn } from "@/lib/utils";

interface SimLink {
  source: string | SimNode;
  target: string | SimNode;
}

const DRAG_THRESHOLD_PX = 5;

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<Simulation<SimNode, SimLink> | null>(null);
  const nodesRef = useRef<SimNode[]>([]);
  const dragRef = useRef<{
    nodeId: string;
    pointerId: number;
    startClientX: number;
    startClientY: number;
    hasMoved: boolean;
  } | null>(null);

  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const [nodes, setNodes] = useState<SimNode[]>([]);
  const [links, setLinks] = useState<SimLink[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const activeId = selectedId ?? draggingId ?? hoveredId;

  const clientToSvg = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }, []);

  const moveNode = useCallback((id: string, x: number, y: number) => {
    const node = nodesRef.current.find((n) => n.id === id);
    if (!node) return;
    node.fx = x;
    node.fy = y;
    node.x = x;
    node.y = y;
    node.vx = 0;
    node.vy = 0;
    setNodes([...nodesRef.current]);
  }, []);

  const pauseSimulation = useCallback(() => {
    simulationRef.current?.alphaTarget(0);
  }, []);

  const pinNode = useCallback((id: string) => {
    const node = nodesRef.current.find((n) => n.id === id);
    if (node?.x != null && node?.y != null) {
      node.fx = node.x;
      node.fy = node.y;
      node.vx = 0;
      node.vy = 0;
    }
    pauseSimulation();
  }, [pauseSimulation]);

  const unpinAll = useCallback(() => {
    nodesRef.current.forEach((n) => {
      n.fx = null;
      n.fy = null;
    });
  }, []);

  const selectNode = useCallback(
    (id: string) => {
      setSelectedId((prev) => {
        if (prev === id) {
          unpinAll();
          if (!reducedMotion) simulationRef.current?.alphaTarget(0.02).restart();
          return null;
        }
        unpinAll();
        pinNode(id);
        return id;
      });
    },
    [pinNode, unpinAll, reducedMotion]
  );

  const clearSelection = useCallback(() => {
    setSelectedId(null);
    setHoveredId(null);
    setDraggingId(null);
    dragRef.current = null;
    unpinAll();
    if (!reducedMotion) simulationRef.current?.alphaTarget(0.02).restart();
  }, [unpinAll, reducedMotion]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGGElement>, nodeId: string) => {
      e.stopPropagation();
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);

      dragRef.current = {
        nodeId,
        pointerId: e.pointerId,
        startClientX: e.clientX,
        startClientY: e.clientY,
        hasMoved: false,
      };
      setDraggingId(nodeId);
      pinNode(nodeId);
      pauseSimulation();
    },
    [pauseSimulation, pinNode]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGGElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== e.pointerId) return;

      const dx = e.clientX - drag.startClientX;
      const dy = e.clientY - drag.startClientY;
      if (Math.hypot(dx, dy) > DRAG_THRESHOLD_PX) {
        drag.hasMoved = true;
      }

      if (drag.hasMoved) {
        const { x, y } = clientToSvg(e.clientX, e.clientY);
        moveNode(drag.nodeId, x, y);
      }
    },
    [clientToSvg, moveNode]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<SVGGElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== e.pointerId) return;

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }

      if (!drag.hasMoved) {
        selectNode(drag.nodeId);
      } else {
        setSelectedId(drag.nodeId);
        pinNode(drag.nodeId);
      }

      dragRef.current = null;
      setDraggingId(null);
    },
    [selectNode, pinNode]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const height = Math.min(520, Math.max(400, width * 0.55));
      setDimensions({ width, height });
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;

    const simNodes: SimNode[] = skills.map((s) => ({ ...s }));
    const simLinks: SimLink[] = skillLinks.map((l) => ({ ...l }));

    const simulation = forceSimulation<SimNode>(simNodes)
      .force(
        "link",
        forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance(90)
          .strength(0.35)
      )
      .force("charge", forceManyBody().strength(-180))
      .force("center", forceCenter(width / 2, height / 2))
      .force(
        "collide",
        forceCollide<SimNode>().radius(() => getHitRadius() + 4)
      )
      .alphaDecay(0.04)
      .velocityDecay(0.45);

    if (reducedMotion) {
      simulation.stop();
      simNodes.forEach((n, i) => {
        const angle = (i / simNodes.length) * Math.PI * 2;
        const r = Math.min(width, height) * 0.32;
        n.x = width / 2 + Math.cos(angle) * r;
        n.y = height / 2 + Math.sin(angle) * r;
      });
      nodesRef.current = simNodes;
      setNodes([...simNodes]);
      setLinks([...simLinks]);
    } else {
      simulation.alpha(0.9).restart();
      simulation.on("tick", () => {
        setNodes([...simNodes]);
        setLinks([...simLinks]);
      });

      simulationRef.current = simulation;
      nodesRef.current = simNodes;

      return () => {
        simulation.stop();
      };
    }
  }, [dimensions, reducedMotion]);

  useEffect(() => {
    if (selectedId) pinNode(selectedId);
  }, [selectedId, pinNode]);

  useEffect(() => {
    const sim = simulationRef.current;
    const simNodes = nodesRef.current;
    if (!sim || !simNodes.length) return;

    const { width, height } = dimensions;
    const centerForce = sim.force("center") as ReturnType<typeof forceCenter>;

    if (selectedCategory) {
      const categoryNodes = simNodes.filter((n) => n.category === selectedCategory);
      const cx =
        categoryNodes.reduce((s, n) => s + (n.x ?? 0), 0) / categoryNodes.length;
      const cy =
        categoryNodes.reduce((s, n) => s + (n.y ?? 0), 0) / categoryNodes.length;
      centerForce.x(cx || width / 2).y(cy || height / 2);
    } else {
      centerForce.x(width / 2).y(height / 2);
    }

    if (!reducedMotion && !selectedId) sim.alpha(0.25).restart();
  }, [selectedCategory, dimensions, reducedMotion, selectedId]);

  const handleCategoryChange = (cat: SkillCategory | null) => {
    setSelectedCategory(cat);
    clearSelection();
  };

  const isConnected = useCallback((a: string, b: string) =>
    skillLinks.some(
      (l) =>
        (l.source === a && l.target === b) ||
        (l.target === a && l.source === b)
    ), []);

  const isNodeActive = useCallback(
    (nodeId: string) => {
      if (activeId) {
        if (nodeId === activeId) return true;
        return isConnected(nodeId, activeId);
      }
      if (selectedCategory) {
        return skills.find((s) => s.id === nodeId)?.category === selectedCategory;
      }
      return true;
    },
    [activeId, selectedCategory, isConnected]
  );

  const isLinkActive = useCallback(
    (link: SimLink) => {
      const src = typeof link.source === "object" ? link.source.id : link.source;
      const tgt = typeof link.target === "object" ? link.target.id : link.target;
      if (activeId) return src === activeId || tgt === activeId;
      if (selectedCategory) {
        const s = skills.find((n) => n.id === src);
        const t = skills.find((n) => n.id === tgt);
        return s?.category === selectedCategory && t?.category === selectedCategory;
      }
      return true;
    },
    [activeId, selectedCategory]
  );

  const visibleSkills = selectedCategory
    ? skills.filter((s) => s.category === selectedCategory)
    : skills;

  const selectedSkill = skills.find((s) => s.id === selectedId);

  return (
    <section id="skills" className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Skills & Tech Stack"
          subtitle="Drag skills in the graph to rearrange, or pick from the list below"
        />

        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleCategoryChange(null)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              !selectedCategory
                ? "bg-gradient-accent text-[#0a0a0e]"
                : "border border-white/10 bg-white/5 text-muted hover:border-white/30"
            )}
          >
            All
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() =>
                handleCategoryChange(selectedCategory === cat ? null : cat)
              }
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                selectedCategory === cat
                  ? "text-[#0a0a0e]"
                  : "border border-white/10 bg-white/5 text-muted hover:border-white/30"
              )}
              style={
                selectedCategory === cat
                  ? { background: categoryColors[cat] }
                  : undefined
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-4 max-h-32 overflow-y-auto rounded-xl border border-white/10 bg-white/[0.02] p-3 md:max-h-none md:overflow-visible">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
            Quick select
          </p>
          <div className="flex flex-wrap gap-2">
            {visibleSkills.map((skill) => (
              <SkillChip
                key={skill.id}
                id={skill.id}
                name={skill.name}
                category={skill.category}
                isSelected={selectedId === skill.id}
                onClick={() => selectNode(skill.id)}
              />
            ))}
          </div>
        </div>

        {selectedSkill && (
          <div className="mb-4">
            <SkillDetailPanel node={selectedSkill} onClose={clearSelection} />
          </div>
        )}

        <div
          ref={containerRef}
          className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
          style={{ aspectRatio: "16/9", minHeight: 400 }}
          onClick={(e) => {
            if (e.target === e.currentTarget || (e.target as Element).tagName === "svg") {
              clearSelection();
            }
          }}
        >
          <svg
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
            className="h-full w-full touch-none select-none"
            role="img"
            aria-label="Interactive skill constellation graph — drag nodes to reposition"
          >
            <defs>
              <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00E5A0" />
                <stop offset="50%" stopColor="#5eead4" />
                <stop offset="100%" stopColor="#7dd3fc" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g pointerEvents="none">
              {links.map((link, i) => {
                const src = link.source as SimNode;
                const tgt = link.target as SimNode;
                if (src.x == null || tgt.x == null) return null;
                const active = isLinkActive(link);
                return (
                  <line
                    key={i}
                    x1={src.x}
                    y1={src.y!}
                    x2={tgt.x}
                    y2={tgt.y!}
                    stroke="url(#linkGradient)"
                    strokeWidth={active ? 1.5 : 0.5}
                    strokeOpacity={active ? 0.6 : 0.1}
                    filter={active ? "url(#glow)" : undefined}
                  />
                );
              })}
            </g>

            {/* Visual nodes (non-interactive) */}
            <g pointerEvents="none">
              {nodes.map((node) => {
                if (node.x == null || node.y == null) return null;
                const highlighted = isNodeActive(node.id);
                const isActive = activeId === node.id;

                return (
                  <g
                    key={`vis-${node.id}`}
                    transform={`translate(${node.x},${node.y})`}
                  >
                    <GraphSkillNode
                      node={node}
                      isActive={isActive}
                      isHighlighted={highlighted}
                    />
                  </g>
                );
              })}
            </g>

            {/* Hit targets on top — large, stable click areas */}
            <g>
              {nodes.map((node) => {
                if (node.x == null || node.y == null) return null;
                const hitR = getHitRadius();
                const isActive = activeId === node.id;

                const isDragging = draggingId === node.id;

                return (
                  <g
                    key={`hit-${node.id}`}
                    transform={`translate(${node.x},${node.y})`}
                    className={cn(
                      "cursor-grab focus:outline-none",
                      isDragging && "cursor-grabbing"
                    )}
                    onPointerDown={(e) => handlePointerDown(e, node.id)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onMouseEnter={() => {
                      if (!selectedId && !draggingId) setHoveredId(node.id);
                    }}
                    onMouseLeave={() => {
                      if (!selectedId && !draggingId) setHoveredId(null);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${node.name}, ${node.category}. Drag to reposition or click to select.`}
                    aria-pressed={isActive}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        selectNode(node.id);
                      }
                    }}
                  >
                    <circle
                      r={hitR}
                      fill="transparent"
                      className={cn(
                        (isActive || isDragging) && "fill-white/5 stroke-2",
                        (isActive || isDragging) && "stroke-white/30"
                      )}
                    />
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <p className="mt-4 text-center text-sm text-muted">
          Drag any skill box to move it · Click to select · Click empty space or Clear to release
        </p>
      </div>
    </section>
  );
}
