/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

import Grid from '@material-ui/core/Grid'

import SignUp from '../components/SignUp'
import About from '../components/About'
import { useSelector, useDispatch } from 'react-redux'

import { getUser, getTasks } from '../redux/selectors'

const Landing = () => {
  const user = useSelector(getUser)
  const dispatch = useDispatch()
  const tasks = useSelector(getTasks)
  if (user.jwt === "") {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <div><SignUp /></div>
        <div css={css`margin: 20px;`}><About /></div>
      </Grid>
    )
  }

  return (
    <Grid
      container
    >
      <h1>Logged In</h1>
    </Grid>
  )  
  
}

export default Landing