import React, { Component } from 'react';
import axios from 'axios';



class Add extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
        title: "",
        imageName: "",
        imageSrc: "/img/default.jpg",
        imageFile: null,
        content: "",
        articleId: "",
        categoryId: "",
        Articles: [],
        Categories: []
      }
      // Bindings
    this.handleTitle = this.handleTitle.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCtodId = this.handleCtodId.bind(this);
    this.handleCatogId = this.handleCatogId.bind(this);
  }

  componentDidMount() {
    fetch('/api/Categories')
      .then(res => res.json())
      .then(Categories => this.setState({Categories}));
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  fileChangedHandler = e => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = x => {
          this.setState({
              imageFile,
              imageSrc: x.target.result
          })
      }
      reader.readAsDataURL(imageFile)
    }
    else{
      this.setState({
            imageFile: null,
            imageSrc: "/img/default.jpg"
        })
    }
  }

  handleTitle(e) {
    this.setState({title: e.target.value});
    
  }

  handleContent(e) {
    this.setState({content: e.target.value});
    
  }

  handleCtodId(e) {
    this.setState({articleId: e.target.value});
    
  }

  handleCatogId(e) {
    this.setState({categoryId: e.target.value});
    this.setState({Articles: this.state.Categories[e.target.value - 1].articles});
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('ArticleParagraphTitle', this.state.title);
    formData.append('ArticleParagraphImageName', this.state.imageName);
    formData.append('ArticleParagraphImageFile', this.state.imageFile);
    formData.append('Content', this.state.content);
    formData.append('ArticleId', Number(this.state.articleId));
    axios.post('/api/ArticleParagraphs', formData) 
    .then(res => {
      alert("Paragraph added!");
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
                  <option value="0">Select Article</option>
                {this.state.Articles.map(article => 
                  <option key={article.articleId} value={article.articleId}>{article.articleTitle}</option>
                )}
                </select>                
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <span htmlFor="title">Title:</span>
              </div>
              <div className="col-75">
                <input type="text" id="title" name="title" placeholder="Your title.." required autoComplete='false' value={this.state.title} onChange={this.handleTitle} />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <span htmlFor="content">Content:</span>
              </div>
              <div className="col-75">
                <textarea type="text" id="content" name="content" placeholder="Content.." autoComplete='false' value={this.state.content} onChange={this.handleContent} />
              </div>
              
            </div>
            <div className="row">
              <div className="col-25">
                <span htmlFor="image">Upload image:</span>
              </div>
              <div className="col-75">
                <input id="image" type="file" onChange={this.fileChangedHandler} />
              </div>
            </div>
            <div className="row row__submit">
              <input type="submit" value="Submit" />
            </div>
          </form>
          </div>
    );
  }
}

export default Add;