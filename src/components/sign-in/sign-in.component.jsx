import React from 'react'
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss'
// import { signInUserWithEmailAndPassword } from '../../firebase/firebase.utils'
import { googleSignInStart, emailSignInStart } from 'redux/user/user.actions';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = async e => {
        const { emailSignInStart } = this.props;
        e.preventDefault();
        const { email, password } = this.state;
        emailSignInStart({ email, password });
        // await signInUserWithEmailAndPassword(email, password);
        // this.setState({ email: '', password: '' });
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { googleSignInStart } = this.props;
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput label='Email' name='email' type='email' value={this.state.email} required handleChange={this.handleChange} />
                    <FormInput label='Password' name='password' type='password' value={this.state.password} required onChange={this.handleChange} />
                    <div className="login-buttton-container">
                        <CustomButton type='submit'>SUBMIT FORM</CustomButton>
                        <CustomButton type="button" isGoogleSignin={true} onClick={googleSignInStart}>Sign in with Google</CustomButton>
                    </div>

                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (user, password) => dispatch(emailSignInStart(user, password)),
})


export default connect(
    null,
    mapDispatchToProps
)(SignIn);
