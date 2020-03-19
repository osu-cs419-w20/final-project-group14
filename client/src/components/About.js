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
      <p>TimeBlocker is an app that lets you control your time.</p>
    </div>
  )
}

export default About