import React, { Component } from 'react';
import {add_reminder , remove_reminder , clear_reminder} from './actions/index.js';
import {connect} from 'react-redux';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from './reminder.png'
import './index.css';
class App extends Component {
  state = { 
    text:'',
    date: new Date()
   }
  render_Reminder = () =>{
    const {reminders}=this.props;
    return(
      <ul className="list-group">
       {
         reminders.map(reminder =>{
          return(
            <li key={reminder.id} className="list-group-item">
              <div>{reminder.text}</div>
              <div>{moment(new Date(reminder.date)).fromNow()}</div> 
              <div className="closeIcon btn btn-danger" onClick={() =>this.props.remove_reminder(reminder.id)}>X</div>
            </li>
          )
        })
       }
      </ul>
    )
    
  }


  render() { 
    console.log(this.props)
    return ( 
      <div className="App">
        <img src={logo} />
        <div className="reminder-title">
          <h2>What Should U Do ?</h2>
        </div>
        <input className="form-control" type="text" placeholder="Enter What U Think...?" 
        value={this.state.text}
         onChange={(e)=> this.setState({text:e.target.value})}
        />
        <br/>
         <DatePicker
            className="form-control"
            value={this.state.date}
            selected={this.state.date}
            onSelect={this.handleSelect} //when day is clicked
            onChange={(date) => {this.setState({date:date})}} //only when value has changed
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="Time"
        />
        <br/>
        <br/>
        {this.render_Reminder()}
        <br/>
        <button onClick={() =>{
          this.props.add_reminder(this.state.text , this.state.date)
          this.setState({text:'' , date:''})
          }} className="btn btn-primary btn-block">Add Reminder</button>
        <button 
         onClick={() => this.props.clear_reminder()}
        className="btn btn-danger btn-block">Clear Reminder</button>
      </div>
     );
  }
}

//function mapDispatchToProps(dispatch) {
  //return {
    //add_reminder : () =>dispatch(add_reminder())
  //}
//} toute cette fonction , on a deplacé par {add_reminder} dans export connect 
 
//function mapStateToProps (state){
  //return{
   // reminders : state
  //}
//}   sera deplacer par state dans export connect
 
export default connect(state =>{
  return{
    reminders : state
  }
} , {
  add_reminder,
  remove_reminder,
  clear_reminder
}) (App);
