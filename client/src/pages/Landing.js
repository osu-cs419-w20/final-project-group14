import React from 'react'

import Grid from '@material-ui/core/Grid'

import SignUp from '../components/SignUp'
import About from '../components/About'

const Landing = () => {
  
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

export default Landing