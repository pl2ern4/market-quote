import React,{ Component } from 'react';
import QuoteForm from './quoteForm';
import ResultQuote from './ResultQuote';
import {submitQuote, getCurrencyCode} from './api';

const QUOTE='quote';
const RESULT = 'result';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currencies:[],
      ...this.resetState()
    }
  }

  resetState = params => {
    return {
      status:'quote',
      quoteDetail:'',
      quote:'',
      
    };
  }

  getNewQuote = () => {
    this.setState({
      ...this.resetState()
    })
  }

  componentDidMount(){
    getCurrencyCode().then(data=>{
      this.setState({
        currencies:data
      })
    })  
  }

  onSubmit=params=>{
    submitQuote(params).then(data=>{
      this.setState({
        status:RESULT,
        quote:data,
        ...params
      })
    });
  }

  render(){
    return (
      <div className="main-div">
        <span className="heading">Quick Quote</span>
        <hr/>
        {this.state.status===QUOTE && <QuoteForm 
          currencies={this.state.currencies} 
          phoneCode={this.state.phoneCode} 
          setSelectedCurrency={this.setSelectedCurrency}
          onSubmit={this.onSubmit}
          reset={this.state.toReset}/>}
        {this.state.status===RESULT && <ResultQuote getNewQuote={this.getNewQuote} quote={this.state.quote} fromCurrencyCode={this.state.fromCurrency} toCurrencyCode={this.state.toCurrency}/>}
      </div>
    );
  }

}

export default App;
