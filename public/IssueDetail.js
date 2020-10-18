import React from "react";
import mongoose from "mongoose";
import {withRouter} from "react-router-dom";
import Issue from '../scripts/Issue.js';

 class IssueDetail extends React.Component{
  constructor(){
    super();
    this.state={
      issue:{}
    };
  }

  componentDidMount(){
    this.loadData();

  }

  componentDidUpdate(){
    const prevId=prevProps.match.params.id;
    const id=this.props.match.params.id;
    if(prevId!=id)
      this.loadData();
  }

  loadData(){
    // Issue.findOne({id:id},function(err,data){
      if(data)
        this.setState=({issue:data.issue});
        else
          this.setState=({issue:{}});
    });
}

  render(){
    const description=this.state.issue.description;
    return(
    <div>
    <h3>Description</h3>
    <pre>{description}</pre>
    </div>
  );
  }
}

export default IssueDetail;
