declare module '*.css';
export {};

declare global {
	interface Window {
		dataLayer: Record<string, unknown>[];
		gtag: (...args: any[]) => void;
	}
}
