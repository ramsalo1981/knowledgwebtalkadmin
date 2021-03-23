import React, { Component } from 'react';
import axios from 'axios';
import history from './history';


class EditHome extends Component {
  _isMounted = false;
    constructor() {
        super();
        this.state = {
            body: "",
            body_english: ""
          }
          // Bindings
        this.handleHome = this.handleHome.bind(this);
        this.handleHomeEnglish = this.handleHomeEnglish.bind(this);
        this.toUpperCase = this.toUpperCase.bind(this);
        this.checkUpperCaseinState = this.checkUpperCaseinState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }

      componentDidMount() {
        this._isMounted = true;
      }

      componentWillUnmount() {
        this._isMounted = false;
      }
    
      handleHome(e) {
        this.setState({body: e.target.value});
        
      }

      handleHomeEnglish(e) {
        this.setState({body_english: e.target.value});
        
      }
    

      toUpperCase(value){
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
      checkUpperCaseinState(state){
        state.body = this.toUpperCase(state.body);
        state.body_english = this.toUpperCase(state.body_english);
        return state;
      }
      handleSubmit(e) {
        e.preventDefault();
        const checkState = this.checkUpperCaseinState(this.state);
        axios.post('api/home', {
          body : checkState.body,
          body_english : checkState.body_english
        })
        .then(res => {
          if(res.data.status === "Ok"){
            alert("item edited!");
            history.push("/");
          }else{
            alert("We can't add the peoduct!");
            history.push("/");
          }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
        
      }
    
      render() {
        
        return (
              <div className="layout-size1of1 container">
              <form className="addForm" onSubmit= { this.handleSubmit }>
                <div className="row">
                  <div className="col-25">
                    <span htmlFor="home">Home:</span>
                  </div>
                  <div className="col-75">
                    <textarea type="text" id="home" name="home" placeholder="Your home page text.." autoComplete='false' value={this.state.body} onChange={this.handleHome} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <span htmlFor="home_english">Home English:</span>
                  </div>
                  <div className="col-75">
                    <textarea type="text" id="home-english" name="home_english" placeholder="Your home page text.." autoComplete='false' value={this.state.body_english} onChange={this.handleHomeEnglish} />
                  </div>
                </div>
                <div className="row row__submit">
                  <input type="submit" value="Edit" />
                </div>
              </form>
              </div>
        );
      }
    }

export default EditHome;