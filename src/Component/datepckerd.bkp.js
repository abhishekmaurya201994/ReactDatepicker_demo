import React, { Component } from 'react';
// import * as React from 'react';
// import logo from './logo.svg';
import '../App.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
var chk1 = [];
class DatePickerInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startDate: undefined,
      midDate: undefined,
      endDate: '',
      checkpoint: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange_endDate = this.handleChange_endDate.bind(this);
    this.handle_midDate = this.handle_midDate.bind(this);

    this.diffTest = this.diffTest.bind(this);
    this.diffTestMain = this.diffTestMain.bind(this);

  }

  handleChange(date) {

    this.setState({
      startDate: date
    });
  }
  handleChange_endDate(date) {

    this.setState({
      endDate: date
    })
  }

  handle_midDate(date) {

    this.setState({
      midDate: date
    })
  }


  isWeekday = (date) => {
    const day = date.day()
    return day !== 0 && day !== 6
  }
  componentWillMount() {
    console.log("before render");
    console.log(this.props.checkpointInterval[0].interval);

    for (let i = 0; i < this.props.checkpointInterval[0].interval; i++) {
      chk1.push(i);
      console.log(i);
    }

  }
  diffTest() {

    // let checkpointInterval = 3;
    let checkpointInterval = this.props.checkpointInterval[0].interval;
    let self = this;
    // let a=[];
    var a = [];
    // console.log(this.state.startDate);
    if (this.state.startDate && this.state.midDate) {
      if (this.state.startDate < this.state.midDate) {
        let date1 = new Date(this.state.startDate);
        let date2 = new Date(this.state.midDate);

        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        let interval = Math.round(diffDays / checkpointInterval);

        var tomorrow = new Date();
        for (let i = 1; i <= checkpointInterval; i++) {
          let checkpointIntData = interval * i;
          /*To do*/
          let checkpointInputDate = date1;
          checkpointInputDate.setDate(new Date(this.state.startDate).getDate() + checkpointIntData);
          checkpointInputDate = this.validateWeekendDate(checkpointInputDate)
          a.push(new Date(checkpointInputDate).toLocaleDateString());
          this.setState({ checkpoint: a });
          checkpointInputDate = new Date(this.state.startDate);
        }

      }
      else {
        a = [];
        alert("Start date should be less than mid date");
        this.setState({ checkpoint: a });
      }
    }
    else {
      alert("Please insert Start date and mid date");
    }
  }

  validateWeekendDate(checkpointInputDate) {
    checkpointInputDate = new Date(checkpointInputDate);
    if (checkpointInputDate.getDay() == 6) {
      checkpointInputDate.setDate(new Date(checkpointInputDate).getDate() - 1);
    }
    if (checkpointInputDate.getDay() == 0) {
      checkpointInputDate.setDate(new Date(checkpointInputDate).getDate() + 1);
    }

    return checkpointInputDate;
  }

  diffTestMain(interval) {
    console.log(interval);
    alert(interval);
  }

  renderPickerDate() {



    return (
      <div>


        {chk1.map((item, index) => (
          <li key={index} >
            {/* Name: {item.interval} */}
            <div>
            </div>
            <br />

            <label>checkpoint {index + 1}</label><br />
            <input type="text" value={this.state.checkpoint[index] ? this.state.checkpoint[index] : ''} readOnly />
            {/* <button onClick={this.diffTestMain.bind(this,item.interval)}>Save</button> */}
          </li>
        ))}
        {/* // {this.props.checkpointInterval.map((item ,index)=> (
//   <li key={item.id}>
//    Name: {item.interval}
//    <div>
//    </div>
//    <br/>
//    {index}
//    <label>checkpoint {index+1}</label><br />
//    <input type="text"   value={this.state.checkpoint[index]}/>
//    <button onClick={this.diffTestMain.bind(this,item.interval)}>Save</button>
//   </li>
))} */}
      </div>

    )
  }



  render() {
    // const { dataFromParent } = this.props;

    return (
      <div className="appcenter">
        <label>Start Date</label>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}

          showMonthDropdown
          showYearDropdown
          filterDate={this.isWeekday}
        />


        {this.renderPickerDate()}


        <br />
        <label>Mid Date</label>
        <DatePicker
          selected={this.state.midDate}
          onChange={this.handle_midDate}

          showMonthDropdown
          showYearDropdown
          filterDate={this.isWeekday}
        />
        <br />
        
        <button onClick={this.diffTest}>Save</button>
      </div>
    );
  }
}

export default DatePickerInput;
