import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  simpleAction,
  incrementAction,
  getUser,
  createUser,
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
    this.props.getUser(2)
  }

  createUser = () => {
    const user = {
      title: 'foo',
      body: 'bar',
      userId: 1
    }
    this.props.createUser(user)
  }

  componentDidMount() {
    const { getUser } = this.props
    getUser(1)
  }

  render() {
    console.log('app', this.state, this.props)

    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <pre>{JSON.stringify(this.props)}</pre>
          <button onClick={this.simpleAction}>Test redux action</button>
          <button onClick={this.increment}> async + </button>
          <button onClick={this.getUser}> get user with id 2 </button>
          <button onClick={this.createUser}> create custom user </button>
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
  increment: () => dispatch(incrementAction()),
  getUser: (id) => dispatch(getUser(id)),
  createUser: (user) => dispatch(createUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
