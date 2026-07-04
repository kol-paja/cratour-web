'use client';

import { useGetSomeAttractions } from '@/hooks/useAttractions';
import React from 'react';
import ReactImageCarousel from '../carousels/ReactImageCarousel';
import { Skeleton } from 'antd';
import { Attraction } from '@/types/tour';
import Link from 'next/link';
import Image from 'next/image';

const AttractionsSection = () => {
	const { attractions, error, isError, isLoading } = useGetSomeAttractions({
		page: 1,
		pageSize: 15,
	});
	console.log('🚀 ~ AttractionsSection ~ attractions:', attractions);
	// attractions images for cover name slug
	if (isLoading) {
		return (
			<div className='w-full h-full flex flex-col justify-center items-center'>
				<h1 className='text-xl font-semibold'>Attractions</h1>

				{/* Grid layout with up to 4 cards */}
				<div className='hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl'>
					{[...Array(4)].map((_, i) => (
						<Skeleton.Image key={i} style={{ width: '100%', height: 200 }} active />
					))}
				</div>

				<div className='md:hidden block px-2 max-w-md'>
					<Skeleton.Image style={{ width: 370, height: 300 }} active />
				</div>
			</div>
		);
	}

	if (attractions.data.length === 0 && !isLoading) {
		// TODO: show the
		return;
	}

	return (
		<section className='flex flex-col gap-3 md:gap-10 py-6 px-4 w-full h-full justify-center items-center my-20'>
			<div className='w-full h-full flex flex-col justify-center items-center bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white py-16 px-6 max-w-8xl rounded-3xl shadow-lg'>
				<div className='text-center max-w-4xl mb-10'>
					<h1 className='font-sans font-bold text-3xl md:text-4xl mb-4'>Discover Albania’s Hidden Gems</h1>
					<p className='font-light text-base md:text-lg'>
						From breathtaking coastlines to ancient castles — explore the attractions that make Albania unforgettable.
					</p>
				</div>
			</div>
			<div className=''>
				{attractions.data && (
					<div>
						<div className='hidden  md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-center items-center '>
							{attractions.data.map((attraction: Attraction) => {
								return (
									<Link key={attraction.slug} href={`/what-to-visit-in-albania/attractions/${attraction.slug}`}>
										<div className='w-64 h-64 relative overflow-hidden rounded-xl shadow-orange-300 shadow-lg hover:shadow-2xl cursor-pointer ring-orange-400 ring-2 hover:scale-105 transition-transform duration-300'>
											<Image
												src={attraction.cover.url}
												alt={attraction.name}
												width={256}
												height={256}
												className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
											/>
											<div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2'>{attraction.name}</div>
										</div>
									</Link>
								);
							})}
						</div>
						<div className='block md:hidden'>
							<ReactImageCarousel
								items={attractions.data.map((attraction: Attraction) => ({
									original: attraction.cover.url,
									thumbnail: attraction.cover.url,
									originalAlt: `/what-to-visit-in-albania/attractions/${attraction.slug}`,
									fullscreen: attraction.cover.url,
								}))}
								autoPlay={false}
								showThumbnails={false}
							/>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default AttractionsSection;
