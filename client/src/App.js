/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'

import TopNav from './components/TopNav'
import Landing from './pages/Landing'
import Calendar from './pages/Calendar'
import Tasks from './pages/Tasks'
import Account from './pages/Account'
import Task from './pages/Task'
import LogIn from './pages/LogIn'

function App() {
  return (
    <Router>
      <div>
        <TopNav />
        <Switch>
         <Route path="/task/:id">
            <Task />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path="/calendar">
            <Calendar />
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
