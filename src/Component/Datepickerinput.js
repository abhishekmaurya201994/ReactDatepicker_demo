import React, { Component } from 'react';
// import * as React from 'react';
// import logo from './logo.svg';
import '../App.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
var chk1 = [];var chkpoin2=[];
class DatePickerInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startDate:'',
      midDate:'',
      endDate:'',
      checkpoint: [],checkpointend:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange_endDate = this.handleChange_endDate.bind(this);
    this.handle_midDate = this.handle_midDate.bind(this);

    this.diffTest = this.diffTest.bind(this);
    this.diffTestMain = this.diffTestMain.bind(this);
    this.chkselecteddate=this.chkselecteddate.bind(this);

  }

  handleChange(e) {
// console.log(e.target.value);

var d2= this.chkselecteddate(e.target.value);
// console.log(d2);
if(d2){
    this.setState({
      startDate:e.target.value
    });
  }
  else{
    this.setState({
      startDate:''
    });
  }
  }
  handleChange_endDate(e) {
let d2=this.chkselecteddate(e.target.value);
if(d2){
    this.setState({
      endDate:e.target.value
    })
  }
  else{
    this.setState({
      endDate:''
    })
  }
  }

  handle_midDate(e) {
   let  d2=this.chkselecteddate(e.target.value);
    if(d2){
    this.setState({
      midDate:e.target.value
    })
  }
  else{
    this.setState({
      midDate:''
    })
  }
  }

  chkselecteddate(d){
    d=new Date(d);
    
    if(d.getDay()==0 || d.getDay()==6){
      alert("Day should not be sat and sun");
      return false;
     
    }
    else{
      return true;
    }
  }


  isWeekday = (date) => {
    const day = date.day()
    return day !== 0 && day !== 6
  }
  componentWillMount() {
    // console.log("before render");
    // console.log(this.props.checkpointInterval[0].interval);

    for (let i = 0; i < this.props.checkpointInterval[0].interval; i++) {
      chk1.push(i);
      console.log(i);
    }
    for (let i = 0; i < this.props.checkpointInterval[1].interval; i++) {
      chkpoin2.push(i);
      console.log(i);
    }

  }
  diffTest() {

    // let checkpointInterval = 3;
    
    let self = this;
    // let a=[];
    var a = [];var b=[];
    // console.log(new Date(this.state.startDate).getDay());
    // console.log(new Date(this.state.midDate).getDay());
    if (this.state.startDate && this.state.midDate) {
      if (this.state.startDate < this.state.midDate) {
        let checkpointInterval = this.props.checkpointInterval[0].interval;
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
          console.log("before change: "+checkpointInputDate);
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
    if(this.state.midDate && this.state.endDate){
      if (this.state.midDate < this.state.endDate) {
        let checkpointInterval = this.props.checkpointInterval[1].interval;
      let date1 = new Date(this.state.midDate);
      let date2 = new Date(this.state.endDate);

      let timeDiff = Math.abs(date2.getTime() - date1.getTime());
      let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      let interval = Math.round(diffDays / checkpointInterval);

      var tomorrow = new Date();
      for (let i = 1; i <= checkpointInterval; i++) {
        let checkpointIntData = interval * i;
        /*To do*/
        let checkpointInputDate = new Date(this.state.midDate);
        
        console.log("before change: "+checkpointInputDate);
        checkpointInputDate.setDate(new Date(this.state.midDate).getDate() + checkpointIntData);
        console.log(checkpointInputDate);
        checkpointInputDate = this.validateWeekendDate(checkpointInputDate)
        b.push(new Date(checkpointInputDate).toLocaleDateString());
        this.setState({ checkpointend: b});
        checkpointInputDate = new Date(this.state.midDate);
    }
  }else{
    alert("Mid Date Should be less than End Date");
  }
  }
    else {
      alert("Please insert Mid Date and End date");
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

  renderPickerEndDate(){
    return(
<div>
{chkpoin2.map((item, index) => (
  <li key={index} >
    {/* Name: {item.interval} */}
    <div>
    </div>
    <br />

    <label>checkpoint {index + 1}</label><br />
    <input type="text" value={this.state.checkpointend[index] ? this.state.checkpointend[index] : ''} readOnly />
    {/* <button onClick={this.diffTestMain.bind(this,item.interval)}>Save</button> */}
  </li>
))}
  </div>
    )
  }


  render() {
    // const { dataFromParent } = this.props;

    return (
      <div className="appcenter">
        <label>Start Date</label>
        {/* <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}

          showMonthDropdown
          showYearDropdown
          filterDate={this.isWeekday}
        /> */}

           <input type="date" value={this.state.startDate} onChange={this.handleChange}  />
        {this.renderPickerDate()}


        <br />
        <label>Mid Date</label>
        <input type="date" value={this.state.midDate} onChange={this.handle_midDate} />
        {/* <DatePicker
          selected={this.state.midDate}
          onChange={this.handle_midDate}

          showMonthDropdown
          showYearDropdown
          filterDate={this.isWeekday}
        /> */}
        <br />
{this.renderPickerEndDate()}
<br/>
<label>End Date</label>
<input type="date" value={this.state.endDate} onChange={this.handleChange_endDate} />
        {/* <DatePicker
          selected={this.state.endDate}
          onChange={this.handleChange_endDate}

          showMonthDropdown
          showYearDropdown
          filterDate={this.isWeekday}
        /> */}
        <br/>
        <button onClick={this.diffTest}>Save</button>
      </div>
    );
  }
}

export default DatePickerInput;
