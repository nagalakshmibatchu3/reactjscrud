import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeEvent = this.onChangeEvent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);

    this.state = {
        empId: '',
        empName: '',
        empAddress:'',
        empContact:'',
        companyId:''
      }
  }

  componentDidMount() {
      axios.get('http://localhost:2019/emp/getEmpById?id='+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                empName: response.data.empName, 
                empAddress: response.data.empAddress,
                empContact: response.data.empContact,
                companyId: response.data.companyId });
          })
          .catch(function (error) {
              console.log(error);
          })
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
        empId: this.props.match.params.id,
        empName: this.state.empName,
        empAddress: this.state.empAddress,
        empContact: this.state.empContact,
        companyId: this.state.companyId
      };
    axios.put('http://localhost:2019/emp/update', obj)
        .then(function(response){
            console.log(response.data);
        });
    this.props.history.push('/index');
  }

  goBack(e) {
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Employee</h3>
            <button onClick={this.goBack}>Go Back</button>
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
                    <label>Employee address: </label>
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
                    <label>Company Id: </label>
                    <input type="text" id="companyId" name="companyId"
                      className="form-control"
                      value={this.state.companyId}
                      onChange={this.onChangeEvent}
                      />
                </div>
                <div className="form-group">                    
                    <input type="submit" 
                      value="Update Employee" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}