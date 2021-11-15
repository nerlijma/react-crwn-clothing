import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss'
import { googleSignInStart, emailSignInStart } from 'redux/user/user.actions';

const SignIn = () => {

    const [userCredentials, setUserCredentials] = useState({ email: 'diez@gmail.com', password: '123456' });

    const { email, password } = userCredentials;

    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(emailSignInStart(userCredentials));
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' name='email' type='email' value={email} required handleChange={handleChange} />
                <FormInput label='Password' name='password' type='password' value={password} required onChange={handleChange} />
                <div className="login-buttton-container">
                    <CustomButton type='submit'>SUBMIT FORM</CustomButton>
                    <CustomButton type="button" isGoogleSignin={true} onClick={() => dispatch(googleSignInStart())}>Sign in with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn;