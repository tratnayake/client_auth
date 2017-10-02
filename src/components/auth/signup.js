import React, { Component } from 'react';
import { Field, reduxForm }  from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signup extends Component {

  handleFormValues = values => {
    const email = values.email;
    const password = values.password;
    //do something with values here
    this.props.signupUser({ email,password })
  }

  renderField(field){
    const { meta: {touched, error} } = field;
    return (
      <fieldset className="form-group">
        <label>
          {field.label}
        </label>
        <input {...field.input} type={field.type} className="form-control"/>
        {field.meta.touched && field.meta.error ? <div className="alert alert-danger">{field.meta.error}</div> : ''}
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
    return (
      <form onSubmit={handleSubmit(this.handleFormValues)}>
        <Field name="email" type="input" component={this.renderField} label="Email"></Field>
        <Field name="password" type="password" component={this.renderField} label="Password"></Field>
        <Field name="confirmPassword" type="password" component={this.renderField} label="Confirm Password"></Field>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function validate(formProps){

    const errors = {};

    if(!formProps.email){
      errors.email = 'Please enter an email'
    }

    if(!formProps.password){
      errors.password = 'Please enter a password'
    }

    if(!formProps.confirmPassword){
      errors.Password = 'Please enter a password confirmation'
    }

    if(formProps.password !== formProps.confirmPassword){
      errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error }
}

export default reduxForm({validate, form: 'Signup'})(connect(mapStateToProps, actions)(Signup));
