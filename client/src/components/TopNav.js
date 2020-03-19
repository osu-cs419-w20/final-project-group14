/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { NavLink } from 'react-router-dom'

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import { Typography, IconButton} from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const TopNav = () => {
  const classes = useStyles()
  const navLinks = css`
    list-style-type: none;
    margin: 0;
    padding: 0;
  `

  const navLink = css`
    padding: 8px;
    display: inline;
  `

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            <NavLink to="/" css={css`text-decoration: none; color: white;`}>TimeBlocker</NavLink>
          </Typography>
          <NavLink to="/calendar" css={css`text-decoration: none; color: white; padding: 10px;`}>Calendar</NavLink>
          <NavLink to="/tasks" css={css`text-decoration: none; color: white; padding: 10px;`}>Tasks</NavLink>
          <NavLink to="/account" css={css`text-decoration: none; color: white; padding: 10px;`}>Account</NavLink>
          <NavLink to="/login" css={css`text-decoration: none; color: white; padding: 10px;`}>Log In</NavLink>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  )
}

export default TopNav