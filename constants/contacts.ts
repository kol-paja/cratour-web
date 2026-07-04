export const contacts = {
	tel: {
		href: 'tel:+355673434342',
		title: 'Call us!',
		icon: '/png/call-us.png',
	},
	// const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
	whatsapp: {
		telNr: '355673434342',
		title: 'Chat on whatsapp',
		// use encodeURIComponent()
		textService: 'Greetings 👋!\nI am texting for the city transfer in Albania, I would like...',
		icon: '/png/whatsapp.png',
	},
	email: {
		address: 'cratour.al@gmail.com',
		title: 'Email us',
		icon: '/png/mail.png',
	},
};

export const contactsList = [
	{
		href: 'tel:+355673434342',
		title: 'Call us!',
		icon: '/png/call-us.png',
		label: '+355 67 34 34 34 2',
		type: 'phone',
	},
	{
		telNr: '355673434342',
		href: 'https://wa.me/355673434342?text=Hey!',
		title: 'Chat on whatsapp',
		icon: '/png/whatsapp.png',
		label: '+355673434342',
		type: 'whatsapp',
	},
	{
		href: 'mailto:cratour.al@gmail.com',
		title: 'Email us',
		icon: '/png/mail.png',
		label: 'cratour.al@gmail.com',
		type: 'email',
	},
];
