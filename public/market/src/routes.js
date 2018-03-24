

import React                        from 'react';
import { BrowserRouter as Router, 
         Route, Switch }            from 'react-router-dom';
import createMemoryHistory                from 'history/createMemoryHistory';
import ReposPage                    from './components/ReposPage';
import IssuesPage                   from './components/IssuesPage';

const history = createMemoryHistory({
  initialEntries: [`/market`]
});


const routes = () => (
    <Router history={history}>
        <Switch>
            <Route exact path='/market' component={ReposPage}/>
            <Route path='/:user/:repo/issues' component={IssuesPage}/>
        </Switch>
    </Router>
);

export default routes;