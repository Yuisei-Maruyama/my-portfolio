"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import Image from "next/image";
import Text from "./Typography";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.4 },
  },
};

const line = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const PARALLAX_FACTORS = [0.02, 0.03, 0.04];

const FLIGHT_LOG = [
  { flag: "\u{1F1FA}\u{1F1F8}", codes: ["IAD", "BWI"] },
  { flag: "\u{1F1EB}\u{1F1F7}", codes: ["CDG"] },
  { flag: "\u{1F1E9}\u{1F1EA}", codes: ["MUC", "BER"] },
  { flag: "\u{1F1EA}\u{1F1F8}", codes: ["BCN"] },
  { flag: "\u{1F1EE}\u{1F1F9}", codes: ["VCE", "FCO", "MXP"] },
  { flag: "\u{1F1F3}\u{1F1F1}", codes: ["AMS"] },
  { flag: "\u{1F1EC}\u{1F1E7}", codes: ["LHR", "BRS"] },
  { flag: "\u{1F1E7}\u{1F1EA}", codes: ["BRU"] },
  { flag: "\u{1F1F0}\u{1F1F7}", codes: ["ICN"] },
  { flag: "\u{1F1ED}\u{1F1F0}", codes: ["HKG"] },
  { flag: "\u{1F1F2}\u{1F1FE}", codes: ["KUL"] },
];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const perforationRef = useRef<HTMLDivElement>(null);
  const hitAreaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resetBtnRef = useRef<HTMLButtonElement>(null);

  // 3D tilt — MotionValue + Spring
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  // Stub detach — MotionValue + animate()
  const stubY = useMotionValue(0);
  const stubRotate = useMotionValue(0);
  const stubX = useMotionValue(0);
  const stubOpacity = useMotionValue(1);

  // Mouse tracking via CSS custom properties (no re-renders)
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouchDevice || prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    let latestX = 0;
    let latestY = 0;

    const update = () => {
      rafId = 0;
      const style = section.style;
      style.setProperty("--mouse-x", `${latestX}px`);
      style.setProperty("--mouse-y", `${latestY}px`);
      style.setProperty("--specular-x", `${(latestX / window.innerWidth) * 100}%`);
      style.setProperty("--specular-y", `${(latestY / window.innerHeight) * 100}%`);
      style.setProperty("--mouse-active", "1");

      // Parallax orbs
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      orbRefs.current.forEach((orb, i) => {
        if (!orb) return;
        const f = PARALLAX_FACTORS[i];
        orb.style.transform = `translate(${(latestX - halfW) * f}px, ${(latestY - halfH) * f}px)`;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Scissors cutting interaction (DOM-only, zero re-renders)
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouchDevice || prefersReducedMotion) return;

    const perforation = perforationRef.current;
    const hitArea = hitAreaRef.current;
    const canvas = canvasRef.current;
    const resetBtn = resetBtnRef.current;
    const card = cardRef.current;
    if (!perforation || !hitArea || !canvas || !resetBtn || !card) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    perforation.setAttribute("data-cuttable", "true");

    let cutting = false;
    let isCut = false;
    let progress = 0;
    let startX = 0;
    let perfRect: DOMRect;
    let perfCenterY = 0;
    let rafId = 0;
    let points: { x: number; y: number }[] = [];

    const setupCanvas = () => {
      perfRect = perforation.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = perfRect.width * dpr;
      canvas.height = 80 * dpr;
      canvas.style.width = `${perfRect.width}px`;
      ctx.scale(dpr, dpr);
    };

    const drawTrail = () => {
      if (points.length < 2) return;
      const w = perfRect.width;
      ctx.clearRect(0, 0, w, 80);

      // Build path
      const buildPath = () => {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1];
          const cur = points[i];
          const mx = (prev.x + cur.x) / 2;
          const my = (prev.y + cur.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
        }
        const last = points[points.length - 1];
        ctx.lineTo(last.x, last.y);
      };

      // Pass 1: Outer glow
      ctx.save();
      ctx.shadowBlur = 12;
      ctx.shadowColor = "rgba(245, 245, 247, 0.4)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      buildPath();
      ctx.stroke();
      ctx.restore();

      // Pass 2: Main metallic line
      ctx.save();
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "#a0a0a0");
      grad.addColorStop(0.5, "#f5f5f7");
      grad.addColorStop(1, "#c0c0c8");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      buildPath();
      ctx.stroke();
      ctx.restore();

      // Pass 3: Spark at tip
      const tip = points[points.length - 1];
      const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 150);
      const sparkRadius = 3 + pulse * 2;
      ctx.save();
      ctx.shadowBlur = 8 + pulse * 6;
      ctx.shadowColor = "#f5f5f7";
      ctx.fillStyle = `rgba(245, 245, 247, ${0.6 + pulse * 0.4})`;
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, sparkRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (isCut) return;
      perfRect = perforation.getBoundingClientRect();
      perfCenterY = perfRect.top + perfRect.height / 2;

      const relX = e.clientX - perfRect.left;
      const relY = Math.abs(e.clientY - perfCenterY);

      if (relX > perfRect.width * 0.3 || relY > 40) return;

      cutting = true;
      startX = perfRect.left;
      progress = 0;
      points = [];

      setupCanvas();
      canvas.style.opacity = "1";
      canvas.style.transition = "none";

      // Add initial point
      const canvasY = 40 + (e.clientY - perfCenterY);
      points.push({ x: relX, y: Math.max(0, Math.min(80, canvasY)) });

      e.preventDefault();
    };

    const cancelCut = () => {
      cutting = false;
      progress = 0;

      canvas.style.transition = "opacity 0.3s ease-out";
      canvas.style.opacity = "0";
      const onFade = () => {
        canvas.removeEventListener("transitionend", onFade);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        points = [];
      };
      canvas.addEventListener("transitionend", onFade);
    };

    const completeCut = () => {
      cutting = false;
      isCut = true;
      progress = 1;
      perforation.setAttribute("data-cut", "true");
      card.style.overflow = "visible";

      // Phase 1: snap down
      const phase1 = animate(stubY, 12, {
        type: "spring", stiffness: 300, damping: 20, mass: 0.8,
      });

      phase1.then(() => {
        // Phase 2: fly off
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        animate(stubY, -(vh * 1.2), { duration: 1.1, ease: "easeIn" });
        animate(stubX, vw * 0.25, { duration: 1.1, ease: "easeOut" });
        animate(stubRotate, -20, { duration: 1.1, ease: "easeIn" });
        const fadeOut = animate(stubOpacity, 0, {
          duration: 0.7, delay: 0.4, ease: "easeIn",
        });
        fadeOut.then(() => {
          resetBtn.style.display = "flex";
        });
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!cutting) return;

      const verticalDev = Math.abs(e.clientY - perfCenterY);
      if (verticalDev > 50) {
        cancelCut();
        return;
      }

      const newProgress = Math.max(
        progress,
        Math.min(1, (e.clientX - startX) / perfRect.width),
      );
      if (newProgress <= progress) return;
      progress = newProgress;

      // Add point (canvas-local coords)
      const relX = e.clientX - perfRect.left;
      const canvasY = 40 + (e.clientY - perfCenterY);
      points.push({ x: relX, y: Math.max(0, Math.min(80, canvasY)) });

      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        drawTrail();

        if (progress >= 0.99) {
          completeCut();
        }
      });
    };

    const handleMouseUp = () => {
      if (cutting && !isCut) {
        cancelCut();
      }
    };

    const handleReattach = () => {
      isCut = false;
      progress = 0;
      perforation.removeAttribute("data-cut");
      card.style.overflow = "";

      // Clear canvas
      canvas.style.transition = "opacity 0.3s ease-out";
      canvas.style.opacity = "0";
      const onFade = () => {
        canvas.removeEventListener("transitionend", onFade);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        points = [];
      };
      canvas.addEventListener("transitionend", onFade);

      // Reset stub near original position then spring back
      stubX.set(0);
      stubY.set(16);
      stubRotate.set(2);
      stubOpacity.set(0);

      animate(stubOpacity, 1, { duration: 0.25 });
      animate(stubY, 0, { type: "spring", stiffness: 120, damping: 14, mass: 2 });
      animate(stubRotate, 0, { type: "spring", stiffness: 80, damping: 12, mass: 1.5 });

      resetBtn.style.display = "none";
    };

    hitArea.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseup", handleMouseUp);
    resetBtn.addEventListener("click", handleReattach);

    return () => {
      hitArea.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      resetBtn.removeEventListener("click", handleReattach);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [stubY, stubRotate, stubX, stubOpacity]);

  // Card mouse interaction — 3D tilt + surface specular
  const handleCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (typeof window === "undefined" || window.innerWidth < 1024) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (e.clientX - centerX) / (rect.width / 2);
      const offsetY = (e.clientY - centerY) / (rect.height / 2);

      rotateX.set(-offsetY * 3);
      rotateY.set(offsetX * 3);

      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      card.style.setProperty("--card-specular-x", `${relX}px`);
      card.style.setProperty("--card-specular-y", `${relY}px`);
    },
    [rotateX, rotateY],
  );

  const handleCardMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ "--mouse-active": "0" } as React.CSSProperties}
    >
      {/* Mouse-following chrome specular reflection — pure CSS driven */}
      <div className="hero-specular absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="hero-chromatic absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Liquid mercury orbs */}
      <div
        ref={(el) => { orbRefs.current[0] = el; }}
        className="orb absolute top-1/4 left-1/4 w-[320px] h-[320px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200, 200, 210, 0.10) 0%, rgba(192, 192, 200, 0.04) 25%, rgba(192, 192, 200, 0.01) 50%, transparent 70%)",
          animation: "orb-float-1 20s ease-in-out infinite",
        }}
      />
      <div
        ref={(el) => { orbRefs.current[1] = el; }}
        className="orb absolute bottom-1/3 right-1/4 w-[260px] h-[260px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(180, 190, 220, 0.12) 0%, rgba(192, 192, 200, 0.05) 25%, rgba(192, 192, 200, 0.01) 50%, transparent 70%)",
          animation: "orb-float-2 15s ease-in-out infinite",
        }}
      />
      <div
        ref={(el) => { orbRefs.current[2] = el; }}
        className="orb absolute top-1/2 right-1/3 w-[220px] h-[220px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(210, 200, 230, 0.10) 0%, rgba(245, 245, 247, 0.04) 25%, rgba(245, 245, 247, 0.01) 50%, transparent 70%)",
          animation: "orb-float-3 18s ease-in-out infinite",
        }}
      />

      {/* Mercury caustics */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 600px 400px at 20% 30%, rgba(192,192,200,0.03), transparent 70%),
            radial-gradient(ellipse 500px 350px at 80% 70%, rgba(192,192,200,0.025), transparent 70%)
          `,
          animation: "caustic-drift-1 30s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 450px 300px at 70% 20%, rgba(210,210,220,0.02), transparent 60%),
            radial-gradient(ellipse 550px 380px at 30% 80%, rgba(200,200,210,0.02), transparent 60%)
          `,
          animation: "caustic-drift-2 25s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8">
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* Boarding Pass Card */}
          <motion.div variants={line} style={{ perspective: 1000 }}>
            <motion.article
              ref={cardRef}
              className="boarding-pass"
              aria-label="Profile boarding pass"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
              }}
            >
              {/* Card surface specular overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-xl z-10"
                style={{
                  background:
                    "radial-gradient(400px circle at var(--card-specular-x, 50%) var(--card-specular-y, 50%), rgba(255,255,255,0.06), transparent 60%)",
                }}
                aria-hidden="true"
              />

              {/* HEADER */}
              <div className="boarding-pass-header">
                <span className="boarding-pass-label tracking-[0.2em]">
                  ✈ BOARDING PASS
                </span>
                <span className="boarding-pass-label tracking-[0.15em]">
                  CHROME AIRWAYS
                </span>
              </div>

              {/* DIVIDER */}
              <div className="boarding-pass-divider" aria-hidden="true" />

              {/* BODY */}
              <div className="boarding-pass-body">
                {/* LEFT: Info */}
                <div className="flex-1 space-y-bp-md lg:space-y-bp-lg">
                  {/* PASSENGER + Photo */}
                  <div className="flex items-start gap-4 lg:gap-0">
                    <div className="flex-1">
                      <span className="boarding-pass-label">PASSENGER</span>
                      <h1 className="font-[family-name:var(--font-dosis)] text-[clamp(2rem,6vw,4.5rem)] font-extrabold leading-[0.9] tracking-tight">
                        <span className="mercury-text" data-text="YUISEI">
                          YUISEI
                        </span>
                        <br />
                        <span className="mercury-text" data-text="MARUYAMA">
                          MARUYAMA
                        </span>
                      </h1>
                    </div>
                    {/* Profile Image — mobile */}
                    <div className="flex lg:hidden items-start shrink-0">
                      <div className="boarding-pass-photo boarding-pass-photo-sm">
                        <Image
                          src="/images/profile.webp"
                          alt="Yuisei Maruyama"
                          width={100}
                          height={100}
                          className="object-cover"
                          sizes="100px"
                          priority
                        />
                      </div>
                    </div>
                  </div>

                  {/* FROM → TO */}
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="boarding-pass-label">FROM</span>
                      <div className="boarding-pass-value">TOKYO</div>
                      <span className="boarding-pass-code">TYO</span>
                    </div>
                    <span
                      className="text-silver-dim text-lg tracking-widest"
                      aria-hidden="true"
                    >
                      ──✈──
                    </span>
                    <div>
                      <span className="boarding-pass-label">TO</span>
                      <div className="boarding-pass-value">∞</div>
                      <span className="boarding-pass-code">FUTURE</span>
                    </div>
                  </div>

                  {/* DATE / SEAT / CLASS / GATE */}
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    <div>
                      <span className="boarding-pass-label">DATE</span>
                      <div className="boarding-pass-value">04 NOV 1996</div>
                    </div>
                    <div>
                      <span className="boarding-pass-label">SEAT</span>
                      <div className="boarding-pass-value">03</div>
                    </div>
                    <div>
                      <span className="boarding-pass-label">CLASS</span>
                      <div className="boarding-pass-value">BUSINESS</div>
                    </div>
                    <div>
                      <span className="boarding-pass-label">GATE</span>
                      <div className="boarding-pass-value">2020</div>
                    </div>
                  </div>

                  {/* COMPANY / ACCOUNT / ROLE / INTERESTS */}
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    <div>
                      <span className="boarding-pass-label">COMPANY</span>
                      <div className="boarding-pass-value">CyberAgent, Inc.</div>
                    </div>
                    <div>
                      <span className="boarding-pass-label">ACCOUNT</span>
                      <div className="boarding-pass-value">Y_METRO</div>
                    </div>
                    <div>
                      <span className="boarding-pass-label">ROLE</span>
                      <div className="boarding-pass-value">Engineer</div>
                    </div>
                    <div>
                      <span className="boarding-pass-label">INTERESTS</span>
                      <div className="boarding-pass-value">
                        Drinks · Travel · Art
                      </div>
                    </div>
                  </div>

                  {/* FLIGHT LOG */}
                  <div>
                    <span className="boarding-pass-label">
                      FLIGHT LOG · {FLIGHT_LOG.length} Countries
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {FLIGHT_LOG.map(({ flag, codes }) => (
                        <span key={codes[0]} className="boarding-pass-stamp">
                          <span className="boarding-pass-flag" aria-hidden="true">
                            {flag}
                          </span>
                          {codes.join(" · ")}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="boarding-pass-qr-wrapper" aria-hidden="true">
                    <Image
                      src="/images/insta.png"
                      alt=""
                      width={140}
                      height={140}
                      className="boarding-pass-qr"
                      sizes="140px"
                    />
                  </div>
                </div>

                {/* RIGHT: Profile Image (desktop) */}
                <div className="hidden lg:flex items-start">
                  <div className="boarding-pass-photo">
                    <Image
                      src="/images/profile.webp"
                      alt="Yuisei Maruyama"
                      width={180}
                      height={180}
                      className="object-cover"
                      sizes="180px"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* PERFORATION (desktop) */}
              <div
                ref={perforationRef}
                className="boarding-pass-perforation hidden lg:block"
                aria-hidden="true"
              >
                <div ref={hitAreaRef} className="cut-hit-area" aria-hidden="true" />
                <canvas ref={canvasRef} className="cut-canvas" aria-hidden="true" tabIndex={-1} />
              </div>

              {/* STUB (desktop) */}
              <motion.div
                className="boarding-pass-stub hidden lg:flex"
                style={{ y: stubY, x: stubX, rotate: stubRotate, opacity: stubOpacity }}
              >
                <span className="text-silver/60 text-lg">✈</span>
                <div>
                  <span className="boarding-pass-label">SEAT</span>
                  <div className="boarding-pass-value text-sm">03</div>
                </div>
                <div>
                  <span className="boarding-pass-label">GATE</span>
                  <div className="boarding-pass-value text-sm">2020</div>
                </div>
                <span className="boarding-pass-label tracking-[0.15em] self-center">
                  TYO → ∞
                </span>
              </motion.div>

              {/* Reattach button (visible after cut) */}
              <button
                ref={resetBtnRef}
                className="cut-reset-btn"
                aria-hidden="true"
                tabIndex={-1}
              >
                ↺ Reattach
              </button>
            </motion.article>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={line}
            className="mt-16 flex items-center gap-3"
            aria-hidden="true"
          >
            <Text variant="overline" className="uppercase">
              scroll
            </Text>
            <motion.span
              className="block w-px h-6 bg-silver/40 origin-top"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
