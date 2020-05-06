import React from 'react';
import {Registro} from "./Registro";

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  render() {
    return (
      <div className="Main">
        <Registro />
      </div>
    );
  }
}
