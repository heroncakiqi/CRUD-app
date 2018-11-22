import React from 'react';

import { Row, Input, Button, Icon } from 'react-materialize';

export default function Form(props) {
  return (
    <Row>
      <form onSubmit={props.handleSubmit}>
        <Input 
          onChange={props.handleChange} 
          value={props.user} 
          required
          type="text" 
          name='user' 
          label="User" 
          error={props.error.user}
        s={12} 
        />
        {props.currentTrue && 
          <Input 
            onChange={props.handleChange}
            value={props.current}
            required
            type="password" 
            name="current" 
            error={props.error.password}
            label="Current Password" 
            s={12} 
          />
        }
        <Input 
          onChange={props.handleChange}
          value={props.password}
          required={props.currentTrue ? false : true}
          type="password" 
          name="password" 
          label={props.currentTrue ? 'New Password' : 'Passowrd'} 
          s={12} 
        />
        <Input 
          onChange={props.handleChange} 
          value={props.email} 
          required
          type="email" 
          name="email" 
          error={props.error.email} 
          label="Email"
          s={12} 
        />
        <Button type="submit" className='submit'>Submit<Icon right>send</Icon></Button>
    </form>
  </Row>
  )
}
