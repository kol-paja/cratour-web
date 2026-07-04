import { useQuery } from '@tanstack/react-query';
import { fetchAllAttractions, fetchAttraction, fetchSomeAttractions } from '@/lib/query/attractions';
import { Pagination } from '@/types/common';

export const useGetAllAttractions = ({ page, pageSize }: Pagination) => {
	const {
		data: attractions,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ['qk_attractions'],
		queryFn: () => fetchAllAttractions({ page, pageSize }),
	});
	return {
		attractions,
		isLoading,
		isError,
		error,
		refetch,
	};
};
export const useGetSomeAttractions = ({ page, pageSize }: Pagination) => {
	const {
		data: attractions,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ['qk_some_attractions'],
		queryFn: () => fetchSomeAttractions({ page, pageSize }),
	});
	return {
		attractions,
		isLoading,
		isError,
		error,
		refetch,
	};
};

export const useGetAttraction = (slug: string) => {
	const {
		data: attraction,
		isLoading: isLoadingAttraction,
		isError: isErrorAttraction,
		error: errorAttraction,
		refetch: refetchAttraction,
	} = useQuery({
		queryKey: ['qk_attraction', slug],
		queryFn: () => fetchAttraction(slug),
	});
	return {
		attraction,
		isLoadingAttraction,
		isErrorAttraction,
		errorAttraction,
		refetchAttraction,
	};
};
