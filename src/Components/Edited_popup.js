import React from 'react';
import SkyLight from 'react-skylight';
import axios from 'axios';


class Edited_popup extends React.Component {
  _isMounted = false;
    constructor() {
        super();
        this.state = {
            Id:"",
            title: "",
            imageName: "",
            imageSrc: "/img/default.jpg",
            imageFile: null
          }
          // Bindings
          this.handleTitle = this.handleTitle.bind(this);
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
    
      handleSubmit(categoryId, categoryName, old_title) {
        console.log(categoryName)
        const formData = new FormData();
        formData.append('CategoryId', this.state.Id);
        formData.append('CategoryTitle', this.state.title ? this.state.title: old_title);
        formData.append('CategoryPublishDate',new Date().toLocaleString());
        formData.append('CategoryImageName', categoryName);
        formData.append('CategoryImageFile', this.state.imageFile);
        formData.append('id', categoryId);
        axios.put('/api/Categories/' + categoryId + '/', formData)
        .then(res => {
          alert("Category edited!");          
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });     
      }

      handleDelete(categoryId){
        axios.delete('/api/Categories/' + categoryId + '/')
        .then(res => {
          alert("Category deleted!");
        })
        .catch(function (error) {
            // handle error
            alert("We can't delete the Category correctly! because it includes some articles! delete the articles before!! ");
            console.log(error);
        });
      }
    

      render() {
        var myBigGreenDialog = {
          backgroundColor: 'white',
          width: '90%',
          height: '300px',
          marginTop: '-265px',
          marginLeft: '-23%',
          top: '55%',
          left: '27%',
        };

        var category = this.props.category;
        return (
          <div className="edited__row">
              <div className="edited__group">
                    <div className="edited__product" onClick={() => {this.customDialog.show(); this.setState({Id : category.categoryId})}}>
                        <img src={category.categoryImageSrc} alt="Product to show"/>
                        <span>{category.categoryTitle}</span>
                    </div>
                    <div onClick={this.handleDelete.bind(this, category.categoryId)} className="edited__icon"><i id="trash-icon" className="fa fa-trash-o fa-3x social"></i></div>
              </div>
            <SkyLight dialogStyles={myBigGreenDialog} 
              hideOnOverlayClicked ref={ref => this.customDialog = ref} transitionDuration={500}>
                 
                    <form className="editForm" onSubmit= { this.handleSubmit.bind(this, category.categoryId, category.categoryImageName, category.categoryTitle) }>
                        <div className="row">
                          <div className="row__second">
                              <div className="row__title">
                                  <span htmlFor="title">Title:</span>
                              </div>
                              <div className="row__input">
                                  <input type="text" id="title" name="title" placeholder={category.categoryTitle}  autoComplete='false' value={this.state.title} onChange={this.handleTitle} />
                              </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="row__second">
                              <div className="row__title">
                                  <span htmlFor="image">Upload image:</span>
                              </div>
                              <div className="row__input">
                                  <input type="file" id="image" name="image" onChange={this.fileChangedHandler} />
                              </div>
                          </div>
                        </div>
                   
                        <div className="row">
                          <input className="submi" type="submit" value="Submit" />
                        </div>
                    </form>
                
            </SkyLight>
        </div>
        )
    }
}

export default Edited_popup;