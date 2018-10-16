import React, { Component } from 'react';

import './App.css';


import DatePickerInput from '../src/Component/Datepickerinput';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkpointInterval: [{
        id: 1,
        interval: 3
      }, {

        id: 2,
        interval: 4

      }
      ]
    };

  }



  render() {


    return (
      <div>
        <DatePickerInput checkpointInterval={this.state.checkpointInterval} />
      </div>
    );
  }
}

export default App;
