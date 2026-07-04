export interface Pagination {
	page?: number;
	pageSize?: number;
	sort?: 'desc' | 'asc';
}
export interface Media {
	id: number;
	url: string;
	name: string;
	alternativeText?: string;
	caption?: string;
	width?: number;
	height?: number;
	formats?: any;
	mime?: string;
	size?: number;
	previewUrl?: string | null;
	provider: string;
	provider_metadata?: any;
}
