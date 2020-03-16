import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

class UserHeader extends React.Component {
  componentDidMount(){
    this.props.fetchUser(this.props.userId);
  }

  render() {
    const { user } = this.props;
    // console.log(this.props.userId);
    // if no user found return nothing
    if (!user){
      return null;
    }
    return <div className="header">{user.name}</div>
  }
};

// ownProps if from Redux Library
// it fetches this.props.fetchUser(this.props.userId)
const mapStateToProps = (state, ownProps) => {
  // .find is a built in method from javascript array
  return { user: state.users.find(user => user.id === ownProps.userId) };
};

export default connect(
  mapStateToProps, 
  {fetchUser}
)(UserHeader);