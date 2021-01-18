import React, { Component } from 'react';
import './SignIn.styles.scss';
import {connect} from 'react-redux';
import FormInput from '../FormInput/FormInput.component';
import Button from '../Button/Button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };

  handleSubmit = async ev => {
    ev.preventDefault();
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;
    emailSignInStart(email, password);
  };

  handleChange = (ev) => {
    ev.preventDefault();
    const { name, value } = ev.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const { googleSignInStart } = this.props;
    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form action="" onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            required
            label="Email"
            onChange={this.handleChange}
          />
          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            required
            label="Password"
            onChange={this.handleChange}
          />
          <div className="btn-group">
            <Button type="submit">Sign In</Button>
            <Button type="button" onClick={googleSignInStart} isGoogleSignIn={true}>Sign In With Google</Button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);
