/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchAllPackages } from '@/lib/query/tour-packages';
import { MetadataRoute } from 'next';

const liveUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cratour.al';
const LIMIT = 50000; // Google's max limit

// 1️⃣ Dynamically generate the number of sitemaps needed
export async function generateSitemaps() {
	const initialFetch = await fetchAllPackages({ page: 1, pageSize: 1 }); // Fetch just meta data
	const totalTours = initialFetch.meta.pagination.total;
	const numberOfSitemaps = Math.ceil(totalTours / LIMIT);

	// Return an array of sitemap indexes
	return Array.from({ length: numberOfSitemaps }, (_, index) => ({ id: index }));
}

// 2️⃣ Fetch tours for each specific sitemap chunk
export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
	const resolvedId = await Promise.resolve(id);
	// Fetch paginated tours
	const tours = await fetchAllPackages({
		page: resolvedId + 1, // API pagination starts from 1
		pageSize: LIMIT,
	});

	// Ensure tours.data exists
	if (!tours.data || !Array.isArray(tours.data)) {
		console.error('🚀 ~ Invalid response from fetchAllPackages:', tours);
		return [];
	}

	// Map tours to sitemap format
	return tours.data.map((tour: any) => ({
		url: `${liveUrl}/visit-albania/services/tour-packages/${tour.slug}`,
		lastModified: tour.updatedAt,
	}));
}
