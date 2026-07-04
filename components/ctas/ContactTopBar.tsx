'use client';

import { contactsList } from '@/constants/contacts';
import { gaEvent } from '@/lib/gtag';
import Image from 'next/image';
import Link from 'next/link';

const ContactTopBar = () => {
	return (
		<div
			className='w-full h-[40px] fixed top-0 left-0 z-[51] flex justify-center md:justify-between items-center px-4 md:px-10  shadow-lg animate-fade-in
      bg-gradient-to-r from-orange-500/40 to-red-500/40 backdrop-blur-md border-b border-white/20'
		>
			{/* ✅ Left - Response Time */}
			<span className='hidden md:block text-sm font-medium tracking-wide drop-shadow-md'>
				💬 Response Time: <strong>within 1 day</strong>
			</span>

			{/* ✅ Right - Contact Links */}
			<div className='flex items-center gap-5'>
				{contactsList.map((contact, idx) => (
					<Link
						key={idx}
						href={contact.href}
						title={contact.title}
						target={contact.href.startsWith('http') ? '_blank' : '_self'}
						className='flex items-center gap-2 px-2 py-1 rounded-full hover:bg-white/10 transition duration-200 hover:scale-105'
						onClick={() =>
							gaEvent({
								action: 'contact_click',
								category: contact.type, // 'phone' | 'whatsapp' | 'email'
								label: `${contact.type}_from_top_navbar`, // e.g. "whatsapp_from_footer"
							})
						}
					>
						<Image src={contact.icon} alt={contact.title} width={20} height={20} className='drop-shadow-md h-6 w-6 md:h-5 md:w-5' />
						<span className='hidden sm:inline text-sm'>{contact.label}</span>
					</Link>
				))}
			</div>
		</div>
	);
};

export default ContactTopBar;
