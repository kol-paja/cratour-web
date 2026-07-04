import QueryString from 'qs';
import axios from 'axios';
import { Pagination } from '@/types/common';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ? cra-tour => city

// todo add the pagination for each of this
export const fetchAllCities = async ({ page = 1, pageSize = 25, sort = 'asc' }: Pagination) => {
	const query = QueryString.stringify(
		{
			populate: {
				cover: { populate: '*' },
				gallery: { populate: '*' },
				seo: {
					populate: '*',
				},
			},
			pagination: {
				page,
				pageSize,
			},
			sort: [`title:${sort}`],
		},
		{
			encodeValuesOnly: true,
		},
	);
	console.log(`${apiUrl}/cra-tours?${query}`);
	return axios
		.get(`${apiUrl}/cra-tours?${query}`)
		.then((res) => res.data)
		.catch((e) => {
			console.error('Status:', e.response?.status);
			console.error('Response:', e.response?.data);
			console.error('URL:', e.config?.url);
			throw e;
		});
};

export const fetchCity = async (id: string) => {
	const query = QueryString.stringify(
		{
			populate: '*',
		},
		{
			encodeValuesOnly: true,
		},
	);

	return axios
		.get(`${apiUrl}/cra-tours/${id}?${query}`)
		.then((res) => res.data)
		.catch((e) => {
			console.log('🚀 ~ fetch city ~ e:', e);
		});
};
