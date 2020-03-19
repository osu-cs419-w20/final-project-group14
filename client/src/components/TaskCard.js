/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Card, CardContent } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

const TaskCard = ({ detail, url, id, title, due, description, complete, userId }) => (
  <Card>
    <CardContent>
      {!detail&&<h2><NavLink to={url}>{title}</NavLink></h2>}
      {detail&&<h2>{title}</h2>}
      <p>Due: {due}</p>
      {detail&&<p>{description}</p>}
      {complete&&<p>COMPLETE!</p>}
    </CardContent>
  </Card>
)

export default TaskCard