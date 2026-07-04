'use client';

import React from 'react';
import Services from '@/components/landing/Services';
import Hero from '@/components/landing/Hero';
import CitiesLayout from '@/components/landing/CitiesLayout';
import TravelLayout from '@/components/landing/TravelLayout';
import AboutUs from '@/components/landing/AboutUs';
import CraftTours from '@/components/landing/CraftTours';
import ContactForm from '@/components/form/ContactForm';
import AttractionsSection from '../sections/AttractionsSection';

const Landing = () => {
	return (
		<>
			{/* TODO landing */}
			{/* TODO Add languages route https://cdn.ipwhois.io/flags/xk.svg */}
			<Hero />

			<Services />

			<TravelLayout />

			{/* City layout */}
			<CitiesLayout />

			{/* Attractions */}
			<AttractionsSection />

			{/* about us */}
			<AboutUs />

			{/* Tours Layout simple descriptions with ctas */}

			<CraftTours />

			<ContactForm place='home' />
		</>
	);
};

export default Landing;
