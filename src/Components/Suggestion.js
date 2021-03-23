import React, { Component } from 'react';
import axios from 'axios';

class Suggestion extends Component {
  _isMounted = false;
    constructor() {
        super();
        this.state = {
            suggestions: []
          }
          // Bindings

      }

      componentDidMount() {
        this._isMounted = true;
        axios.get('/api/read')
            .then(res => this.setState({suggestions: res.data}))
            .catch(function (error) {
              // handle error
              console.log(error);
            });
      }
    
      componentWillUnmount() {
        this._isMounted = false;
      }
      
      render() {
        const renderSuggestions = 
            <div className="suggest">
                {this.state.suggestions.map(suggest => 
                    {
                      return <div key={suggest._id} className="suggest__product">
                      <span className="suggest__header">{suggest.email}</span>
                      <span className="suggest__subject">{suggest.subject}</span>
                    </div>
                           
                    }
                )
                }
            </div>

        return (
              <div className="layout-size1of1 container">
                {renderSuggestions}
              </div>
        );
      }
    }

export default Suggestion;