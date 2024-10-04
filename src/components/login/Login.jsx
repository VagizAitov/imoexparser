import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import classes from './login.module.scss'


export default function Login() {

  const nav = useNavigate()

  useEffect(() => {
    if ((localStorage.getItem('token') != null) && (localStorage.getItem('token') != '')) {
      nav('/')
    }
  }, [])


  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')


  const submit = () => {
    axios.get(`http://localhost:8082/users/${login}`)
    .then(res => {
      if(res.data[0] == undefined){
        alert('Неверный логин ил пароль')
      }else {
        if(res.data[0].pass == password){
          localStorage.setItem('token', JSON.stringify({
            id: res.data[0].id,
            login: login,
            pass: password
          }))
          alert('Вы вошли')
          nav('/posts')
        }
      }
    })
    .catch(err => console.log(err))
  }
  return (
    <div className={classes.main}>
      <div className={classes.wrapper}>
        <div className={classes.loginForm}>
          <img width="30" height="30" src="https://img.icons8.com/pastel-glyph/100/person-male--v2.png" alt="person-male--v2"/>
          <input type="text" name="" id="" placeholder='Username' onChange={() => setLogin(event.target.value)}/>
          <input type="password" name="" id="" placeholder='Password' onChange={() => setPassword(event.target.value)}/>
          <button onClick={submit}>Login</button>
          <div className={classes.noAcc}>
            <p>Don't have an account?</p>
            <Link to='/registration'>Register</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
