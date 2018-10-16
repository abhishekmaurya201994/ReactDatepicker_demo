import React, { Component } from 'react';
// import * as React from 'react';


// import logo from './logo.svg';
import './App.css';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerInput from '../src/Component/Datepickerinput';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkpointInterval: [{
        id: 1,
        interval: 3
      },{
        
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
