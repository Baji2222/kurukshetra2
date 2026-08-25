import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollAnimation
 * Custom hook for scroll-linked animations using GSAP ScrollTrigger
 * 
 * @param {Object} config - Configuration object
 * @param {string} config.triggerElement - Ref to the element that triggers the animation
 * @param {string} config.startTrigger - ScrollTrigger start position (e.g., "top 80%")
 * @param {string} config.endTrigger - ScrollTrigger end position (e.g., "top 20%")
 * @param {Object} config.fromVars - Initial animation state
 * @param {Object} config.toVars - Final animation state
 * @param {boolean} config.scrub - Whether to scrub (1 or 2 for smooth, false for instant)
 * @param {Array} config.targets - Array of refs to animate
 * @returns {void}
 */
export function useScrollAnimation({
  triggerElement,
  startTrigger = 'top 80%',
  endTrigger = 'top 20%',
  fromVars = {},
  toVars = {},
  scrub = 1,
  targets = [],
}) {
  useEffect(() => {
    if (!triggerElement?.current || !targets || targets.length === 0) return;

    const animationTargets = targets.map((ref) => ref.current).filter(Boolean);
    if (animationTargets.length === 0) return;

    gsap.fromTo(animationTargets, fromVars, {
      ...toVars,
      scrollTrigger: {
        trigger: triggerElement.current,
        start: startTrigger,
        end: endTrigger,
        scrub,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === triggerElement.current) {
          trigger.kill();
        }
      });
    };
  }, [triggerElement, startTrigger, endTrigger, fromVars, toVars, scrub, targets]);
}

/**
 * useScrollReveal
 * Simple scroll-triggered reveal animation
 * 
 * @param {Object} config - Configuration object
 * @param {string} config.triggerElement - Ref to the element that triggers the animation
 * @param {string} config.startTrigger - ScrollTrigger start position
 * @param {string} config.endTrigger - ScrollTrigger end position
 * @param {Object} config.targetRefs - Object with ref names as keys and refs as values
 * @returns {void}
 */
export function useScrollReveal({
  triggerElement,
  startTrigger = 'top 80%',
  endTrigger = 'top 20%',
  targetRefs = {},
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const trigger = triggerElement?.current || sectionRef.current;
    if (!trigger) return;

    Object.entries(targetRefs).forEach(([key, ref]) => {
      if (!ref?.current) return;

      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger,
            start: startTrigger,
            end: endTrigger,
            scrub: 1,
            markers: false,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((triggerObj) => {
        if (triggerObj.vars.trigger === trigger) {
          triggerObj.kill();
        }
      });
    };
  }, [triggerElement, startTrigger, endTrigger, targetRefs]);

  return sectionRef;
}

/**
 * useScrollParallax
 * Parallax scroll effect - element moves slower than scroll
 * 
 * @param {Object} config - Configuration object
 * @param {string} config.elementRef - Ref to the element to parallax
 * @param {number} config.speed - Parallax speed (0-1, lower = slower)
 * @param {string} config.direction - "up", "down" (default: "up")
 * @returns {void}
 */
export function useScrollParallax({
  elementRef,
  speed = 0.5,
  direction = 'up',
}) {
  useEffect(() => {
    if (!elementRef?.current) return;

    const direction_multiplier = direction === 'up' ? -1 : 1;

    gsap.to(elementRef.current, {
      y: () => window.innerHeight * (1 - speed) * direction_multiplier,
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === elementRef.current) {
          trigger.kill();
        }
      });
    };
  }, [elementRef, speed, direction]);
}

/**
 * useScrollProgress
 * Get scroll progress as a value between 0 and 1
 * 
 * @param {Object} config - Configuration object
 * @param {string} config.triggerElement - Ref to the element that triggers
 * @param {string} config.startTrigger - ScrollTrigger start position
 * @param {string} config.endTrigger - ScrollTrigger end position
 * @returns {React.MutableRefObject} Ref with progress value
 */
export function useScrollProgress({
  triggerElement,
  startTrigger = 'top 80%',
  endTrigger = 'top 20%',
}) {
  const progressRef = useRef(0);

  useEffect(() => {
    if (!triggerElement?.current) return;

    const trigger = ScrollTrigger.create({
      trigger: triggerElement.current,
      start: startTrigger,
      end: endTrigger,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
      markers: false,
    });

    return () => {
      trigger.kill();
    };
  }, [triggerElement, startTrigger, endTrigger]);

  return progressRef;
}
