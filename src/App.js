import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerInput from './Component/Datepickerindex';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  
  }


 
  render() {

  
    return (
      <div>
  <DatePickerInput />
      </div>
    );
  }
}

export default App;
