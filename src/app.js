import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router';

import Layout from './components/Layout';
import Index from './pages/index';

render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Index}/>
      <Route path="index" component={Index}/>
    </Route>
  </Router>
), document.getElementById('container'));
