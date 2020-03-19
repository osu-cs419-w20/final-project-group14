/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState } from 'react'

import Grid from '@material-ui/core/Grid'
import { TextField, Button } from '@material-ui/core'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setUsername, setJWT } from '../redux/actions'

function SignUp() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [jwt, setjwt] = useState("")

  const dispatch = useDispatch()
  const history = useHistory()

  function sendit() {
    dispatch(setUsername(username))
    dispatch(setJWT(jwt))
  }

  return (
    <Grid
      item
      css={css`
        border: solid 1px black;
        border-radius: 5px;
        padding: 20px;
      `}
    >
      <h2>Sign Up</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        // Call signup
        if (password === confirmPassword) {
          fetch('http://localhost:5000/api/v1/createUser', {
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
          }).then((res) => {
            if (res.status !== 200) {
              console.log("err")
            } else {
              res.json().then( json => {
                dispatch(setJWT(json['access_token']))
                history.push("/account")
            })}
          })
        }
       }
      }>
        <div><TextField required id="test" label="Username" onChange={e => setUsername(e.target.value)} /></div>
        <div><TextField required type="password" id="pass" label="Password" onChange={e => setPassword(e.target.value)}/></div>
        <div><TextField required type="password" id="confirm_pass" label="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/></div>
        <div><Button type="submit" variant="contained" color="primary" css={css`margin:25px;`}>Go!</Button></div>
      </form>
      <br />
      <NavLink to="/login" css={css`text-decoration: none; color: #2b7bbe;`}>Log In</NavLink>
    </Grid>
  )
}

export default SignUp