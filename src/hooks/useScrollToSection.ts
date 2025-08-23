import { useCallback } from 'react';

/**
 * Custom hook for scrolling to a section with smooth behavior
 * Encapsulates DOM side effects for better testability
 */
export const useScrollToSection = () => {
	const scrollToSection = useCallback((selector: string, delay = 100) => {
		setTimeout(() => {
			const element = document.querySelector(selector);
			if (element) {
				element.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}
		}, delay);
	}, []);

	return scrollToSection;
};
