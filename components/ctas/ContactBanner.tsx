'use client';

import { contactsList } from '@/constants/contacts';
import { gaEvent } from '@/lib/gtag';
import Image from 'next/image';
import Link from 'next/link';

const ContactBanner = () => {
	return (
		<section className='max-w-7xl w-full mx-auto my-12 md:my-24 px-4'>
			<div className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg p-6 md:p-10 text-center text-white'>
				{/* Heading */}
				<h2 className='text-2xl md:text-4xl font-bold mb-2 drop-shadow-md'>Need Help Planning Your Trip?</h2>
				<p className='text-white/90 mb-6 text-sm md:text-base'>Our team is here to assist you — call, chat, or email us anytime!</p>

				{/* Contact Methods */}
				<div className='flex flex-wrap justify-center gap-6 md:gap-10'>
					{contactsList.map((contact, idx) => (
						<Link
							key={idx}
							href={contact.href}
							target={contact.href.startsWith('http') ? '_blank' : '_self'}
							className='group flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition border border-gray-100 hover:-translate-y-1'
							onClick={() =>
								gaEvent({
									action: 'contact_click',
									category: contact.type, // 'phone' | 'whatsapp' | 'email'
									label: `${contact.type}_from_contact_banner`, // e.g. "whatsapp_from_footer"
								})
							}
						>
							<div className='w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 mb-3 group-hover:scale-110 transition'>
								<Image src={contact.icon} alt={contact.title} width={32} height={32} />
							</div>
							<h3 className='font-semibold text-lg text-gray-800'>{contact.title}</h3>
							<p className='text-gray-600 text-sm mt-1'>{contact.label}</p>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default ContactBanner;
