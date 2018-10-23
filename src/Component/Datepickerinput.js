import React, { Component } from 'react';
import '../App.css';
class DatePickerInput extends Component {

  constructor(props) {
    super(props);
    this.chkpoint_start = [];
    this.chkpoint_end = [];
    this.state = {
      startDate: '',
      midDate: '',
      endDate: '',
      checkpoint: [], checkpointend: []
    };
    this.handleChange_startDate = this.handleChange_startDate.bind(this);
    this.handleChange_endDate = this.handleChange_endDate.bind(this);
    this.handle_midDate = this.handle_midDate.bind(this);

    this.getchkpointvalue = this.getchkpointvalue.bind(this);

    this.chkselecteddate = this.chkselecteddate.bind(this);
    this.getinterval = this.getinterval.bind(this);

  }

  handleChange_startDate(e) {
    var validated_date = this.chkselecteddate(e.target.value);

    if (validated_date) {
      this.setState({
        startDate: e.target.value
      });
    }
    else {
      this.setState({
        startDate: ''
      });
    }
  }

  handleChange_endDate(e) {
    let validated_date = this.chkselecteddate(e.target.value);
    if (validated_date) {
      this.setState({
        endDate: e.target.value
      })
    }
    else {
      this.setState({
        endDate: ''
      })
    }
  }

  handle_midDate(e) {
    let validated_date = this.chkselecteddate(e.target.value);
    if (validated_date) {
      this.setState({
        midDate: e.target.value
      })
    }
    else {
      this.setState({
        midDate: ''
      })
    }
  }

  chkselecteddate(d) {
    let chk_day = new Date(d);
    if (chk_day.getDay() == 0 || chk_day.getDay() == 6) {
      alert("Day should not be sat and sun");
      return false;
    }
    else {
      return true;
    }
  }


  componentWillMount() {


    for (let i = 0; i < this.props.checkpointInterval[0].interval; i++) {
      this.chkpoint_start.push(i);
    }
    for (let i = 0; i < this.props.checkpointInterval[1].interval; i++) {
      this.chkpoint_end.push(i);
    }
  }
  
  getchkpointvalue() {
    let self = this;
    var checkpoint_str_mid; var checkpoint_mid_end;
    if (this.state.startDate && this.state.midDate) {
      if (this.state.startDate < this.state.midDate) {
        let checkpointInterval = this.props.checkpointInterval[0].interval;
        checkpoint_str_mid = this.getinterval(this.state.startDate, this.state.midDate, checkpointInterval);

        this.setState({ checkpoint: checkpoint_str_mid });


      }
      else {

        alert("Start date should be less than mid date");

      }
    }
    else {
      alert("Please insert Start date and mid date");
    }
    if (this.state.midDate && this.state.endDate) {

      let checkpointInterval = this.props.checkpointInterval[1].interval;

      if (this.state.midDate < this.state.endDate) {
        checkpoint_mid_end = this.getinterval(this.state.midDate, this.state.endDate, checkpointInterval);
        this.setState({ checkpointend: checkpoint_mid_end });



      } else {
        alert("Mid Date Should be less than End Date");
      }
    }
    else {
      alert("Please insert Mid Date and End date");
    }
  }


  getinterval(chk1, chk2, interval_chk) {
    let checkpointInterval = interval_chk;
    let intervalpoints = [];
    let date1 = new Date(chk1);
    let date2 = new Date(chk2);

    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let interval = Math.round(diffDays / checkpointInterval);

    var tomorrow = new Date();
    for (let i = 1; i <= checkpointInterval; i++) {
      let checkpointIntData = interval * i;
      /*To do*/
      let checkpointInputDate = new Date(date1);

      checkpointInputDate.setDate(new Date(date1).getDate() + checkpointIntData);

      checkpointInputDate = this.validateWeekendDate(checkpointInputDate)
      intervalpoints.push(new Date(checkpointInputDate).toLocaleDateString());
    }
    return intervalpoints;
  }

  validateWeekendDate(checkpointInputDate) {
    checkpointInputDate = new Date(checkpointInputDate);
    if (checkpointInputDate.getDay() == 6) {//
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
        {this.chkpoint_start.map((item, index) => (
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

  renderPickerEndDate() {
    return (
      <div>
        {this.chkpoint_end.map((item, index) => (
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
        <br />
        <label>Start Date</label>&nbsp;

        <input type="date" value={this.state.startDate} onChange={this.handleChange_startDate} />
        {this.renderPickerDate()}
        <br />
        <label>Mid Date</label>&nbsp;
        <input type="date" value={this.state.midDate} onChange={this.handle_midDate} />
        <br />
        {this.renderPickerEndDate()}
        <br />
        <label>End Date</label>&nbsp;
        <input type="date" value={this.state.endDate} onChange={this.handleChange_endDate} />
        <br />
        <button onClick={this.getchkpointvalue}>Save</button>
      </div>
    );
  }
}

export default DatePickerInput;
