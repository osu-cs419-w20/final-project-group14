import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

import {getUser, getTasks} from '../redux/selectors'
import { Grid } from '@material-ui/core'

import TaskCard from '../components/TaskCard'
import { setTasks } from '../redux/actions'

const Tasks = () => {
  const user = useSelector(getUser)
  const history = useHistory()
  const tasks = useSelector(getTasks)

  const dispatch = useDispatch()

  if (user.jwt === "") {
    //history.push("/")
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/tasks', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: user.jwt
      })
    }).then( res => {
      if (res.status !== 200) {
        console.log("err")
      } else {
        res.json().then( json => {
          dispatch(setTasks(json))
        })
      }
    })
  })

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <h1>Your Tasks</h1>
      <NavLink to="/newtask">Create New Task</NavLink>
      {tasks.map(task => <TaskCard detail={false} url={'/task/' + task.id} key={task.id} {...task}  />)}
    </Grid>
  )
}

export default Tasks