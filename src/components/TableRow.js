import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.delete('http://localhost:2019/emp/deleteEmpById?id='+this.props.obj.empId)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.empId}
          </td>
          <td>
            {this.props.obj.empName}
          </td>
          <td>
            {this.props.obj.empAddress}
          </td>
          <td>
            {this.props.obj.empContact}
          </td>
          <td>
            {this.props.obj.companyId}
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj.empId} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;