import React from "react";
import PropTypes from 'prop-types';
import URLSearchParams from 'url-search-params';
import { withRouter,Route } from 'react-router-dom';
import IssueAdd from './IssueAdd.js';
import IssueTable from './IssueTable.js';
import IssueFilter from './IssueFilter.js';





class IssueList extends React.Component{
       constructor(props){
         super(props);
         this.state={issues:[]};
         /*Binding is neccessary to pass IssueList as an event otherwise the function will take lexical scope*/
         this.createIssue=this.createIssue.bind(this);
       }

       componentDidUpdate(prevProps) {
         const { location: { search: prevSearch } } = prevProps;
         const { location: { search } } = this.props;
              if (prevSearch !== search) {
                this.loadData();
            }
        }
 /*This method will be loaded after the initial render */
         componentDidMount(){
              // console.log('Inside Mount');
           this.loadData();
         }

       loadData() {
        // console.log("Props of loadData"+this.props.location);
         /*to get the query strings we need to use the location.query property{see react components in Developer tools}*/
         const search=this.props.location.search;
         const params = new URLSearchParams(search);
          var filter={};
          if(params.get('status'))
           filter.status=params.get('status');
         $.ajax({
                 type: 'GET',
                 url: '/',
                 data: filter,
                 success: function(data){
                     console.log(data);
                     this.setState({
                         issues: data
                     })
                 }.bind(this)
             })

           }
 /*The create Issue method is defined here because the children component(IssueTable and IssueAdd)
 can communicate only through common parent(IssueList)
 Dont directly manipute this.state.issues.Hence the reason for creating a newIssueList*/
     createIssue(newIssue) {
         console.log("Adding issue:", newIssue);
          $.ajax({
            type: 'POST',
            url: '/',
            contentType: 'application/json',
            data: JSON.stringify(newIssue),
            success: function(data) {
              console.log(data)
              var newIssue = data;
              // We're advised not to modify the state, it's immutable. So, make a copy.
              var updatedIssue = this.state.issues.concat(newIssue);
              this.setState({issues: updatedIssue});
            }.bind(this),
            error: function(xhr, status, err) {
              // ideally, show error to user.
              console.log("Error adding bug:", err);
            }
      });
     }
 render() {

     return(
       <React.Fragment>
       <h1>IssueTracker</h1>
       <IssueFilter />
       <hr />
       <IssueTable issues={this.state.issues}/>
       <hr />
       <IssueAdd createIssue={this.createIssue}/>
       <hr />

     </React.Fragment>
     );
   }
}

export default withRouter(IssueList);
