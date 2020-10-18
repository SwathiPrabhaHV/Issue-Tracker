import React from "react";
import PropTypes from 'prop-types';

import IssueRow from './IssueRow.js';

/*Stateless Components*/
export default class IssueTable extends React.Component{
  /*Moving the below Method to IssueList so that the IssueTable and Issue Add can communicate*/
  // componentDidMount(){
  //   this.loadData();
  // }
  //
  // loadData(){
  //   setTimeout(()=>{
  //   this.setState({issues:initialIssues});
  //   },500);
  // }
  render(){
    console.log("Inside IssueTable");
    const issueRows=this.props.issues.map((issue)=>
    <IssueRow key={issue._id} issue={issue}/>
      );

      return(
          <table className="bordered-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Created</th>
                <th>Effort</th>
                <th>Due Date</th>
                <th>Title</th>
                
              </tr>
            </thead>
            <tbody>
              {issueRows}
            </tbody>
          </table>
    );
  }
}
