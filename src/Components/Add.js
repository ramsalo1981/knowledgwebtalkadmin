import React, { Component } from "react";
import axios from "axios";

class Add extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      title: "",
      imageName: "",
      imageSrc: "/img/default.jpg",
      imageFile: null,
    };
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

  fileChangedHandler = (e) => {
    console.log(e.target.value);
    this.setState({ imageName: e.target.value });
  };

  handleTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("CategoryTitle", this.state.title);
    formData.append("CategoryPublishDate", new Date().toLocaleString());
    formData.append("CategoryImageName", this.state.imageName);
    formData.append("CategoryImageFile", this.state.imageFile);
    axios
      .post("/api/Categories", formData)
      .then((res) => {
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
        <form className="addForm" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-25">
              <span htmlFor="title">Title:</span>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Your title.."
                required
                autoComplete="false"
                value={this.state.title}
                onChange={this.handleTitle}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <span htmlFor="image">Image URL:</span>
            </div>
            <div className="col-75">
              <input
                id="image"
                type="text"
                placeholder="Your image url.."
                onChange={this.fileChangedHandler}
              />
            </div>
          </div>
          {this.state.imageName.length > 0 && (
            <div className="row">
              <img
                style={{ width: "250px", height: "250px" }}
                src={this.state.imageName}
                alt="image"
              />
            </div>
          )}

          <div className="row row__submit">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default Add;
