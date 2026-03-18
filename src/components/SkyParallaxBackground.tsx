const SkyParallaxBackground = () => (
  <div className="sky-parallax-root" aria-hidden="true">
    {/* Scenery images — cross-fade via scroll-driven animations */}
    <div className="sky-scenery sky-scenery-1" />
    <div className="sky-scenery sky-scenery-2" />
    <div className="sky-scenery sky-scenery-3" />
    {/* Window frame overlay — masks scenery to window opening */}
    <div className="sky-window-frame" />
    <div className="sky-vignette" />
  </div>
);

export default SkyParallaxBackground;
