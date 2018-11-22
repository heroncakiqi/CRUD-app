import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Dashboard from './components/Dashboard';
import CreateUser from './components/CreateUser';
import UserProfile from './components/UserProfile';
import EditUser from './components/EditUser';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/user/create' exact component={CreateUser} />
            <Route path='/user/:id' exact component={UserProfile} />
            <Route path='/user/:id/edit' exact component={EditUser} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
