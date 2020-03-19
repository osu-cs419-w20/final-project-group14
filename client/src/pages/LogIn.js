/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import Grid from '@material-ui/core/Grid'
import { TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import { setJWT } from '../redux/actions'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

const LogIn = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <h1>Welcome Back!</h1>
      
      <form onSubmit={(e) => {
        e.preventDefault()

        fetch('http://localhost:5000/api/v1/auth', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        }).then( res => {
          if (res.status !== 200) {
            console.log("err")
          }
          return res.json()
        }).then( json => {
          dispatch(setJWT(json))
          history.push("/account")
        })
      }}>
        <div><TextField required label="Username" onChange={e => setUsername(e.target.value)} /></div>
        <div><TextField required type="password" label="Password" onChange={e => setPassword(e.target.value)}/></div>
        <div><Button type="submit" color="primary">Log In</Button></div>
      </form>
    </Grid>
  )
}

export default LogIn