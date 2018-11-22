import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Form from './Form';


export default class EditUser extends Component {
  state = {
    user: '',
    password: '',
    current: '',
    email: '',
    redirect: false,
    error: {}
  }
  async componentDidMount() {
    const res = await axios.get(`/api/users/${this.props.match.params.id}`);
    this.setState({user: res.data.user, email: res.data.email} );
    document.getElementsByTagName('LABEL')[0].classList.add("active");
    document.getElementsByTagName('LABEL')[3].classList.add("active");
  }
  handleChange = (e) => { 
    this.setState({ [e.target.name] : e.target.value });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`/api/user/${this.props.match.params.id}/edit`, this.state);
    if(res.data.status === 400) {
      this.setState({error :{ ...res.data }});
    } else {
      this.setState({redirect: true});
    }
  }
  render() {
    return this.state.redirect ? <Redirect to='/'/>  :
      (
        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          user={this.state.user}
          currentTrue
          current={this.state.current}
          password={this.state.password}
          email={this.state.email}
          error={this.state.error}
        />
      )
  }
}
