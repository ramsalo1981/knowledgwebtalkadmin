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
      }
      // Bindings
    this.handleTitle = this.handleTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
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

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('CategoryTitle', this.state.title);
    formData.append('CategoryPublishDate',new Date().toLocaleString());
    formData.append('CategoryImageName', this.state.imageName);
    formData.append('CategoryImageFile', this.state.imageFile);
    axios.post('/api/Categories', formData) 
    .then(res => {
      alert("category added!");
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
                <span htmlFor="title">Title:</span>
              </div>
              <div className="col-75">
                <input type="text" id="title" name="title" placeholder="Your title.." required autoComplete='false' value={this.state.title} onChange={this.handleTitle} />
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