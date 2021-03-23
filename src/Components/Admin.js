import React, { Component } from 'react';
import NavbarAdmin from './Navbar_admin';
import Footer from './Footer';

class Admin extends Component {

  render() {
    return (
      <div>
        <div className="App">
          <NavbarAdmin />
        </div>
        < Footer />
      </div>
    );
  }
}

export default Admin;