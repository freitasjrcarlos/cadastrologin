import React from 'react';
import './App.css';
import firebase from './Conn';
import Home from './Home';
import FormLogin from './FormLogin';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: null,
    }

    this.authListener = this.authListener.bind(this);
  }

  componentDidMount(){
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render(){
    return(
      <div>{this.state.user ? (<Home />) : (<FormLogin />)}</div>
    );
  }
}

