import React, { Component } from 'react';
import EditedPopup from './Edited_popupArticle';
import axios from 'axios';

class Edit extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      Articles: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    axios.get('/api/Articles')
        .then(res => this.setState({Articles: res.data}))
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
                {this.state.Articles.map(article => 
                    {
                      return <EditedPopup article={article} key={article.articleId}/>  
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