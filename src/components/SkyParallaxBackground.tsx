"use client";
import { useEffect } from "react";

const SkyParallaxBackground = () => {
  useEffect(() => {
    // 全背景画像をページインタラクティブ後に遅延ロード（クリティカルパスから除外）
    const load = () => {
      const s1 = document.querySelector<HTMLElement>(".sky-scenery-1");
      const s2 = document.querySelector<HTMLElement>(".sky-scenery-2");
      const s3 = document.querySelector<HTMLElement>(".sky-scenery-3");
      if (s1) s1.style.backgroundImage = 'url("/images/window_01.webp")';
      if (s2) s2.style.backgroundImage = 'url("/images/window_02.webp")';
      if (s3) s3.style.backgroundImage = 'url("/images/window_03.webp")';
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(load, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(load, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="sky-parallax-root" aria-hidden="true">
      <div className="sky-scenery sky-scenery-1" />
      <div className="sky-scenery sky-scenery-2" />
      <div className="sky-scenery sky-scenery-3" />
      <div className="sky-window-frame" />
      <div className="sky-vignette" />
    </div>
  );
};

export default SkyParallaxBackground;
