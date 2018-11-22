import React, { Component } from 'react';
import { Table, Tab, Preloader } from 'react-materialize';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';

export default class UserProfile extends Component {
  state = {
    data : {},
    loading: true,
  }
  async componentDidMount() {
    const res = await axios.get(`/api/users/${this.props.match.params.id}`);
    
    this.setState({data: res.data, loading: false});
    console.log(this.state);
    
  }
  render() {
    if(this.state.loading) {
      return (
        <div className="center-align center">
          <Preloader size='big'/>
        </div>
      )
    }
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th data-field="name">User</th>
              <th data-field="password">Password</th>
              <th data-field="email">Email</th>
              <th data-field="edit">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.data.user}</td>
              <td>{this.state.data.password}</td>
              <td>{this.state.data.email}</td>
              <td><Link to={`/user/${this.state.data.id}/edit`}>Edit user</Link></td>
            </tr>
          </tbody>
        </Table>
        <Link to="/">View all users</Link>
      </div>
    )
  }
}
