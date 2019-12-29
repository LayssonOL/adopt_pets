import * as React from 'react';

import { useState } from 'react';

import { Form, Icon, Input, Button } from 'antd';

import './styles.css';

import { Link, withRouter } from 'react-router-dom';

const SignUp = (props: any) => {
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [userConfirmPassword, setUserConfirmPassword] = useState('');
	const [error, setError] = useState('');

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!userName || !userEmail || !userPassword || !userConfirmPassword) {
			setError('Fulfill all fields to register.');
		} else {
			try {
				alert('The route to signUp is missing to connect to the API!');
				props.history.push('/');
			} catch (error) {
				console.log(error);
				setError('Error to register your account.');
			}
		}
	};
	const { getFieldDecorator, setFieldDecorator } = props.form;
	return (
		<div className='signup-box'>
			<Form onSubmit={e => handleSignUp(e)} className='login-form'>
				{error && <p>{error}</p>}
				<Form.Item>
					{getFieldDecorator('username', {
						rules: [{ required: true, message: 'Please input your username!' }]
					})(
						<Input
							prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder='Username'
							onChange={e => setUserName(e.target.value)}
						/>
					)}
				</Form.Item>
				<Form.Item>
					{getFieldDecorator('email', {
						rules: [{ required: true, message: 'Please input your email!' }]
					})(
						<Input
							prefix={<Icon type='message' style={{ color: 'rgba(0,0,0,.25)' }} />}
							placeholder='Email'
							onChange={e => {
								setUserEmail(e.target.value);
								setFieldDecorator('email', e.target.value);
							}}
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
					{getFieldDecorator('confirm-password', {
						rules: [{ required: true, message: 'Please input your password again to confirm!' }]
					})(
						<Input
							prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
							type='password'
							placeholder='Confirm Password'
							onChange={e => setUserConfirmPassword(e.target.value)}
						/>
					)}
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit' className='login-form-button'>
						Register
					</Button>
					Or <Link to='/'>Log In</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

const WrappedSignUp = Form.create({ name: 'signup' })(withRouter(SignUp));

export default WrappedSignUp;
