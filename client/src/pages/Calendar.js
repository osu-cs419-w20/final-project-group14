import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

import {getUser} from '../redux/selectors'

const Calendar = () => {
  const user = useSelector(getUser)
  const history = useHistory()

  if (user.jwt === "") {
    history.push("/")
  }

  return (
    <h1>Calendar</h1>
  )
}

export default Calendar