import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//pages
import AdminPrivateRoute from './AdminPrivateRoute';
import Home from './Component/frontend/Home';
import Login from './Component/frontend/Auth/Login';
import Register from './Component/frontend/Auth/Register';

// error page
import Page403 from '../src/Component/errors/Page403';
import Page404 from '../src/Component/errors/Page404';

//request to api
import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})


function App() {
  
  return (
    <div className="App">
      <Router>
        <Switch>

            <Route exact path="/" component={Home} />

            {/* 403 access denied and 404 page not found */}
            <Route exact path="/403" component={Page403} />
            <Route exact path="/404" component={Page404} />

            {/* <Route path="/login" component={Login} />
            <Route path="/register" component={Register} /> */}

              <Route path="/login">
                {localStorage.getItem('auth_token') ? <Redirect to="/" /> : <Login />}
              </Route>
              <Route path="/register">
              {localStorage.getItem('auth_token') ? <Redirect to="/" /> : <Register />}
              </Route>

            {/* <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props} />} /> */}
            <AdminPrivateRoute path="/admin" name="Admin" />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
