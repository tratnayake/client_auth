import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signin extends Component {
  handleFormValues = values => {
    const email = values.email;
    const password = values.password;
    //do something with values here
    this.props.signinUser({ email,password })
  }
  renderInput(field){
    const { meta: {touched, error} } = field;
    return (
      <fieldset className="form-group">
        <label>
          {field.label}
        </label>
        <input {...field.input} type={field.type} className="form-control"/>
      </fieldset>
    );
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render(){
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleFormValues)}>
        <Field name="email" type="input" component={this.renderInput} label="Email"></Field>
        <Field name="password" type="password" component={this.renderInput} label="Password"></Field>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'Signin'
})(connect(mapStateToProps,actions)(Signin));
