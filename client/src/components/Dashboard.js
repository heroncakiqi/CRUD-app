import React, { Component } from 'react'
import { Table,  Preloader } from 'react-materialize'
import { Link } from 'react-router-dom';
import axios from 'axios';

import DashboardContent from './DashboardContent';

class Dashboard extends Component {

  state = {
    data: [],
    loading: false
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get('/api/users');
    this.setState({ loading: false, data: res.data });
  }

  rerender = async () => {
    const res = await axios.get('/api/users');
    this.setState({ data: res.data });
  }

  render() {
    if(this.state.loading) {
      return  (
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
              <th data-fied="id">Id</th>
              <th data-field="user">User</th>
              <th data-field="password">Password</th>
              <th data-field="email">Email</th>
              <th data-field="profile">Profile</th>
              <th data-field="destroy">Destroy</th>
            </tr>
          </thead>
          <tbody>
          {this.state.data.map((user, index) => (
            <DashboardContent key={index}  user={user} rerender={this.rerender} />
          ))}
          </tbody>
        </Table>
        <Link to="/user/create" >Create new user</Link>
      </div>
    )
  }
}

export default Dashboard