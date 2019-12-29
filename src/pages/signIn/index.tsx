import * as React from 'react';

import { useState } from 'react';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

import './styles.css';

import { sessionRequest, sessionRegister } from '../../services/api';

import { Link, withRouter } from 'react-router-dom';
import { login, access } from '../../services/auth';

import { AdopetsResponse } from '../../interfaces/index';

const SignIn = (props: any) => {
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [error, setError] = useState('');

	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!userEmail || !userPassword) {
			setError('Fulfill all fields to register.');
		} else {
			try {
				const sessionResponse: AdopetsResponse = await sessionRequest.post('/session-request');
				const { status, code, data } = sessionResponse.data;
				access(data.access_key);
				if (status === 200 && code === 200) {
					const response: AdopetsResponse = await sessionRegister.post('/session-register', {
						organization_user: {
							email: userEmail,
							password: userPassword
						}
					});
					const { data } = response.data;
					login(data.access_key);
					props.history.push('/pets');
				} else {
					alert('Error to Sign In!');
					props.history.push('/');
				}
			} catch (error) {
				console.log(error);
				setError('Error to register your account!');
			}
		}
	};
	const { getFieldDecorator } = props.form;
	return (
		<div className='signup-box'>
			<Form onSubmit={e => handleSignIn(e)} className='login-form'>
				{error && <p>{error}</p>}
				<Form.Item>
					{getFieldDecorator('email', {
						rules: [{ required: true, message: 'Please input your email!' }]
					})(
						<Input
							prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder='Email'
							onChange={e => setUserEmail(e.target.value)}
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please input your password!' }]
					})(
						<Input
							prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
							type='password'
							placeholder='Password'
							onChange={e => setUserPassword(e.target.value)}
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true
					})(<Checkbox>Remember me</Checkbox>)}
					<a className='login-form-forgot' href=''>
						Forgot password
					</a>
					<Button type='primary' htmlType='submit' className='login-form-button'>
						Log in
					</Button>
					Or <Link to='/signup'>Register Now</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

const WrappedSignIn = Form.create({ name: 'signin' })(withRouter(SignIn));

export default WrappedSignIn;
