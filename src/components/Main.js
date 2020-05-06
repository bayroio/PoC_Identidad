import React from 'react';
import PerfilInfoContract from "../contracts/PerfilInfo.json";
import getWeb3 from "../utils/getWeb3";
import './Main.css';
import logo from '../images/logo.png';

export class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accountAdress: '',
      name: '',
      description: '',
      area: '',
      web3: null, 
      accounts: null,
      contract: null,
      dataLoaded: false
    };
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("account[0]: "+accounts[0]);
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log("networkId: "+networkId);
      const deployedNetwork = PerfilInfoContract.networks[networkId];
      console.log("deployedNetwork: ",deployedNetwork);
      console.log("deployedNetwork address: "+deployedNetwork.address);
      const instance = new web3.eth.Contract(
        PerfilInfoContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, accountAdress: accounts[0] }, this.loadData);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleFormChange (e, property){
    const { value } = e.target;
    this.setState({[property]: value});
  }

  loadData = async () => {
    const { accounts, contract } = this.state;
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getData(this.state.accountAdress).call();
    // Update state with the result.
    this.setState({ name: response[0], description: response[1], area: response[2], dataLoaded: true});
  };

  onSave = async () => {
    this.setState({dataLoaded: false});
    console.log(this.state);
    const { accounts, contract } = this.state;
    try {
      // Stores a given value, 53 by default.
      await contract.methods.updateMediacion(this.state.accountAdress, this.state.name, this.state.description, this.state.area).send({ from: accounts[0] });
      this.setState({dataLoaded: true});
      alert("Datos Actualizados!");
    }
    catch (error){
      alert("ERROR!");
      console.log("error: "+error);
    }
  }

  render() {
    if ( this.state.dataLoaded ) {
      return (
        <div className="Main">
          <img src={logo} alt="logo" className="Main-logo" />
          <div className="Divisor"/>
          <div className="Main-form">
            <div className="Main-field noMargin">
              <h5>Nombre</h5>
              <input name="name" id="name" type="text" value={this.state.name} className="Main-box" onChange={e => this.handleFormChange(e, 'name')} />
            </div>
            <p></p>
            <div className="Main-field noMargin">
              <h5>Descripción</h5>
              <input name="description" id="description" type="text" value={this.state.description} className="Main-box" onChange={e => this.handleFormChange(e, 'description')} />
            </div>
            <p></p>
            <div className="Main-field noMargin">
              <h5>Área</h5>
              <input name="area" id="area" type="text" value={this.state.area} className="Main-box" onChange={e => this.handleFormChange(e, 'area')} />
            </div>
            <p></p>
            <button className="Main-submit" onClick={this.onSave}>
              Guardar
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="Main-loader"></div>
        </div>
      );
    }
  }
}
