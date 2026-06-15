import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useScrollReveal — Intersection Observer hook
 * Returns a ref to attach to a container. Children with [data-reveal]
 * will animate in when they enter the viewport.
 * 
 * Options:
 *   threshold: 0-1 visibility ratio to trigger (default 0.15)
 *   stagger:   ms delay between each child (default 120)
 */
export function useScrollReveal({ threshold = 0.15, stagger = 120 } = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    // Set initial hidden state
    elements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'none'; // prevent flash
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // Find all [data-reveal] children within the observed container
          const targets = entry.target.querySelectorAll
            ? entry.target.querySelectorAll('[data-reveal]')
            : [entry.target];

          const arr = targets.length ? Array.from(targets) : [entry.target];

          arr.forEach((el, i) => {
            const delay = i * stagger;
            // Use requestAnimationFrame to ensure the initial state is painted first
            requestAnimationFrame(() => {
              el.style.transition = `opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`;
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            });
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [threshold, stagger]);

  return containerRef;
}

/**
 * useMouseParallax — subtle parallax that follows the cursor
 * Returns { ref, style } — attach ref to the container,
 * apply style to the element that should move.
 */
export function useMouseParallax(intensity = 30) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    setOffset({ x: dx * intensity, y: dy * intensity });
  }, [intensity]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const style = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };

  return { ref, style };
}
