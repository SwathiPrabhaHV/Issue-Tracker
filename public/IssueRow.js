
import React from "react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
// import PropTypes from 'prop-types';

function IssueRow (props){

      const issue=props.issue;
      console.log("Inside Row");
    return(
      <tr>
        <td><Link to={`/edit/${issue._id}`}>Edit</Link></td>
        <td> {issue.status}</td>
        <td> {issue.owner}</td>
        <td> {issue.created}</td>
        <td> {issue.Effort}</td>
        <td> {issue.due? issue.due.toDateString:" "}</td>
        <td> {issue.title}</td>

      </tr>
    );
  }

export default withRouter(IssueRow);
