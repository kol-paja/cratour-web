'use client';

import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Button } from 'antd';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useGetAllCities } from '@/hooks/useCities';
import { useGetAllAttractions } from '@/hooks/useAttractions';
import MultiplePlaceSelect from './PlaceOptions';
import Link from 'next/link';
import { logos } from '@/constants';
import Image from 'next/image';
import { contactsList } from '@/constants/contacts';
import { gaEvent } from '@/lib/gtag';

const { Option } = Select;
type Props = {
	place?: 'home' | 'page';
};

const ContactForm = ({ place = 'home' }: Props) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);

	const {
		cities,
		isLoading: isLoadingCities,
		isError,
	} = useGetAllCities({
		page: 1,
		pageSize: 1000,
		sort: 'asc',
	});
	const {
		attractions,
		isLoading: isLoadingAttractions,
		isError: isErrorAttraction,
	} = useGetAllAttractions({
		page: 1,
		pageSize: 1000,
		sort: 'asc',
	});

	const onFinish = (data: any) => {
		const placesList = data.places.map((place: string) => `<li>${place}</li>`).join('');
		const notes = `<div>
            <div>
              <p><strong>**Subject:</strong> ${data.subject}</p>
              <p><strong>**Full Name:</strong> ${data.fullName}</p>
              <p><strong>**Phone:</strong> ${data.phone}</p>
              <p><strong>**People:</strong> ${data.group}</p>
							<p><strong>**Places:</strong></p>
								<ol>${placesList}</ol>
              <p><strong>**Additional Notes:</strong> ${data.message}</p>

            </div>
            <h5>Please provide me with the pricing details. Looking forward to your response. Thank you!</h5>
            </div>`;
		const bodyData = {
			subject: data.fullName + ' requested some info about: ' + data.service,
			serviceType: data.service,
			email: data.email,
			notes: notes,
		};
		fetch('/api/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify(bodyData),
		})
			.then((res) => {
				return res.json();
			})
			.then(() => {
				toast.success('Message was sent, check your email inbox for any the response of your request');
			})
			.catch((error) => {
				console.log('🚀 ~ handleSubmit ~ error:', error);
				toast.error('Sorry! Message was not sent!');
			})
			.finally(() => {
				setIsLoading(false);
				form.resetFields();
			});
	};

	return (
		<div className=' flex flex-col md:flex-col lg:flex-row justify-center items-center lg:items-start gap-4 md:gap-8 border-t-2 border-gray-200 pt-10 mt-16 w-full mx-auto max-w-[1400px]  px-4 md:px-6 lg:px-8'>
			<div className=' w-full flex flex-col  gap-3 md:gap-4 lg:gap-6 px-4 md:px-4 lg:px-0'>
				<h1 className='text-2xl md:text-3xl font-bold w-fit lg:w-full md:text-wrap lg:text-nowrap flex flex-col md:flex-row gap-2'>
					Cratour.al <br className='block md:hidden' />{' '}
					<div className='flex gap-2'>
						<span className='hidden md:block'> ~ </span> Crafting your visit ti Albania
					</div>
				</h1>

				<p>
					At Cratour.al, we specialize in crafting personalized tours for every traveler. From fully customized itineraries to exclusive local experiences, we
					provide expert guidance throughout your journey in Albania. Whether it’s airport transfers, accommodation bookings, or unique cultural explorations,
					we ensure every detail is tailored to your needs.
				</p>

				<p>
					If you&apos;re planning a trip with family, friends, or a group, or if you&apos;re organizing a conference or event, we are here to help. Contact us,
					and let us create the perfect itinerary for you, filled with authentic experiences and local charm.
				</p>

				<div className='my-2'>
					<p className='pb-4'>
						<Link href={'/contact'} className='pr-1 text-blue-600 font-semibold'>
							Contact us!{' '}
						</Link>
						or send a message using the form
					</p>

					<div className='flex flex-col justify-center items-center md:flex-row md:justify-start  my-4 w-full overflow-visible'>
						<Image src={logos.logoY} alt='' width={180} height={180} />

						<div className='flex flex-col gap-3 items-start justify-start'>
							{contactsList.map((c) => (
								<Link
									key={c.title}
									target='_blank'
									className='flex w-full  text-base gap-2 items-center hover:bg-cyan-100 hover:border-cyan-300 shadow px-3 py-2 rounded-lg border border-transparent '
									href={c.href}
									onClick={() =>
										gaEvent({
											action: 'contact_click',
											category: c.type, // 'phone' | 'whatsapp' | 'email'
											label: `${c.type}_from_contact_form`, // e.g. "whatsapp_from_footer"
										})
									}
								>
									<Image src={c.icon} alt='' width={24} height={24} />
									<span className='font-semibold overflow-visible flex text-nowrap'>{c.title}:</span>
									<span className='text-gray-600'>{c.label}</span>{' '}
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
			<div>
				<h1 className='text-xl font-semibold text-center mb-4'>Send us a message:</h1>
				<Form
					form={form}
					layout='horizontal'
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 12 }}
					className='w-fit  md:w-[600px] gap-3'
					onFinish={onFinish}
					initialValues={{ group: 1 }}
				>
					{/* Name & Surname */}
					<Form.Item label={<label className=' '>Name & Surname</label>} name='fullName' rules={[{ required: true, message: 'Please enter your full name' }]}>
						<Input placeholder='Enter your name and surname' />
					</Form.Item>

					{/* Email */}
					<Form.Item
						label={<label className=' '>Your Email</label>}
						name='email'
						rules={[
							{ required: true, message: 'Please enter your email' },
							{ type: 'email', message: 'Enter a valid email' },
						]}
					>
						<Input placeholder='Enter your email' />
					</Form.Item>

					{/* Phone (Optional) */}
					<Form.Item label={<label className=' '>Phone</label>} name='phone'>
						<Input placeholder='Enter your phone number' />
					</Form.Item>

					{/* Subject (Optional) */}
					<Form.Item label={<label className=' '>Subject</label>} name='subject'>
						<Input placeholder='Enter the subject' />
					</Form.Item>

					{/* Number of People */}
					<Form.Item
						label={<label className='  '>Number of People</label>}
						name='group'
						rules={[{ required: true, message: 'Please enter the number of people' }]}
					>
						<InputNumber min={1} max={100} />
					</Form.Item>

					{/* City (Multi-Select) */}
					<Form.Item
						label={<label className=' '>City/Attraction</label>}
						name='places'
						rules={[{ required: true, message: 'Please select at least one place' }]}
					>
						{/* todo multiselect cities and attractions */}
						<MultiplePlaceSelect
							attractions={attractions}
							cities={cities}
							isError={isError || isErrorAttraction}
							loading={isLoadingAttractions || isLoadingCities}
						/>
					</Form.Item>

					{/* Service */}
					<Form.Item label='Service' name='service' rules={[{ required: true, message: 'Please select a service' }]}>
						<Select placeholder='Select a service'>
							<Option value='tour'>Tour Package</Option>
							<Option value='transport'>Transfers</Option>
							<Option value='car-rental'>Car Rental</Option>
							<Option value='hotel'>Hotel Booking</Option>
						</Select>
					</Form.Item>

					{/* Message */}
					<Form.Item label='Message' name='message' rules={[{ required: true, message: 'Please enter your message' }]}>
						<Input.TextArea rows={4} placeholder='Enter your message...' />
					</Form.Item>

					{/* Submit Button */}
					<Form.Item className='flex justify-center w-full'>
						<Button disabled={isLoading} className='w-[300px] px-10 md:w-fit' size='large' loading={isLoading} type='primary' htmlType='submit'>
							Send a message
						</Button>
					</Form.Item>
				</Form>
			</div>
			<ToastContainer transition={Bounce} autoClose={2000} closeOnClick />
		</div>
	);
};

export default ContactForm;
