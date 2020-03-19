/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { TextField, Button } from '@material-ui/core'

import {getUser} from '../redux/selectors'
import { setJWT } from '../redux/actions'

const Account = () => {
  const user = useSelector(getUser)
  const history = useHistory()
  const dispatch = useDispatch()

  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  if (user.jwt === "") {
    history.push("/")
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <h2>Your Account</h2>
      <form onSubmit={e => {
        e.preventDefault()

        if (newPassword === confirmPassword) {
          fetch('http://localhost:5000/api/v1/changePass', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              password: password,
              newPassword: newPassword,
              access_token: user.jwt
            })
          }).then( res => {
            if (res.status !== 200) {
              console.log("err")
            } else {
              res.json().then( json => { dispatch(setJWT(json['access_token']))})
              history.push("/login")
            }
          })
        }
      }}>
        <div><TextField required type="password" label="Old Password" onChange={e => setPassword(e.target.value)}/></div>
        <div><TextField required type="password" label="New Password" onChange={e => setNewPassword(e.target.value)}/></div>
        <div><TextField required type="password" label="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/></div>
        <div><Button type="submit" variant="contained" color="primary" css={css`margin:25px;`}>Change Password</Button></div>
      </form>
    </Grid>
  )
}

export default Account