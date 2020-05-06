import React from 'react';
import { browserHistory } from 'react-router';
import Portis from '@portis/web3';
import Web3 from 'web3';
import './Home.css';
import logo from '../images/logo.png';

/*const portis = new Portis('45ef67f9-e974-4ce7-bf08-10efd0aecc7e', 'goerli');
const web3 = new Web3(portis.provider);*/
//portis.showPortis();
export class Registro extends React.Component {

  constructor(props) {
    super(props);
    this.state = {dataLoaded: false};
    this.onRegister = this.onRegister.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  async componentDidMount() {
    this.setState({dataLoaded: true});
  }

  onRegister() {
    this.setState({dataLoaded: false});
    browserHistory.push({
      pathname: '/Main'
    });
    window.location.href = window.location.href;
  }

  _handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.onRegister();
    }
  }

  render() {
    if ( this.state.dataLoaded ) {
      return (
        <div className="Register" onKeyPress={this._handleKeyPress}>
          <img src={logo} alt="logo" className="Register-logo" />
          <p></p>
          <button className="Register-submit" onClick={this.onRegister}>
            Entrar
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <div className="Register-loader"></div>
        </div>
      );
    }
  }
}
