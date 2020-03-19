import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

import {getUser, getTasks} from '../redux/selectors'
import { Grid } from '@material-ui/core'

import TaskCard from '../components/TaskCard'

const Tasks = () => {
  const user = useSelector(getUser)
  const history = useHistory()
  const tasks = useSelector(getTasks)

  if (user.jwt === "") {
    //history.push("/")
  }

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