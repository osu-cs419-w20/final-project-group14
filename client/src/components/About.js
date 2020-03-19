/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const About = () => {
  return (
    <div css={css`
      border: solid 1px black;
      border-radius: 5px;
      padding: 20px;
    `}>
      <h2>About TimeBlocker</h2>
      <p>TimeBlocker is an app that lets you control your time. Add all your tasks for the week, set their due dates, and get to work!</p>
      <p>When you are working we will keep track of your time, and let you know when it is time for a break. (And when to get back to work!)</p>
    </div>
  )
}

export default About