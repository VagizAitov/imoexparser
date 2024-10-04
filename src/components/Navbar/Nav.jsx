import React from 'react'
import { Link } from 'react-router-dom'
import classes from './nav.module.scss'

export default function Nav() {
  const logout = () => {
    localStorage.setItem('token', '');
  }

  return (
    <div className={classes.navbar}>
      <ul></ul>
      <ul>
        <li>
            <Link to={`/profile/${JSON.parse(localStorage.getItem('token')).id}`}>Profile</Link>
        </li>
        <li>
            <Link to='/posts'>Posts</Link>
        </li>
        <li>
            <Link onClick={logout} to='/login'>Logout</Link>
        </li>
      </ul>
      <ul></ul>
    </div>
  )
}
