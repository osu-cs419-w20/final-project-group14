/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'

import TopNav from './components/TopNav'
import Landing from './pages/Landing'

function App() {
  return (
    <Router>
      <div>
        <TopNav />
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
