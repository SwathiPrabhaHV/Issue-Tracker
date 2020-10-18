import React from 'react';
import PropTypes from 'prop-types';
import {Link,withRouter} from 'react-router-dom';

 class IssueEdit extends React.Component {
constructor(props){
  super();
  this.state={
    issue:{
      _id:'',
      status: '',
      owner: '',
      created: '',
      Effort: '',
      dueDate:'',
      title:"",
      descrption:"",
    },
  }
  this.onChange=this.onChange.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
}

componentDidMount(){
  this.loadData();
}

componentDidUpdate(prevProps) {
   const { match: { params: { id: prevId } } } = prevProps;
   const { match: { params: { id } } } = this.props;
   if (id !== prevId) {
     this.loadData();
   }
 }
loadData(){
    const id=this.props.match.params.id;
    console.log("Id"+id);
  $.ajax({
          type: 'GET',
          url: '/issue/'+ id,
          // data: filter,
          success: function(data,err){
            if(err)
            console.log(err);
            if(data){
              const issues=data;
              //console.log("Data inside  is"+data.issue._id +" " +data.issue.owner);
              console.log("Data inside IssueEdit is "+issues[0].owner);
              issues[0].created=issues[0].created!=null?issues[0].created:"";
              issues[0].effort=issues[0].effort!=null?issues[0].effort:"";
              issues[0].due=issues[0].due!=null? issues[0].due:"";
              // issue.description = issue.description != null ? issue.description : "";


              this.setState({
                  issue:issues[0],
              })
            }
            else{
              this.setState({issue:{} });
            }

          }.bind(this)
      })
    }
    onChange(event){
      let name=event.target.name;
      let value=event.target.value;
      this.setState(
          prevState => ({
        issue: { ...prevState.issue, [name]: value },
      })
    );
    }

    handleSubmit(e){
      e.preventDefault();
      var issue={};
        issue=this.state.issue;

        $.ajax({
            url: '/issue/' + this.props.match.params.id,
            type: 'PUT',
            contentType:'application/json',
            data: JSON.stringify(issue),
            dataType: 'json',
            success: function(issue) {
              alert("Successfully updated");
            },
        });
    alert('Done');
        this.props.history.push('/issue');

    }

render() {
    const issue = this.state.issue;
    return (
      <div>
      /*Since in the put method I want to access the req body, we need to bind it to this event */
        <form onSubmit={this.handleSubmit}>
          ID: {issue._id}
          <br />
          Created: {issue.created}
          <br />
          Status: <select name="status" value={this.state.issue.status} onChange={this.onChange} >
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="Closed">Closed</option>
          </select>
          <br />
          Owner: <input name="owner" value={this.state.issue.owner} onChange={this.onChange}/>
          <br />
          Effort: <input size={5} name="effort" value={this.state.issue.effort} onChange={this.onChange} />
          <br />

          <br />
          Title: <input name="title" size={50} value={this.state.issue.title} onChange={this.onChange} />
          <br />
          <button type="submit">Submit</button>
          <Link to="/issues">Back to issue list</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(IssueEdit);
