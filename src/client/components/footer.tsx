import { Link } from 'react-router-dom';
import * as React from 'react'
import * as s from 'react-bootstrap';
import { tokenCheck } from '../../server/middleware/auth.mw'
const Footer = () => {
    
    
    return (
        
        <s.Navbar collapseOnSelect expand="lg" style={{
            backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            borderColor: 'black',
            height: '100px'
        }}>
          
  <s.Navbar.Brand href="home"><h3>Journal for growth</h3></s.Navbar.Brand>
  
  <s.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <s.Navbar.Collapse id="responsive-navbar-nav">
    <s.Nav className="mr-auto">
     
    </s.Nav>
    <s.Nav>
      <s.Nav.Link href="contact">Talk to the developer: coltercrockett+log@gmail.com</s.Nav.Link>
    </s.Nav>
  </s.Navbar.Collapse>
</s.Navbar>
    )
}
 export default Footer;