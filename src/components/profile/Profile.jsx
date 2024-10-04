import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Nav from '../Navbar/Nav'
import classes from './profile.module.scss'



export default function Profile() {

  const [id, setId] = useState(JSON.parse(localStorage.getItem('token')).id)
  const [login, setLogin] = useState(JSON.parse(localStorage.getItem('token')).login)
  const [data, setData] = useState()
  const [posts, setPosts] = useState()
  const [likedPosts, setLikedPosts] = useState([])
  const [final, setFinal] = useState([])
  const [numberPosts, setNumberPosts] = useState(0)

  useEffect(() => {
    axios.get(`http://localhost:8082/users/${login}`)
    .then(res => {setData(res.data[0])
      axios.get(`http://localhost:8082/liked/${res.data[0].id}`)
      .then(res => {
        console.log(res.data)
        setNumberPosts(res.data.length)
        const length = res.data.length
        for(let i = 0; i< res.data.length; i++){
          axios.get(`http://localhost:8082/posts/${res.data[i].iduser,res.data[i].idpost}`)
          .then(res => {
            if(final.length >= length){
              return
            } else {setFinal(final => [...final, res.data])}
          })
        }
      })
    })
  }, [])

  return (
    <div>
      <Nav/>
      <div className={classes.main}>
        <div className={classes.profileWrapper}>
          {(data == undefined) ? <p>Loading...</p> : 
          <div className={classes.profileInfo}>
            <div className={classes.profilePicture}>
              <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/user.png" alt="user"/>
            </div>
            <div>
              <p>Your id: {data.id}</p>
              <p>Your login: {data.login}</p>
            </div>
          </div>
          }
        </div>
        Liked posts:
        <div>
          {((final == undefined) || (numberPosts == undefined)) ? <p>Loading...</p> : 
            final.slice(0, numberPosts).map(post => 
              <div className={classes.wrapper}>
                <p className={classes.title}>
                  <Link to={`/post/${post[0].id}`}>
                    {post[0].title}
                  </Link>
                </p>
                <p className={classes.text}>{post[0].text}</p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
