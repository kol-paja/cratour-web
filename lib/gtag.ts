// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID as string;

type GtagEvent = {
	action: string;
	category: string;
	label: string;
	value?: number;
};

export const gaEvent = ({ action, category, label, value }: GtagEvent) => {
	if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value,
	});
};
