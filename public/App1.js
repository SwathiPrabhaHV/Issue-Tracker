import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import {BrowserRouter as Router,
        Switch,
        Link,
        Route,
        Redirect} from 'react-router-dom';

import Page from './Page.js';
import IssueList from './IssueList.js';
import IssueReport from './IssueReport.js';
import IssueEdit from './IssueEdit.js';
import  NotFound from './NotFound.js';


function App(){
    return(
      <Router>
        <div>
          <nav>
            <ul>
              <li>
              <Link to='/'>Home</Link>
              </li>
              <li>
              <Link to='/issue'>Issue List</Link>
              </li>
              <li>
              <Link to='/report'>Issue Report</Link>
              </li>
            </ul>
          </nav>
        <Switch>
          <Route path='/issue'><IssueList /></Route>
          <Route path='/report'><IssueReport /></Route>
          <Route path='/edit/:id' component={IssueEdit} />
          <Redirect from="/" to="/issue" />
          <Route path="*"><NotFound /></Route>
        </Switch>
    </div>
  </Router>
      );
}


ReactDOM.render(<App />,document.getElementById("root"));





