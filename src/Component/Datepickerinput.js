import React, { Component } from 'react';
import '../App.css';


var chkpoint_start = [];var chkpoint_end=[];
class DatePickerInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startDate:'',
      midDate:'',
      endDate:'',
      checkpoint: [],checkpointend:[]
    };
    this.handleChange_startDate= this.handleChange_startDate.bind(this);
    this.handleChange_endDate = this.handleChange_endDate.bind(this);
    this.handle_midDate = this.handle_midDate.bind(this);

    this.getchkpointvalue = this.getchkpointvalue.bind(this);
    
    this.chkselecteddate=this.chkselecteddate.bind(this);

  }

  handleChange_startDate(e) {


var d2= this.chkselecteddate(e.target.value);

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


  componentWillMount() {

    for (let i = 0; i < this.props.checkpointInterval[0].interval; i++) {
      chkpoint_start.push(i);
    
    }
    for (let i = 0; i < this.props.checkpointInterval[1].interval; i++) {
      chkpoint_end.push(i);
    
    }

  }
  getchkpointvalue() {

    
    
    let self = this;
        var a = [];var b=[];
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
        
        
        checkpointInputDate.setDate(new Date(this.state.midDate).getDate() + checkpointIntData);
        
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

  

  renderPickerDate() {



    return (
      <div>


        {chkpoint_start.map((item, index) => (
          <li key={index} >
            <div>
            </div>
            <br />

            <label>checkpoint {index + 1}</label><br />
            <input type="text" value={this.state.checkpoint[index] ? this.state.checkpoint[index] : ''} readOnly />           
          </li>
        ))}
       
      </div>

    )
  }

  renderPickerEndDate(){
    return(
<div>
{chkpoint_end.map((item, index) => (
  <li key={index} >
        <div>
    </div>
    <br />

    <label>checkpoint {index + 1}</label><br />
    <input type="text" value={this.state.checkpointend[index] ? this.state.checkpointend[index] : ''} readOnly />
   
  </li>
))}
  </div>
    )
  }


  render() {


    return (
      <div className="appcenter">
      <br/>
        <label>Start Date</label>
       
           <input type="date" value={this.state.startDate} onChange={this.handleChange_startDate}  />
        {this.renderPickerDate()}


        <br />
        <label>Mid Date</label>
        <input type="date" value={this.state.midDate} onChange={this.handle_midDate} />
        <br />
          {this.renderPickerEndDate()}
<br/>
<label>End Date</label>
<input type="date" value={this.state.endDate} onChange={this.handleChange_endDate} />
        <br/>
        <button onClick={this.getchkpointvalue}>Save</button>
      </div>
    );
  }
}

export default DatePickerInput;
