/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'

import Grid from '@material-ui/core/Grid'

import SignUp from '../components/SignUp'
import About from '../components/About'
import { useSelector, useDispatch } from 'react-redux'

import { getUser, getTasks, getTodo } from '../redux/selectors'

const Landing = () => {
  const user = useSelector(getUser)
  const dispatch = useDispatch()
  const tasks = useSelector(getTasks)
  const todo = useSelector(getTodo)

  const [timer, setTimer] = useState()
  const [date, setDate] = useState(new Date())
  const [timeLeft, setTimeLeft] = useState(0)
  const [breakLeft, setBreakLeft] = useState(0)
  const [work, setWork] = useState(false)

  useEffect(() => {
    setTimeLeft(45)
    setTimer(setInterval( () => setDate(new Date()), 1000))
    setTimer(setInterval( () => setBreakLeft(breakLeft - 1)), 60*1000)
    setTimer(setInterval( () => setTimeLeft(timeLeft - 1)), 1000)
  }, [])

  if (timeLeft == 0) {
    setWork(false)
    setBreakLeft(15)
  }

  if (breakLeft == 0) {
    setWork(true)
    setTimeLeft(45)
  }

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
      direction="column"
      justify="center"
      alignItems="center"
    >
      <h1>{date.toLocaleTimeString()}</h1>
      {work &&<p>{timeLeft}min until next break</p>}
      {!work &&<p>{timeLeft}min of break left</p>}
      <p>15min break next!</p>

    </Grid>
  )  
  
}

export default Landing