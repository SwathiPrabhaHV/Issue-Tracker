import React from "react";
import PropTypes from 'prop-types';

export  default class  IssueAdd extends React.Component{
  constructor(props) {
  super(props);
  this.handleSubmit = this.handleSubmit.bind(this);
  }
  /*Since handleSubmit will be called from an event,
  the context, or this will be set to the object generating the event,
  which is typically the window object.Hence use bind to bind to this event*/
  handleSubmit(e){
    /*The page is refreshed as if a new request to / has been made.
    In the URL bar, you can see URL query parameters for owner and title like ?owner=&title=.
    In order to avoid this. Use preventDefault  */
    e.preventDefault();
    const form=document.forms.issueAdd;
    const issue={
      owner:form.owner.value,
      title:form.title.value,
      status:'New'
      // date:new Date()
    }
    this.props.createIssue(issue);
     form.owner.value="";
     form.title.value="";
     form.effort.value="";
     form.dueDate.value="";
  }

  render(){
      return(
        <form name="issueAdd" onSubmit={this.handleSubmit}>
      <input type="text" name="owner" placeholder="Owner" required />
      <input type="text" name="title" placeholder="Title" required />
      <input type="text" name="effort" placeholder="Effort" />
      <input type="text" name="dueDate" placeholder="Due Date" />
      <button type="submit"> Add </button>
    </form>
    );
  }
}
