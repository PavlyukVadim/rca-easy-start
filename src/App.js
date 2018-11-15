import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  simpleAction,
  asyncActionWithThunk,
} from './actions'

import logo from './assets/logo.svg';
import './App.css';

class App extends Component {
  simpleAction = (event) => {
    this.props.simpleAction();
  }

  componentDidMount() {
    const { asyncAction } = this.props
    asyncAction()
  }

  render() {
    console.log('app', this.state, this.props)

    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <pre>
           {
             JSON.stringify(this.props)
           }
          </pre>
          <button onClick={this.simpleAction}>Test redux action</button>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  simpleAction: () => dispatch(simpleAction()),
  asyncAction: () => dispatch(asyncActionWithThunk()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
