import { Bounce, ToastContainer, toast } from 'react-toastify';
import { RentACar } from '@/types/services';
import { Button, Modal, Form as AntForm, Tooltip, Image as AntdImage, Drawer, Input, DatePicker, InputNumber, Space } from 'antd';
import { Luggage, User2 } from 'lucide-react';
import Image from 'next/image';
import { contacts } from '@/constants/contacts';

import React, { useState } from 'react';
import { createWhatsappHref } from '@/lib/whatsapp';
import dayjs from 'dayjs';

const CarCard = ({
	cover,
	name,
	nrPeople,
	nrLargeBags,
	nrDoors,
	kamio,
	desc,
	hasAC,
	isAvailable,
	engineCapacity,
	slug,
	id,
	fuelType,
	gallery,
	model,
	nrChargePorts,
	nrSeats,
	nrSmallBags,
	type,
}: RentACar) => {
	const [open, setOpen] = useState(false);
	const [isOpenDrawer, setIsOpenDrawer] = useState(false);
	const [form] = AntForm.useForm();
	const [mode, setMode] = useState<'email' | 'whatsapp'>('email');
	const [loading, setLoading] = useState(false);

	const onOpen = () => setOpen(true);
	const onClose = () => setOpen(false);
	const onDrawerOpen = () => setIsOpenDrawer(true);
	const onDrawerClose = () => {
		setIsOpenDrawer(false);
		form.resetFields();
	};

	const onFinish = async (values: any) => {
		setLoading(true);

		const message = `Pershendetje, I would like to rent the ${name}.
			- **Pickup Date:** ${values.pickUpDate ? dayjs(values.pickUpDate).format('DD MMM YYYY') : 'Not specified'}
			- **Pickup Location:** ${values.pickUpPlace}
			- **Drop-Off Location:** ${values.dropOffPlace}
			- **Drop-Off Date:**${values.dropOffPlace !== undefined ? dayjs(values.dropOffPlace).format('DD MMM YYYY') : 'Not specified'}
			- **Email:** ${values.email}
			- **Passengers:** ${values.nrAdults} adults, ${values.nrChildren} children
			- **Luggage:** ${values.nrLargeBags} large, ${values.nrSmallBags} small
			- **Notes:** ${values.notes || 'No notes'}

			Please confirm availability and price.`;

		if (mode === 'whatsapp') {
			const href = createWhatsappHref(contacts.whatsapp.telNr, encodeURIComponent(message));
			window.location.href = href;
			setLoading(false);
			form.resetFields();
			return;
		}

		try {
			const response = await fetch('/api/emails', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					subject: `Car Rental Request - ${name}`,
					serviceType: 'rent-a-car',
					email: values.email,
					notes: `<div><p>${message.replace(/\n/g, '</p><p>')}</p></div>`,
				}),
			});

			const result = await response.json();
			toast.success('Your request has been sent successfully!');
			onDrawerClose();
		} catch (err) {
			toast.error('Something went wrong. Try again!');
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='w-72 h-[300px] flex flex-col gap-2 border border-gray-200 rounded-lg hover:border-cyan-300 hover:border-2 bg-gray-100  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 px-3 md:px-4 shadow-lg hover:shadow-2xl transition-shadow duration-300'>
			<div className='w-full h-fit flex justify-center items-center'>
				<Image src={cover.url} width={200} className='bg-cover' height={100} alt={name} />
			</div>
			<div className='flex justify-between items-center'>
				<h1 className='text-md md:text-lg font-bold'>{name}</h1>
				<Button
					variant='dashed'
					size='middle'
					className='relative text-white bg-gradient-to-r from-cyan-500 to-blue-500 ring-2 ring-offset-0 ring-cyan-400 hover:ring-blue-400 transition'
					onClick={onDrawerOpen}
				>
					Order!
				</Button>
			</div>

			<div className='flex items-center gap-4'>
				{kamio === 'automat' ? (
					<Tooltip arrow title={kamio + ' transmission'} className='flex items-center gap-1'>
						<Image src='/png/automatic-transmission.png' width={24} height={24} alt={kamio} />
					</Tooltip>
				) : (
					<Tooltip arrow title={kamio + ' transmission'} className='flex items-center gap-1'>
						<Image src='/png/automatic-transmission.png' width={24} height={24} alt={kamio} />
					</Tooltip>
				)}

				<Tooltip arrow title={nrPeople + ' Adults Passengers'} className='flex items-center gap-1'>
					<User2 />
					<span className='text-lg font-bold'>{nrPeople}</span>
				</Tooltip>

				<Tooltip arrow title={nrLargeBags + ' large bags'} className='flex items-center gap-1'>
					<Luggage />
					<span className='text-lg font-bold'>{nrLargeBags}</span>
				</Tooltip>

				<Tooltip arrow title={nrDoors + ' doors'} className='flex items-center gap-1'>
					<Image src='/svg/car-door.svg' width={24} height={24} alt='car-dor' />
					<span className='text-lg font-bold'>{nrDoors}</span>
				</Tooltip>
			</div>

			<div className='w-fill px-2 justify-end flex  items-center'>
				<Button type='link' onClick={onOpen}>
					View More
				</Button>
			</div>

			<Modal onCancel={onClose} width={700} open={open} centered>
				<div className='space-y-4'>
					<h1 className='text-2xl font-bold'>{name}</h1>

					{/* Main Image */}
					<Image src={cover?.url || '/placeholder.jpg'} alt={name} width={640} height={360} className='rounded-md w-full object-cover' />

					{/* Description */}
					{desc && <p className='text-gray-700'>{desc}</p>}

					{/* Car Info Grid */}
					<div className='grid grid-cols-2 gap-4 mt-4 text-sm'>
						<div>
							<strong>Transmission:</strong> {kamio}
						</div>
						<div>
							<strong>Fuel Type:</strong> {fuelType}
						</div>
						<div>
							<strong>Seats:</strong> {nrSeats ?? '-'}
						</div>
						<div>
							<strong>Doors:</strong> {nrDoors ?? '-'}
						</div>
						<div>
							<strong>Passengers:</strong> {nrPeople ?? '-'}
						</div>
						<div>
							<strong>Large Bags:</strong> {nrLargeBags ?? '-'}
						</div>
						<div>
							<strong>Small Bags:</strong> {nrSmallBags ?? '-'}
						</div>
						<div>
							<strong>Air Conditioning:</strong> {hasAC ? 'Yes' : 'No'}
						</div>
						<div>
							<strong>Charging Ports:</strong> {nrChargePorts ?? '0'}
						</div>
						<div>
							<strong>Engine Capacity:</strong> {engineCapacity ?? '-'} L
						</div>
					</div>

					{/* Gallery Thumbnails (if available) */}
					{/* ADD carousel */}
					{gallery && gallery.length > 0 && (
						<div className='pt-4'>
							<h2 className='font-semibold mb-2'>Gallery</h2>
							<div className='grid grid-cols-3 gap-2'>
								{gallery.map((media) => (
									<AntdImage key={media.id} src={media.url} alt={media.name} width={200} height={130} className='rounded object-cover w-full h-[130px]' />
								))}
							</div>
						</div>
					)}
				</div>
			</Modal>

			<Drawer open={isOpenDrawer} onClose={onDrawerClose} title={`Order ${name}`}>
				<AntForm
					form={form}
					layout='vertical'
					onFinish={onFinish}
					initialValues={{
						// pickUpDate: dayjs(),
						nrChildren: 1,
						nrAdults: 2,
						nrSmallBags: 1,
						nrLargeBags: 2,
					}}
				>
					<AntForm.Item name='email' label='Email' rules={[{ required: true, type: 'email', message: 'Email is required!' }]}>
						<Input placeholder='your_email@example.com' />
					</AntForm.Item>

					<AntForm.Item name='pickUpPlace' label='Pick-up Location' rules={[{ required: true, message: 'Pick-up place is required' }]}>
						<Input />
					</AntForm.Item>

					<AntForm.Item name='dropOffPlace' label='Drop-off Location' rules={[{ required: true, message: 'Drop-off place is required' }]}>
						<Input />
					</AntForm.Item>

					<Space>
						<AntForm.Item name='pickUpDate' label='Pick-up Date' rules={[{ required: true, message: 'Pick-up date is required!' }]}>
							<DatePicker className='w-full' />
						</AntForm.Item>
						<AntForm.Item name='dropOffDate' label='Drop-off Date'>
							<DatePicker className='w-full' />
						</AntForm.Item>
					</Space>
					<Space>
						<AntForm.Item name='nrAdults' label='Number of Adults' rules={[{ required: true }]}>
							<InputNumber min={1} className='w-full' placeholder='e.g. 2' />
						</AntForm.Item>

						<AntForm.Item name='nrChildren' label='Number of Children' rules={[{ required: true }]}>
							<InputNumber min={0} className='w-full' placeholder='e.g. 1' />
						</AntForm.Item>
					</Space>

					<Space>
						<AntForm.Item name='nrLargeBags' label='Large Bags' rules={[{ required: true }]}>
							<InputNumber min={0} className='w-full' placeholder='e.g. 2' />
						</AntForm.Item>

						<AntForm.Item name='nrSmallBags' label='Small Bags' rules={[{ required: true }]}>
							<InputNumber min={0} className='w-full' placeholder='e.g. 1' />
						</AntForm.Item>
					</Space>

					<AntForm.Item name='notes' label='Notes (optional)'>
						<Input.TextArea rows={3} />
					</AntForm.Item>

					<div className='flex gap-4 mt-4'>
						<Button loading={loading} type='primary' htmlType='submit' onClick={() => setMode('email')}>
							Send via Email
						</Button>
						<Button
							loading={loading}
							type='default'
							htmlType='submit'
							onClick={() => setMode('whatsapp')}
							className='border-green-600 text-green-600 hover:bg-green-500 hover:text-white'
						>
							Continue on WhatsApp
						</Button>
					</div>
				</AntForm>
			</Drawer>
			<ToastContainer transition={Bounce} autoClose={2000} closeOnClick />
		</div>
	);
};

export default CarCard;
