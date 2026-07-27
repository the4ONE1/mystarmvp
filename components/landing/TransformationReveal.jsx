'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Shows the real-photo-to-storybook-illustration proof image on top of the
// hero for 8 seconds, then fades it out to reveal the hero underneath.
// This is the first thing a visitor sees — it exists to prove the "magic"
// before asking for a click, not to decorate the page indefinitely.
export function TransformationReveal() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`absolute inset-0 z-20 flex items-center justify-center bg-background transition-opacity duration-1000 ease-in-out ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-full max-w-xs sm:max-w-sm px-4 py-8">
        <Image
          src="/images/before-after-transformation.jpg"
          alt="A real photo of a child transformed into their personalized storybook illustration"
          width={660}
          height={1017}
          className="w-full h-auto rounded-2xl shadow-2xl shadow-primary/20"
          priority
        />
      </div>
    </div>
  );
}
