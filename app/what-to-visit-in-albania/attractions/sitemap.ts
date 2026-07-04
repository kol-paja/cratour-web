/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchAllAttractions } from '@/lib/query/attractions';
import { MetadataRoute } from 'next';

const liveUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cratour.al';
const LIMIT = 50000; // Google's max limit

// 1️⃣ Dynamically generate the number of sitemaps needed
export async function generateSitemaps() {
	const initialFetch = await fetchAllAttractions({ page: 1, pageSize: 1 }); // Fetch just meta data
	const totalTours = initialFetch.meta.pagination.total;
	const numberOfSitemaps = Math.ceil(totalTours / LIMIT);

	// Return an array of sitemap indexes
	return Array.from({ length: numberOfSitemaps }, (_, index) => ({ id: index }));
}

// 2️⃣ Fetch tours for each specific sitemap chunk
export default async function sitemap({ id }: { id: number | Promise<number> }): Promise<MetadataRoute.Sitemap> {
	const resolvedId = await Promise.resolve(id); // works whether id is a number or a Promise<number>

	const attractions = await fetchAllAttractions({
		page: resolvedId + 1,
		pageSize: LIMIT,
	});

	if (!attractions?.data || !Array.isArray(attractions.data)) {
		console.error('🚀 ~ Invalid response from fetchAllAttractions:', attractions);
		return [];
	}

	return attractions.data.map((attraction: any) => ({
		url: `${liveUrl}/what-to-visit-in-albania/attractions/${attraction.slug}`,
		lastModified: attraction.updatedAt,
	}));
}
