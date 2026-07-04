/* eslint-disable no-unused-vars */
'use client';

import React from 'react';
import TourHero from './TourHero';
import TourDescription from './TourDescription';
import TourDetails from './TourDetails';
import TourAttractions from './TourAttractions';
import MapItinerary from './MapItinerary';
import Highlights from './Highlights';
import Timeline from './Timeline';
import MoreDescription from './MoreDescription';
import Gallery from '@/components/Gallery';
import ScreenLoading from '@/components/ScreenLoading';
import ScreenErrorItem from '@/components/ScreenErrorItem';
import ScreenError from '@/components/ScreenError';
import { useParams } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';

export const GET_TOUR = gql`
	query TourPackageBySlug($slug: String!) {
		tourPackages(filters: { slug: { eq: $slug } }) {
			slug
			title
			subtitle
			age
			groupSize
			isFeatured
			highlights {
				isNew
				id
				description
				text
				icon {
					url
				}
			}
			desc
			content
			totalDays
			cover {
				url
			}
			itenerary {
				city {
					title
					# lat
					# long
					cover {
						url
					}
				}
				order
			}
			hashtags {
				slug
				title
				icon {
					url
				}
			}
			customerPhotos {
				url
			}
			gallery {
				url
				documentId
				hash
			}
			routes {
				days
				id
				cover {
					url
				}
				title
				routeItem {
					desc
					id
					stayingTime
					title
				}
				cities {
					lat
					lng
					title
					slug
					desc
				}
			}
			attractions {
				slug
				name
				cover {
					url
				}
			}
		}
	}
`;

const TourDetailsPage = () => {
	const params = useParams();
	const slug = params?.slug;

	const { data, loading, error } = useQuery(GET_TOUR, {
		variables: { slug },
	});

	if (loading) return <ScreenLoading text='Loading Tour Package details...' />;
	if (error) return <ScreenError />;

	if (!data.tourPackages.length && !loading)
		return <ScreenErrorItem buttonLabel='All Tours' buttonLink='/visit-albania/services/tour-packages' message='Tour not found!' />;

	const { hashtags, cover, title, totalDays, subtitle, desc, age, attractions, content, customerPhotos, gallery, groupSize, highlights, isFeatured, routes } =
		data.tourPackages[0];
	console.log('🚀 ~ TourDetailsPage ~ routes:', routes);

	return (
		<div className='p-2 md:p-6 overflow-hidden max-w-6xl flex flex-col justify-center items-center  mx-auto pb-10 gap-5'>
			<TourHero categories={hashtags} title={title} cover={cover} days={totalDays} subtitle={subtitle} />

			<TourDescription desc={desc} content={content} />
			<TourDetails age={age} group={groupSize} />
			<TourAttractions attractions={attractions} />
			{/* <MapItinerary items={itenerary} title={title} /> */}
			<Highlights highlights={highlights} />
			<Timeline routes={routes} />
			<MoreDescription content={content} />
			{/* <WhatsIncluded /> */}
			<Gallery gallery={gallery} title='Tour Gallery Photos: ' />
			<Gallery gallery={customerPhotos} title='Photos From Our Customers: ' />
		</div>
	);
};

export default TourDetailsPage;
