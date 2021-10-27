import React from 'react'
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss'
import { signInWithGoogle, signInUserWithEmailAndPassword } from '../../firebase/firebase.utils'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        await signInUserWithEmailAndPassword(email, password);
        this.setState({ email: '', password: '' });
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput label='Email' name='email' type='email' value={this.state.email} required handleChange={this.handleChange} />
                    <FormInput label='Password' name='password' type='password' value={this.state.password} required onChange={this.handleChange} />
                    <CustomButton type='submit'>SUBMIT FORM</CustomButton>
                    <CustomButton type="button" isGoogleSignin={true} onClick={signInWithGoogle}>Sign in with Google</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignIn;