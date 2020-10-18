import React from 'react';
import { withRouter } from 'react-router-dom';
import URLSearchParams from 'url-search-params';

class IssueFilter extends React.Component {
  constructor({location:{search }}) {
    super();
    const params= new URLSearchParams(search);
    this.state={
      status:params.get('status') || '',
      changed:false,
    }
    /*We need to bind onChangeStatus function as to access additional properties of Issue Filter like history,location etc*/
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.applyFilter=this.applyFilter.bind(this);
    this.updateState=this.updateState.bind(this);
  }

  componentDidUpdate(prevProps){
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if(prevSearch!==search)
      this.updateState();
  }

  updateState(){
    const search=this.props.location.search;
    const params= new URLSearchParams(search);
    this.setState({
      status:params.get('status') ||'',
      changed:false,
    });
  }
/*This method is called when the dropbox value changes. The changed valued can be accessed by e.target.value*/
  onChangeStatus(e) {
  this.setState({
    status: e.target.value,
    changed:true,
  });
}

applyFilter(){
  const {status }=this.state;
    const { history } = this.props;

    history.push({
      pathname: '/issue',
      search: status ? `?status=${status}` : '',
    });
  }

  render() {



    return (
      <div>
        Status:
        {' '}
        <select value={this.state.status} onChange={this.onChangeStatus}>
          <option value="">(All)</option>
          <option value="New">New</option>
          <option value="Assigned">Assigned</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
        {' '}
        <button type="button" onClick={this.applyFilter}>Apply</button>
        <button type="button" onClick={this.updateState} disabled={!this.state.changed}>Reset</button>
      </div>
    );
  }
}

/*Since Issue Filter is not part of any  React Routes(simply Routes) the history,location and match properties
cannot be used directly.We need to use a wrapper function withRouter for the Issue Filter.
his function takes in a component class as an argument and
returns a new component class that has history, location, and match available as part of props.*/
export default withRouter(IssueFilter);
