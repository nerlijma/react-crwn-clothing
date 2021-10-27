import React from 'react'
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up.styles.scss'
import { createUserProfileWithEmailAndPassword } from '../../firebase/firebase.utils'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password, displayName } = this.state;
        await createUserProfileWithEmailAndPassword(email, password, displayName);
        this.setState({ email: '', password: '', displayName: '', confirmPassword: '' });
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2>I want to register</h2>
                <span>Register with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput label='DisplayName' name='displayName' type='text' value={displayName} required handleChange={this.handleChange} />
                    <FormInput label='Email' name='email' type='email' value={email} required handleChange={this.handleChange} />
                    <FormInput label='Password' name='password' type='password' value={password} required onChange={this.handleChange} />
                    <FormInput label='Confirm Password' name='confirmPassword' type='password' value={confirmPassword} required onChange={this.handleChange} />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;