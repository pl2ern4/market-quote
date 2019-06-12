import React,{Component} from 'react';
import * as jsonPhone from './mockPhoneCode.json';
import {Form,Button,Col,InputGroup,FormControl,Dropdown,DropdownButton } from 'react-bootstrap';

const regex = {
  email:/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  phone:/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
  firstName:/^[a-zA-Z]+$/,
  lastName:/^[a-zA-Z]+$/,
  amount:/^[-+]?\d+(\.\d\d?)?$/
}

export default class QuoteForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name:'',
      email:'',
      code:'+61',
      fromCurrency:'AUD',
      toCurrency:'USD',
      firstName:'',
      lastName:'',
      phone:'',
      amount:'',
      amountError:'',
      invalidPhone:'',
    }
  }

  handleChange = (name, errorField,isRequired) => e =>{
    let inValid=true;
    if(regex[name] && regex[name].test(e.target.value)){
      inValid=false;
    }
    if(isRequired === undefined && !e.target.value || !errorField){
      inValid=false;
    }
    this.setState({[name]:e.target.value,[errorField]:inValid,isSameCurrency:false})
  }

  onSubmit = event =>{
    
    event.preventDefault();

    if(this.state.fromCurrency===this.state.toCurrency)
    {
      this.setState({
        isSameCurrency:true
      })
      return;
    }
    const payload = {
      name:`${this.state.firstName} ${this.state.lastName}`,
      email:this.state.email,
      phone:`${this.state.code}${this.state.phone}`,
      fromCurrency:this.state.fromCurrency,
      toCurrency:this.state.toCurrency,
      amount:this.state.amount,
    }
    this.props.onSubmit(payload);
  }

  onSelectCode = event=>{
    this.setState({code:event.code})
  }

  render(){
    const {props:{
        currencies
      },
      onSubmit,onSelectCode } = this;

    return (
      <Form  onSubmit={onSubmit}>
        <div className="personal-div">
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name<span className="required">*</span></Form.Label>
              <Form.Control required type="text" value={this.state.firstName||''} autoComplete="off" placeholder="First Name" maxLength={10} isInvalid={this.state.firstNameError} onChange={this.handleChange('firstName','firstNameError','required')}/>
            </Form.Group>
        
            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name<span className="required">*</span></Form.Label>
              <Form.Control required type="text" value={this.state.lastName||''} autoComplete="off" placeholder="Last Name" maxLength={10} isInvalid={this.state.lastNameError}  onChange={this.handleChange('lastName','lastNameError','required')}/>
            </Form.Group>
          </Form.Row>
    
          <Form.Group controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" maxLength={50} autoComplete="off"  isInvalid={this.state.invalidEmail} value={this.state.email||''} onChange={this.handleChange('email','invalidEmail')}/>
          </Form.Group>
      
          <Form.Group controlId="formGridPhone">
          <Form.Label>Telephone / Mobile</Form.Label>
          <InputGroup className="mb-3">
            <DropdownButton
              as={InputGroup.Prepend}
              variant="outline-secondary"
              title={this.state.code}
              id="input-group-dropdown-1"
            >
              {jsonPhone.code.map(option => {
                return (
                  <Dropdown.Item key={option['code']} onClick={e=>onSelectCode({code:option['dial_code'],name:option['name']})}>{option['dial_code']}</Dropdown.Item>
                )
              })}
            </DropdownButton>
            <FormControl autoComplete="off" aria-describedby="basic-addon1" maxLength={10} onChange={this.handleChange('phone','invalidPhone')} value={this.state.value} isInvalid={this.state.invalidPhone}/>
          </InputGroup>
          </Form.Group>
        </div>
        <div className="grey-background quote-detail">
          <Form.Row>
                
            <Form.Group as={Col} controlId="fromCurrency" className="currency-input">
              <Form.Label>From Currency<span className="required">*</span></Form.Label>
              <Form.Control as="select" required isInvalid={this.state.invalidToCurrency} value={this.state.fromCurrency} onChange={this.handleChange('fromCurrency')}>
                {Object.entries(currencies).map(option => (
                  <option key={option['0']} value={option['0']}>{option['1']}</option>
                ))}
              </Form.Control>
            </Form.Group>
        
            <Form.Group as={Col} controlId="toCurrency">
              <Form.Label>To Currency<span className="required">*</span></Form.Label>
              <Form.Control as="select" required isInvalid={this.state.invalidToCurrency} autoComplete="off" value={this.state.toCurrency} onChange={this.handleChange('toCurrency')}>
                {Object.entries(currencies).map(option => (
                  <option key={option['0']} value={option['0']}>{option['1']}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAmount" className="amount-input">
              <Form.Label>Amount<span className="required">*</span></Form.Label>
              <Form.Control autoComplete="off" required type="text" placeholder="Amount" size={10} value={this.state.amount||''} onChange={this.handleChange('amount','amountError','required')} isInvalid={this.state.amountError}/>
          </Form.Group>
          {this.state.isSameCurrency && <p><span className="error">Conversion currency cannot be same.</span></p>}
          <Button variant="primary" type="submit">
            get quote
          </Button>
        </div>
    </Form>
    )
  }
}