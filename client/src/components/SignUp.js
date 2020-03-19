/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState } from 'react'

import Grid from '@material-ui/core/Grid'
import { TextField, Button } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

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
        
      }}>
        <TextField required id="test" label="Username" onChange={e => setUsername(e.target.value)} />
        <TextField required type="password" id="pass" label="Password" onChange={e => setPassword(e.target.value)}/>
        <TextField required type="password" id="confirm_pass" label="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/>
        <Button type="submit" variant="contained" color="primary">Go!</Button>
      </form>
      <br />
      <NavLink to="/login" css={css`text-decoration: none; color: #2b7bbe;`}>Log In</NavLink>
    </Grid>
  )
}

export default SignUp