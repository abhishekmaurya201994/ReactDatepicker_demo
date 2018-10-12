import React, { Component } from 'react';
// import logo from './logo.svg';
import '../App.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class DatePickerInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: '',midDate:'',
      endDate: '',
      checkpoint: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange_endDate = this.handleChange_endDate.bind(this);
    this.handle_midDate=this.handle_midDate.bind(this);
    
    this.diffTest = this.diffTest.bind(this);
  
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

  handle_midDate(date){

    this.setState({
      midDate: date
    })
  }

  


  isWeekday = (date) => {
    const day = date.day()
    return day !== 0 && day !== 6
  }
  diffTest() {
    let checkpointInterval =3;
    let self = this;
    // let a=[];
    var a=[];
    if (this.state.startDate && this.state.midDate) {
       if(this.state.startDate<this.state.midDate){
      let date1 = new Date(this.state.startDate);
      let date2 = new Date(this.state.midDate);

      let timeDiff = Math.abs(date2.getTime() - date1.getTime());
      let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      let interval = Math.round(diffDays / checkpointInterval);

      var tomorrow = new Date();
    //   setTimeout(function(){
      for (let i = 1; i <= checkpointInterval; i++) {
        
            // setTimeout(function(){
         
          let checkpointIntData = interval * i;
          /*To do*/
          let checkpointInputDate = date1;
        
          console.log(checkpointInputDate);
        
          checkpointInputDate.setDate(new Date(this.state.startDate).getDate() + checkpointIntData);
         
               console.log(checkpointInputDate.getDay());
              
               checkpointInputDate=this.validateWeekendDate(checkpointInputDate)
                  // a.push(checkpointInputDate);
                  
                  a.push(new Date(checkpointInputDate).toLocaleDateString());
                  this.setState({checkpoint:a});
                  checkpointInputDate= new Date(this.state.startDate);
                 
               
              
        
       
      }

      
   
    }
    else{
      a=[];
      alert("Start date should be less than mid date");
      this.setState({checkpoint:a});
    }
    }
    else {
      alert("Please insert Start date and mid date");
    }
  }

  validateWeekendDate(checkpointInputDate) {
    checkpointInputDate=new Date(checkpointInputDate);
               if(checkpointInputDate.getDay()==6 )
               {

                
                checkpointInputDate.setDate(new Date(checkpointInputDate).getDate()-1);
               
               }
               if(checkpointInputDate.getDay()==0)
               {

                checkpointInputDate.setDate(new Date(checkpointInputDate).getDate()+1);
               
               }

    return checkpointInputDate;
  }

 
  render() {

  
    return (
      <div className="appcenter">
        <label>Start Date</label>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          filterDate={this.isWeekday}
        />
       


                <br/>

       <label>checkpoint1</label><br/>
        <input type="text"
          value={this.state.checkpoint[0]}
        />
        <br/>
         <label>checkpoint2</label><br/>
        <input type="text"
          value={this.state.checkpoint[1]}
        />
         <br/>
        <label>checkpoint3</label><br/>
        <input type="text"
          value={this.state.checkpoint[2]}
        />
         <br/>
         <label>Mid Date</label>
        <DatePicker
          selected={this.state.midDate}
          onChange={this.handle_midDate}
          filterDate={this.isWeekday}
        />
             <br/>
        <button onClick={this.diffTest}>Save</button>
      </div>
    );
  }
}

export default DatePickerInput;
