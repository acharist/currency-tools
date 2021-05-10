import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

//Navabar
import Navabar from './app/Navbar.js';

//App components
import Currencies from './features/currencies/Currencies';
import Converter from './features/converter/Converter';

function App() {
  return (
      <Router>
        <div className="container">
          <Navabar/>
          <div className="app">
            <Switch>
              <Route exact path="/currencies">
                <Currencies/>
              </Route>
              <Route path="/converter">
                <Converter/>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;
