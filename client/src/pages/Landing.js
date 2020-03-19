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
        direction="row"
        justify="space-evenly"
        alignItems="stretch"
      >
        <div><SignUp /></div>
        <div><About /></div>
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