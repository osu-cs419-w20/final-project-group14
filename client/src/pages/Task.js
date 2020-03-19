import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'

import {getUser, getTasks} from '../redux/selectors'
import TaskCard from '../components/TaskCard'
import { Grid } from '@material-ui/core'

const Task = () => {
  const user = useSelector(getUser)
  const history = useHistory()
  const tasks = useSelector(getTasks)
  
  const { id } = useParams()

  const [title, setTitle] = useState("")  
  const [due, setDue] = useState("")
  const [description, setDescription] = useState("")
  const [complete, setComplete] = useState(false)

  if (user.jwt === "") {
    history.push("/")
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/task', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        access_token: user.jwt
      })
    }).then ( res => {
      if (res.status !== 200) {
        console.log("err")
      } else {
        res.json().then( json => {
          setTitle(json['title'])
          setDue(json['due'])
          setDescription(json['description'])
          setComplete(json['complete'])
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
      <TaskCard detail={true} id={id} title={title} due={due} description={description} complete={complete} />
    </Grid>
  )
}

export default Task