import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
 constructor(props) {
    super(props);
    this.onChangeEvent = this.onChangeEvent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.companyListFun = this.companyListFun.bind(this);

    this.state = {
      empId: '',
      empName: '',
      empAddress:'',
      empContact:'',
      companyId:'',
      companyList:[]
    }
  }

  componentDidMount() {
    this.companyListFun(this);
  }

  companyListFun(ev) {
    axios.get('http://localhost:2019/company/list')
        .then(function(response){
          ev.setState({companyList:response.data});
    });
  }

  onChangeEvent(e) {
    if(e.target.name==="empName") {
      this.setState({
        empName: e.target.value
      }); 
    }
    if(e.target.name==="empAddress") {
      this.setState({
        empAddress: e.target.value
      }); 
    }
    if(e.target.name==="empContact") {
      this.setState({
        empContact: e.target.value
      }); 
    }
    if(e.target.name==="companyId") {
      this.setState({
        companyId: e.target.value
      }); 
    }
  }

  onSubmit(e) {
    e.preventDefault();
    var obj = {
      empId: '',
      empName: this.state.empName,
      empAddress: this.state.empAddress,
      empContact: this.state.empContact,
      companyId: this.state.companyId
    };
    axios.post('http://localhost:2019/emp/save', obj)
        .then(function(response){
          console.log(response);
        });
    
    this.setState({
      empId: '',
      empName: '',
      empAddress:'',
      empContact:'',
      companyId:''
    })
  }
  
  
  render() {
    var Data = this.state.companyList,
        MakeItem = function(x) {
            return <option value={x.companyId}>{x.companyName}</option>;
        };
    return (
        <div style={{ marginTop: 10 }}>
            <h3>Add New Employee</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Employee Name:  </label>
                    <input 
                      type="text" id="empName" name="empName"
                      className="form-control" 
                      value={this.state.empName}
                      onChange={this.onChangeEvent}
                      />
                </div>
                <div className="form-group">
                    <label>Employee Address: </label>
                    <input type="text" id="empAddress" name="empAddress"
                      className="form-control"
                      value={this.state.empAddress}
                      onChange={this.onChangeEvent}
                      />
                </div>
                <div className="form-group">
                    <label>Employee Contact: </label>
                    <input type="text" id="empContact" name="empContact"
                      className="form-control"
                      value={this.state.empContact}
                      onChange={this.onChangeEvent}
                      />
                </div>
                <div className="form-group">
                  <label>Company Name:</label>
                    <select id="companyId" name="companyId"
                      value={this.state.companyId} onChange={this.onChangeEvent} className="form-control">
                      <option value=''>select</option>
                      {Data.map(MakeItem)}
                      </select>
                </div>
                <div className="form-group">
                    <input type="submit" value="Register Employee" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}