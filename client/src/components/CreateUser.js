import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import Form from './Form';

import axios from 'axios';

class CreateUser extends Component {

  state = {
    user: '',
    password: '',
    email: '',
    redirect: false,
    error: {}
  }

  handleChange = (e) => { 
    this.setState({ [e.target.name] : e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('https://reactexpress-imakxffofs.now.sh/api/user/create', this.state);
    if(res.data.status === 400){
      this.setState({error :{ ...res.data }});
    }else {
      this.setState({redirect: true, user: '', password: '', email: '', error: {}});
    }
  }

  render() {
   return this.state.redirect ? <Redirect to='/'/>  :
    (
      <Form 
        handleSubmit={this.handleSubmit} 
        handleChange={this.handleChange}
        user={this.state.user}
        passowrd={this.state.password}
        email={this.state.email}
        error={this.state.error}
      />
    )
  }
}

export default CreateUser;
