import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  simpleAction,
  asyncActionWithThunk,
  incrementAction,
} from './actions'

import logo from './assets/logo.svg';
import './App.css';

class App extends Component {
  simpleAction = (event) => {
    this.props.simpleAction();
  }

  increment = () => {
    this.props.increment()
  }

  getUser = () => {
    this.props.getUser()
  }

  createUser = () => {
    this.props.createUser()
  }

  componentDidMount() {
    const { asyncAction } = this.props
    asyncAction({payload: 'payload'})
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
          <button onClick={this.increment}> + </button>
          <button onClick={this.getUser}> get </button>
          <button onClick={this.createUser}> create </button>
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
  increment: () => dispatch(incrementAction()),
  getUser: () => dispatch({type: 'GET_USER', id: 2}),
  createUser: () => dispatch({type: 'CREATE_USER'}),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
