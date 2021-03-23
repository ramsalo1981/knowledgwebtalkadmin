import React, { Component } from 'react';
import EditedPopup from './Edited_popup';
import axios from 'axios';

class Edit extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      Categories: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    axios.get('/api/Categories')
        .then(res => this.setState({Categories: res.data}))
        .catch(function (error) {
          // handle error
          console.log(error);
        });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const renderProducts = 
            <div className="edited">
                {this.state.Categories.map(category => 
                    {
                      return <EditedPopup category={category} key={category.categoryId}/>  
                    }
                )
                }
            </div>


    return (
      <div className="parentEdited layout-size1of1">
        {renderProducts}
      </div>
    );
  }
}

export default Edit;