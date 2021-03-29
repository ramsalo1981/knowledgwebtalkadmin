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
            imageFile: null,
            articleIngress: "",
            createdBy: "",
            sticky: false,
            categoryId: ""
          }
          // Bindings
          this.handleTitle = this.handleTitle.bind(this);
          this.handleIngress = this.handleIngress.bind(this);
          this.handleCreatedBy = this.handleCreatedBy.bind(this);
          this.handleSticky = this.handleSticky.bind(this);
          this.handleCtodId = this.handleCtodId.bind(this);
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
    
      handleSubmit(articleId, articleName, old_title, categ_id, old_ingrss, old_created) {
        console.log(categ_id);
        const formData = new FormData();
        formData.append('ArticleId', this.state.Id);
        formData.append('ArticleTitle', this.state.title ? this.state.title: old_title);
        formData.append('ArticlePublishDate',new Date().toLocaleString());
        formData.append('ArticleImageName', articleName);
        formData.append('ArticleImageFile', this.state.imageFile);
        formData.append('ArticleIngress', this.state.articleIngress ? this.state.articleIngress : old_ingrss);
        formData.append('CreatedBy', this.state.createdBy ? this.state.createdBy : old_created);
        formData.append('StickyArticle', this.state.sticky);
        formData.append('CategoryId', Number(categ_id));
        formData.append('id', articleId);
        axios.put('/api/Articles/' + articleId + '/', formData)
        .then(res => {
          alert("Article edited!");          
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });     
      }

      handleDelete(articleId){
        axios.delete('/api/Articles/' + articleId + '/')
        .then(res => {
          alert("Article deleted!");
        })
        .catch(function (error) {
            // handle error
            alert("We can't delete the Article correctly! because it includes some article paragraphs! delete the paragraphs first!! ");
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

        var article = this.props.article;
        return (
          <div className="edited__row">
              <div className="edited__group">
                    <div className="edited__product" onClick={() => {this.customDialog.show(); this.setState({Id : article.articleId})}}>
                        <img src={article.articleImageSrc} alt="Product to show"/>
                        <span>{article.articleTitle}</span>
                    </div>
                    <div onClick={this.handleDelete.bind(this, article.articleId)} className="edited__icon"><i id="trash-icon" className="fa fa-trash-o fa-3x social"></i></div>
              </div>
            <SkyLight dialogStyles={myBigGreenDialog} 
              hideOnOverlayClicked ref={ref => this.customDialog = ref} transitionDuration={500}>
                 
                    <form className="editForm" onSubmit= { this.handleSubmit.bind(this, article.articleId, article.articleImageName, article.articleTitle, article.category.categoryId, article.articleIngress, article.createdBy) }>
                        <div className="row">
                          <div className="row__second">
                              <div className="row__title">
                                  <span htmlFor="title">Title:</span>
                              </div>
                              <div className="row__input">
                                  <input type="text" id="title" name="title" placeholder={article.articleTitle}  autoComplete='false' value={this.state.title} onChange={this.handleTitle} />
                              </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="row__second">
                              <div className="row__title">
                                  <span htmlFor="ingress">ArticleIngress:</span>
                              </div>
                              <div className="row__input">
                                  <input type="text" id="ingress" name="ingress" placeholder={article.articleIngress}  autoComplete='false' value={this.state.articleIngress} onChange={this.handleIngress} />
                              </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="row__second">
                              <div className="row__title">
                                  <span htmlFor="created">Created by:</span>
                              </div>
                              <div className="row__input">
                                  <input type="text" id="created" name="created" placeholder={article.createdBy}  autoComplete='false' value={this.state.createdBy} onChange={this.handleCreatedBy} />
                              </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="row__second">
                              <div className="row__title">
                                  <span htmlFor="sticky">Sticky:</span>
                              </div>
                              <div className="row__input">
                                <select id="sticky" name="sticky" onChange={this.handleSticky} value={this.state.sticky} >
                                  <option key="false" value="false">false</option>
                                  <option key="true" value="true">true</option>
                                </select>
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