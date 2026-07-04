'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import ImageCarousel, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

type Props = {
	items: ReactImageGalleryItem[];
	showNav?: boolean;
	useBrowserFullscreen?: boolean;
	showThumbnails?: boolean;
	autoPlay?: boolean;
	showPlayButton?: boolean;
};

// TODO fix image imports and use them in the carousel

// const images = [
// 	{
// 		original: imgUmraSM.src,
// 		thumbnail: imgUmraThumb.src,
// 		fullscreen: imgUmra.src,
// The e.targe.alt will have the link to the attraction page
// 		originalAlt: 'put the href link here',
// 	},
// ];

const ReactImageCarousel = ({
	items,
	showNav = true,
	useBrowserFullscreen = true,
	showThumbnails = false,
	autoPlay = false,
	showPlayButton = false,
}: Props) => {
	const router = useRouter();

	return (
		<div>
			<ImageCarousel
				showNav={showNav}
				useBrowserFullscreen={useBrowserFullscreen}
				items={items}
				showThumbnails={showThumbnails}
				autoPlay={autoPlay}
				showPlayButton={showPlayButton}
				onClick={(e: any) => router.push(e.target.alt)}
			/>
		</div>
	);
};

export default ReactImageCarousel;
