import React, { Component } from 'react';
import EditedPopup from './Edited_popupParagraph';

class Edit extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      Paragraphes: [],
      Articles: [],
      Categories: [],
      categoryId: "",
      articleId: ""
    };
    this.handleCatogId = this.handleCatogId.bind(this);
    this.handleCtodId = this.handleCtodId.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    fetch('/api/Categories')
      .then(res => res.json())
      .then(Categories => this.setState({Categories}));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCatogId(e) {
    this.setState({categoryId: e.target.value});
    this.setState({Articles: this.state.Categories[e.target.value - 1].articles});
  }

  handleCtodId(e) {
    console.log(e.target.value);
    this.setState({articleId: e.target.value});
    this.setState({Paragraphes: this.state.Articles[e.target.value].articleParagraphs});

  }

  render() {
    var i = 0;
    const renderProducts = 
            <div className="edited">
              <div className="row">
                <div className="col-25">
                  <span htmlFor="CategoryId">Category Id:</span>
                </div>
                <div className="col-75">
                  <select id="CategoryId" name="CategoryId" onChange={this.handleCatogId} value={this.state.categoryId} >
                  <option value="0">Select Category</option>
                  {this.state.Categories.map(category => 
                    <option key={category.categoryId} value={category.categoryId}>{category.categoryTitle}</option>
                  )}
                  </select>                
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <span htmlFor="articleId">Article Id:</span>
                </div>
                <div className="col-75">
                  <select id="articleId" name="articleId" onChange={this.handleCtodId} value={this.state.articleId} >
                    <option value="-1">Select Article</option>
                  {this.state.Articles.map((article, i) => 
                    <option key={i} value={i}>{article.articleTitle}</option>
                  )}
                  </select>                
                </div>
              </div>
                {this.state.Paragraphes.map(paragraph => 
                    {
                      return <EditedPopup paragraph={paragraph} key={paragraph.articleParagraphId}/>  
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