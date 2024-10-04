
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import classes from './reg.module.scss'


export default function Reg() {
  const nav = useNavigate()
  useEffect(() => {
    if ((localStorage.getItem('token') != null) && (localStorage.getItem('token') != '')) {
      nav('/posts')
    }
  }, [])

  const [login, setLogin] = useState('')
  const [pass, setPass] = useState('')
  const [resp, setResp] = useState(false)


  const submit = () => {
    axios.get(`http://localhost:8082/users/${login}`)
    .then(res => {
      console.log(res)
      if(res.data.length == 0){
        const id = Date.now()
        axios.post('http://localhost:8082/users', {
          id: id,
          pass: pass,
          login: login,
          token: ''
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
        localStorage.setItem('token', JSON.stringify({
          id: id,
          login: login,
          pass: pass
        }))
        nav('/')
      }else{
        console.log('This login already exist')
      }
      })
  }

  return (
    <div className={classes.main}>
      <div className={classes.wrapper}>
        <div className={classes.regForm}>
          <img width="30" height="30" src="https://img.icons8.com/pastel-glyph/100/person-male--v2.png" alt="person-male--v2"/>
          <input type="text" name="" id="" placeholder='Username' onChange={() => setLogin(event.target.value)}/>
          <input type="text" name="" id="" placeholder='Password' onChange={() => setPass(event.target.value)}/>
          <button onClick={submit}>Register</button>
          <div className={classes.haveAcc}>
            <p>Already have an account?</p>
            <Link to='/login'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
