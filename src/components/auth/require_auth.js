//This is a CLASS BASED component (SMART component) AND a HOC.
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){
  class Authentication extends Component{
    //We need to specify exactly which component we are picking out from the
    //parent context.
    static contextTypes = {
      router: React.PropTypes.object
    }

    //Run right before the component is rendered.
    componentWillMount(){
      if(!this.props.authenticated){
        this.context.router.push('/');
      }
    }

    //Run when the component is about to updated with state change.
    componentWillUpdate(nextProps){
      if(!nextProps.authenticated){
        this.context.router.push('/');
      }
    }

    render(){
      return <ComposedComponent {...this.props} />
    }
  }

  //Expose the state.authenticated variable to this component.
  function mapStateToProps(state){
    return { authenticated: state.auth.authenticated };
  }
  return connect(mapStateToProps)(Authentication);
}
