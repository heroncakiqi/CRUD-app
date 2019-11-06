import React, { Component } from 'react';
import { Button } from 'react-materialize';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

import axios from 'axios';

export default class DashboardContent extends Component {

  state = {
    disabled: false
  }

  onClick = async (e) => {
    this.setState({ disabled: true });
    await axios.delete(`https://reactexpress-imakxffofs.now.sh/api/users/${this.props.user._id}`);
    this.setState({ disabled: false });
    this.props.rerender();
  }
  render() {
    return (
      <tr>
        <td>{this.props.user.id}</td>
        <td>{this.props.user.user}</td>
        <td>{this.props.user.password}</td>
        <td>{this.props.user.email}</td>
        <td><Link to={'/user/' + this.props.user.id}>View Profile</Link></td>
        <td><Button 
          disabled={this.state.disabled} 
          onClick={this.onClick} 
          className='red small-btn' small='true' waves='light'> 
            <MdDelete/>
          </Button>
        </td>
      </tr>
    )
  }
}
