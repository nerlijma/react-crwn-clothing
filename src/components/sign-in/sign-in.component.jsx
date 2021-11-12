import React, { useState } from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss'
import { googleSignInStart, emailSignInStart } from 'redux/user/user.actions';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {

    const [userCredentials, setUserCredentials] = useState({ email: 'diez@gmail.com', password: '123456' });

    const { email, password } = userCredentials;

    const handleSubmit = async e => {
        e.preventDefault();
        emailSignInStart({ email, password });
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
                    <CustomButton type="button" isGoogleSignin={true} onClick={googleSignInStart}>Sign in with Google</CustomButton>
                </div>

            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (user, password) => dispatch(emailSignInStart(user, password)),
})


export default connect(
    null,
    mapDispatchToProps
)(SignIn);
