import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

import {getUser} from '../redux/selectors'

const Task = () => {
  const user = useSelector(getUser)
  const history = useHistory()
  
  if (user.jwt === "") {
    history.push("/")
  }

  return (
    <h1>Task</h1>
  )
}

export default Task