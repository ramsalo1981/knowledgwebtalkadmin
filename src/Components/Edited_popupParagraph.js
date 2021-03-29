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
            content: "",
            categoryId: ""
          }
          // Bindings
          this.handleTitle = this.handleTitle.bind(this);
          this.handleContent = this.handleContent.bind(this);
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

      handleContent(e){
        this.setState({content: e.target.value});
      }
      
      handleCtodId(e) {
        this.setState({categoryId: e.target.value});
        
      }
    
      handleSubmit(articleParagraphId, articleParagraphName, old_title, article_id, old_content) {
        const formData = new FormData();
        formData.append('ArticleParagraphId', this.state.Id);
        formData.append('ArticleParagraphTitle', this.state.title ? this.state.title: old_title);
        formData.append('ArticleParagraphImageName', articleParagraphName);
        formData.append('ArticleParagraphImageFile', this.state.imageFile);
        formData.append('Content', this.state.content ? this.state.content : old_content);
        formData.append('ArticleId', Number(article_id));
        axios.put('/api/ArticleParagraphs/' + articleParagraphId + '/', formData)
        .then(res => {
          alert("Article edited!");          
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });     
      }

      handleDelete(articleParagraphId){
        axios.delete('/api/ArticleParagraphs/' + articleParagraphId + '/')
        .then(res => {
          alert("Article Paragraph deleted!");
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

        var paragraph = this.props.paragraph;
        return (
          <div className="edited__row">
              <div className="edited__group">
                    <div className="edited__product" onClick={() => {this.customDialog.show(); this.setState({Id : paragraph.articleParagraphId})}}>
                        <img src={paragraph.articleParagraphImageSrc} alt="Product to show"/>
                        <span>{paragraph.articleParagraphTitle}</span>
                    </div>
                    <div onClick={this.handleDelete.bind(this, paragraph.articleParagraphId)} className="edited__icon"><i id="trash-icon" className="fa fa-trash-o fa-3x social"></i></div>
              </div>
            <SkyLight dialogStyles={myBigGreenDialog} 
              hideOnOverlayClicked ref={ref => this.customDialog = ref} transitionDuration={500}>
                 
                    <form className="editForm" onSubmit= { this.handleSubmit.bind(this, paragraph.articleParagraphId, paragraph.articleParagraphImageName, paragraph.articleParagraphTitle, paragraph.article.articleId, paragraph.content) }>
                        <div className="row">
                          <div className="row__second">
                              <div className="row__title">
                                  <span htmlFor="title">Title:</span>
                              </div>
                              <div className="row__input">
                                  <input type="text" id="title" name="title" placeholder={paragraph.articleParagraphTitle}  autoComplete='false' value={this.state.title} onChange={this.handleTitle} />
                              </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="row__second">
                              <div className="row__title">
                                  <span htmlFor="content">Content:</span>
                              </div>
                              <div className="row__input">
                                <textarea type="text" id="content" name="content" placeholder={paragraph.content} autoComplete='false' value={this.state.content} onChange={this.handleContent} />
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