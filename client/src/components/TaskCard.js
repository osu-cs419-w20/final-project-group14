/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Card, CardContent, Button } from '@material-ui/core'
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getUser} from '../redux/selectors'
import { setCurrentTask } from '../redux/actions'

const TaskCard = ({ detail, url, id, title, due, description, complete, userId }) => {
  const user = useSelector(getUser)
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <Card>
      <CardContent>
        {!detail&&<h2><NavLink to={url}>{title}</NavLink></h2>}
        {detail&&<h2>{title}</h2>}
        <p>Due: {due}</p>
        {detail&&<p>{description}</p>}
        {complete&&<p>COMPLETE!</p>}
      </CardContent>
      <form onSubmit={ e => {
        e.preventDefault()

        fetch('http://localhost:5000/api/v1/updateTask', {
          method: 'POST',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id,
              complete: !complete,
              access_token: user.jwt
            })
        }).then( () => {
          history.push("/task/"+id)
        })
      }}>
        <Button type="submit" color="primary">Complete</Button>
      </form>      
      <form onSubmit={ e => {
        e.preventDefault()

        fetch('http://localhost:5000/api/v1/deleteTask', {
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
        }).then( () => {
          history.push("/tasks")
        })
      }}>
        <Button type="submit" color="secondary">Delete</Button>
      </form>
    </Card>
  )
}

export default TaskCard