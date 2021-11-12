import React, { useState } from 'react'
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up.styles.scss';
import { signUpStart } from 'redux/user/user.actions';
import { connect } from 'react-redux';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async e => {
        e.preventDefault();
        signUpStart(userCredentials);
        setUserCredentials({ email: '', password: '', displayName: '', confirmPassword: '' });
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className='sign-up'>
            <h2>I want to register</h2>
            <span>Register with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='DisplayName' name='displayName' type='text' value={displayName} required handleChange={handleChange} />
                <FormInput label='Email' name='email' type='email' value={email} required handleChange={handleChange} />
                <FormInput label='Password' name='password' type='password' value={password} required onChange={handleChange} />
                <FormInput label='Confirm Password' name='confirmPassword' type='password' value={confirmPassword} required onChange={handleChange} />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    signUpStart: (email, password, displayName) => dispatch(signUpStart(email, password, displayName))
});

export default connect(
    null,
    mapDispatchToProps
)(SignUp);

