import React, { Component } from 'react';
import './App.scss';
import Header from './Components/Header/Header';
import {BrowserRouter} from 'react-router-dom';
import routes from './routes'
import {Provider} from 'react-redux';
import store from './ducks/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header/>
            {routes}
            {/* <Footer/> */}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
