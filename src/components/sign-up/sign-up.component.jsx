import React from 'react'
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up.styles.scss';
import { signUpStart } from 'redux/user/user.actions';
import { connect } from 'react-redux';
// import { createUserProfileWithEmailAndPassword } from '../../firebase/firebase.utils'

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
        const { signUpStart } = this.props;

        const userData = { email, password, displayName };
        signUpStart(userData);
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

const mapDispatchToProps = (dispatch) => ({
    signUpStart: (email, password, displayName) => dispatch(signUpStart(email, password, displayName))
});

export default connect(
    null,
    mapDispatchToProps
)(SignUp);

