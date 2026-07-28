'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const DISPLAY_DURATION_MS = 8000;
const FADE_DURATION_MS = 1000;

export function HomeIntroOverlay({ imageSrc = '/images/hero-bg.png', imageAlt = 'MESTAR intro image' }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), DISPLAY_DURATION_MS);
    const hideTimer = setTimeout(() => setIsVisible(false), DISPLAY_DURATION_MS + FADE_DURATION_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black"
      style={{
        opacity: isFading ? 0 : 1,
        transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
      }}
      aria-hidden="true"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
