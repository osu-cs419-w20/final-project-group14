/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { TextField, Button } from '@material-ui/core'

import {getUser} from '../redux/selectors'

const NewTask = () => {
  const user = useSelector(getUser)
  const history = useHistory()
  const dispatch = useDispatch()

  const [title, setTitle] = useState("")
  const [due, setDue] = useState()
  const [description, setDescription] = useState("")

  if (user.jwt === "") {
    history.push("/")
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <h2>Create new task</h2>
      <form onSubmit={e => {
        e.preventDefault()

        console.log(due)

        fetch('http://localhost:5000/api/v1/createTask', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            description: description,
            complete: false,
            due: new Date(due).toISOString(),
            access_token: user.jwt
          })
        }).then( res => {
          if (res.status !== 200) {
            console.log("err")
            res.json().then(json => {
              console.log(json['msg'])
            })
          } else {
            res.json().then(json => {
              history.push("/task/" + json['id'])
            })
          }
        })
        
      }}>
        <div><TextField required label="Title" onChange={e => setTitle(e.target.value)}/></div>
        <div><TextField label="Description" onChange={e => setDescription(e.target.value)}/></div>
        <br />
        <div><TextField required label="Due Date" InputLabelProps={{shrink: true,}} type="datetime-local" onChange={e => setDue(e.target.value)}/></div>
        <div><Button type="submit" variant="contained" color="primary" css={css`margin:25px;`}>Create Task</Button></div>
      </form>
    </Grid>
  )
}

export default NewTask