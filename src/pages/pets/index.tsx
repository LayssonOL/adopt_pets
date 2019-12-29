import * as React from 'react';

import { useState, useEffect } from 'react';

import { Icon, List, Typography, Divider, Select } from 'antd';

import './styles.css';

import { petSearch } from '../../services/api';

import { Pet, IconText, PetsSearchInitial } from '../../interfaces/index';

import { withRouter } from 'react-router-dom';

const Pets = (props: any) => {
	const [list, setList] = useState(Array<Pet>());
	const [searchConfig, setSearchConfig] = useState(PetsSearchInitial);

	const { Title, Text } = Typography;
	const { Option } = Select;

	const getPets = async () => {
		const petsResponse = await petSearch.post('/pet/search', searchConfig);
		setList(petsResponse.data.data.result);
	};

	useEffect(() => {
		getPets();
	}, [searchConfig, list]);

	const handleSexSelect = (value: string) => {
		const config = searchConfig;
		config.search.sex_key = value;
		setSearchConfig(config);
	};

	const handleSizeSelect = (value: string) => {
		const config = searchConfig;
		config.search.size_key = value;
		setSearchConfig(config);
	};

	const handleAgeSelect = (value: string) => {
		const config = searchConfig;
		config.search.age_key = value;
		setSearchConfig(config);
	};

	const IconText = ({ type, text }: IconText) => (
		<span>
			<Icon type={type} style={{ marginRight: 8 }} />
			{text}
		</span>
	);

	return (
		<div className='list-item'>
			<Title className='title' level={2}>
				Pets
			</Title>
			<Divider />
			<div className='filters'>
				<Text className='filter-name'>Filtrar: </Text>
				<Select
					defaultValue='FEMALE'
					style={{ width: 120 }}
					onChange={(value: string) => handleSexSelect(value)}>
					<Option value='MALE'>MALE</Option>
					<Option value='FEMALE'>FEMALE</Option>
				</Select>
				<Select defaultValue='S' style={{ width: 120 }} onChange={(value: string) => handleSizeSelect(value)}>
					<Option value='S'>S</Option>
					<Option value='M'>M</Option>
					<Option value='L'>L</Option>
					<Option value='XL'>XL</Option>
				</Select>
				<Select
					defaultValue='SENIOR'
					style={{ width: 120 }}
					onChange={(value: string) => handleAgeSelect(value)}>
					<Option value='BABY'>BABY</Option>
					<Option value='YOUNG'>YOUNG</Option>
					<Option value='ADULT'>ADULT</Option>
					<Option value='SENIOR'>SENIOR</Option>
				</Select>
			</div>
			<Divider />
			<List
				itemLayout='vertical'
				size='large'
				pagination={{
					onChange: page => {
						console.log(page);
					},
					pageSize: 5
				}}
				dataSource={list}
				footer={
					<div>
						<b>Adopets Test</b> by Laysson OL
					</div>
				}
				renderItem={item => (
					<List.Item
						key={item.id}
						actions={[
							<IconText type='euro-o' text={item.price} key='list-vertical-star-o' />,
							<IconText type='like-o' text={item.status_key} key='list-vertical-like-o' />,
							<IconText type='user' text={item.sex_key} key='list-vertical-message' />,
							<IconText type='dashboard' text={item.age_key} key='list-vertical-message' />
						]}
						extra={
							<img
								width={272}
								alt='logo'
								src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
							/>
						}>
						<List.Item.Meta
							// avatar={<Avatar src={item.avatar} />}
							title={<p>{item.name}</p>}
							description={item.specie.name}
						/>
						{item.breed_primary.name}
					</List.Item>
				)}
			/>
		</div>
	);
};

export default withRouter(Pets);
