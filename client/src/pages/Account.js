import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'

import {getUser} from '../redux/selectors'

const Account = () => {
  const user = useSelector(getUser)
  const history = useHistory()

  if (user.jwt === "") {
    history.push("/")
  }

  return (
    <h1>Account</h1>
  )
}

export default Account