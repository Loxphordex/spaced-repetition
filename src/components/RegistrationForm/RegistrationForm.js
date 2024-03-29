import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'

class RegistrationForm extends Component {
  state = {
    error: null,
  }
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    if (password.length < 8) {
      this.setState({ error: 'Password must be at least 8 characters.' })
    }

    else {

      AuthApiService.postUser({
        name: name.value,
        username: username.value,
        password: password.value,
      })
        .then(user => {
          this.setState({ error: null })
          name.value = ''
          username.value = ''
          password.value = ''
          this.props.onRegistrationSuccess()
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
    }
  }

  componentDidMount() {
    this.firstInput.current.focus()
    this.props.setOnLanding()
  }

  render() {
    const { error } = this.state
    return (
      <form
        onSubmit={this.handleSubmit}
        className='reg-form'
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div className='reg-element'>
          <Label htmlFor='registration-name-input'>
            Enter your name<Required />
          </Label>
          <Input
            ref={this.firstInput}
            id='registration-name-input'
            name='name'
            required
          />
        </div>
        <div className='reg-element'>
          <Label htmlFor='registration-username-input'>
            Choose a username<Required />
          </Label>
          <Input
            id='registration-username-input'
            name='username'
            autoComplete='none'
            required
          />
        </div>
        <div className='reg-element'>
          <Label htmlFor='registration-password-input'>
            Choose a password<Required />
          </Label>
          <Input
            id='registration-password-input'
            name='password'
            type='password'
            autoComplete='new-password'
            required
          />
        </div>
        <footer className='reg-element'>
          <Button type='submit' className='sign-up-button'>
            Sign up
          </Button>
          {' '}
          <Link to='/login'>Already have an account?</Link>
        </footer>
      </form>
    )
  }
}

export default RegistrationForm
