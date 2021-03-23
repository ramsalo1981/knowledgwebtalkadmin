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
        articleIngress: "",
        createdBy: "",
        sticky: false,
        categoryId: "",
        Categories: []
      }
      // Bindings
    this.handleTitle = this.handleTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIngress = this.handleIngress.bind(this);
    this.handleCreatedBy = this.handleCreatedBy.bind(this);
    this.handleSticky = this.handleSticky.bind(this);
    this.handleCtodId = this.handleCtodId.bind(this);
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
  handleIngress(e){
    this.setState({articleIngress: e.target.value});
  }
  handleCreatedBy(e){
    this.setState({createdBy: e.target.value});
  }

  handleSticky(e) {
    var val = e.target.value === false ? false : true;
    this.setState({sticky: val});
    
  }
  handleCtodId(e) {
    this.setState({categoryId: e.target.value});
    
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('ArticleTitle', this.state.title);
    formData.append('ArticlePublishDate',new Date().toLocaleString());
    formData.append('ArticleImageName', this.state.imageName);
    formData.append('ArticleImageFile', this.state.imageFile);
    formData.append('ArticleIngress', this.state.articleIngress);
    formData.append('CreatedBy', this.state.createdBy);
    formData.append('StickyArticle', this.state.sticky);
    formData.append('CategoryId', Number(this.state.categoryId));
    axios.post('/api/Articles', formData) 
    .then(res => {
      alert("Article added!");
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
                <span htmlFor="categoryId">Category Id:</span>
              </div>
              <div className="col-75">
                <select id="categoryId" name="categoryId" onChange={this.handleCtodId} value={this.state.categoryId} >
                <option>Select Category</option>
                {this.state.Categories.map(category => 
                  <option key={category.categoryId} value={category.categoryId}>{category.categoryTitle}</option>
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
                <span htmlFor="ingress">ArticleIngress:</span>
              </div>
              <div className="col-75">
                <input type="text" id="ingress" name="ingress" placeholder="Your articleIngress.." required autoComplete='false' value={this.state.articleIngress} onChange={this.handleIngress} />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <span htmlFor="created">Created by:</span>
              </div>
              <div className="col-75">
                <input type="text" id="created" name="created" placeholder="Created by.." required autoComplete='false' value={this.state.createdBy} onChange={this.handleCreatedBy} />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <span htmlFor="sticky">Sticky:</span>
              </div>
              <div className="col-75">
                <select id="sticky" name="sticky" onChange={this.handleSticky} value={this.state.sticky} >
                  <option key="false" value="false">false</option>
                  <option key="true" value="true">true</option>
                </select>
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