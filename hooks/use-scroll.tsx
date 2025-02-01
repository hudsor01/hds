// hooks/useScroll.tsx
import { useEffect, useState } from 'react'

/**
 * Custom hook to track scroll position and related information.
 * @param ref - Optional reference to a specific element to track its scroll position.
 * @returns An object containing scroll-related information.
 */
export function useScroll(ref?: React.RefObject<HTMLElement>) {
  // State to store scroll position
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    // Determine the target element: either the provided ref or the window
    const targetElement = ref?.current || window;

    // Handler to update scroll position
    const handleScroll = () => {
      if (ref?.current) {
        // If a ref is provided, track the scroll position of the referenced element
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        setScrollPosition(scrollTop);
        setIsAtBottom(scrollTop + clientHeight >= scrollHeight);
      } else {
        // Otherwise, track the scroll position of the window
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        setScrollPosition(scrollTop);
        setIsAtBottom(scrollTop + clientHeight >= scrollHeight);
      }
    };

    // Attach the scroll event listener
    targetElement.addEventListener('scroll', handleScroll);

    // Initial call to set the scroll position on mount
    handleScroll();

    // Cleanup the event listener on unmount
    return () => {
      targetElement.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return {
    scrollPosition, // Current scroll position
    isAtBottom,     // Whether the user has scrolled to the bottom
  };
}
