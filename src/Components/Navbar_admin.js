import React from 'react';
import Add from './Add';
import AddArticle from './AddArticle';
import AddParagraph from './AddArticleParagraph';
import Edit from './Edit';
import EditParagraph from './EditParagraph';
import EditArticle from './EditArticle';
import HomeAdmin from './HomeAdmin';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import whiteIcon from '../Assets/images/Menu_white.png';


class Navbar_admin extends React.Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: false,
      style: {
        paddingTop: "0px"
      },
      profile: whiteIcon
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.showWhiteIcon = this.showWhiteIcon.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true, style: {paddingTop: "335px"} }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
        
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false, style: {paddingTop: "0px"} }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  showWhiteIcon(event) {
    event.preventDefault();
    
    this.setState({ profile: whiteIcon });
  }

    render() {
        return(
          <Router className="App-header">
            <nav className="nav layout-size1of1">
            <div className="layout-size1of4">
                <div className="layout-size1of2" style={{paddingLeft:"20px", paddingTop:"30px"}}>
                <Link style={{color: "#fff", textDecoration:"none"}} to="/">Admin sidan</Link>  
                </div>
            </div>
            <div className="nav__up layout-size2of4">
                <ul className="nav__buttons rubrik1">
                  <NavLink to="/admin/add" activeClassName="nav__active"><li>Add Category</li></NavLink>
                  <NavLink to="/admin/addArticle" activeClassName="nav__active"><li>Add Article</li></NavLink>
                  <NavLink to="/admin/deleteCategory" activeClassName="nav__active"><li>Edit / Delete Category</li></NavLink>
                  <NavLink to="/admin/deleteArticle" activeClassName="nav__active"><li>Edit / Delete Article</li></NavLink>
                  <NavLink to="/admin/addParagraph" activeClassName="nav__active"><li>Add Paragraph</li></NavLink>
                  <NavLink to="/admin/deleteParagraph" activeClassName="nav__active"><li>Edit / Delete Paragraph</li></NavLink>
                </ul>
            </div>
        </nav>
        <div style={this.state.style}>
                    <div className="hamburger" ></div>
                    <img className="hamburger__img" src={this.state.profile} alt="hamburger icon" onClick={this.showMenu} onMouseEnter={this.showWhiteIcon} />
                    {
                        this.state.showMenu
                            ? (
                                <div className="hamburger__menu" ref={(element) => { this.dropdownMenu = element; }}>
                                    <NavLink to="/admin/add" activeClassName="hamburger__menu__active"><div>Add Category</div></NavLink>
                                    <NavLink to="/admin/addArticle" activeClassName="hamburger__menu__active"><div>Add Article</div></NavLink>
                                    <NavLink to="/admin/deleteCategory" activeClassName="hamburger__menu__active"><div>Edit / Delete Category</div></NavLink>
                                    <NavLink to="/admin/deleteArticle" activeClassName="hamburger__menu__active"><div>Edit / Delete Article</div></NavLink>
                                    <NavLink to="/admin/addParagraph" activeClassName="hamburger__menu__active"><div>Add Paragraph</div></NavLink>
                                    <NavLink to="/admin/deleteParagraph" activeClassName="hamburger__menu__active"><div>Edit / Delete Paragraph</div></NavLink>
                                </div>
                                )
                                : (
                                null
                                )
                            }
            </div>
            <div className="App__admin">
              <Route exact path="/" component={HomeAdmin} />
              <Route path="/admin/add" component={Add} />
              <Route path="/admin/addArticle" component={AddArticle} />
              <Route path="/admin/deleteCategory" component={Edit} />
              <Route path="/admin/deleteArticle" component={EditArticle} />
              <Route path="/admin/addParagraph" component={AddParagraph} />
              <Route path="/admin/deleteParagraph" component={EditParagraph} />
            </div>
          </Router>
        );
    }
    
}
export default Navbar_admin;