import React                from 'react'
import {
  Redirect, Route,
  Router, Switch
}                           from 'react-router-dom'
// import Login                from './Auth/Login/Login'
// import 404 page
// import Full                 from './containers/Full'
import Auth                 from './Auth/Auth'
import history              from './Auth/history'
import routes               from './routes'

const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
  console.log("AUTHROUTES EXECUTING AUTHENTICATION")
  console.log(nextState)
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const authRoutes = () => 
  <Router history={history}>
    <div>
      <Switch>

        {routes.map(route => {
          route.isProtected && !auth.isAuthenticated() ? (
            // <Login auth={auth} cb={handleAuthentication} {...props} />
            auth.login()
          ) : (
            <Route
              path={route.path}
              exact={route.exact}
              name={route.name}
              component={route.component}
              auth={auth}
            />
          )
        })}

      </Switch>
    </div>
  </Router>

    // // If route is not protected, render.
    // !route.protected ? (
    //   <Route
    //     path={route.path}
    //     exact={route.exact}
    //     name={route.name}
    //     auth={auth}
    //     component={route.component}
    //   />
    // )
    // : (
    //   // If it is, check for authentication.
    //   // If auth check fails, render login.
    //   <Route path={route.path} render={(props) => (
    //     !auth.isAuthenticated() ? (
    //       <Login auth={auth} cb={handleAuthentication} {...props} />
    //     ) : (
    //       <Route
    //         path={route.path}
    //         name={route.name}
    //         auth={auth}
    //         component={route.component}
    //         {...props}
    //       />
    //     )
    //   )} />
    // )