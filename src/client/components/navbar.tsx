import { Link } from 'react-router-dom';
import * as React from 'react'
import * as s from 'react-bootstrap';
import { tokenCheck } from '../../server/middleware/auth.mw'
const Navbar = () => {
    
    
    return (
        
        <s.Navbar collapseOnSelect expand="lg"   style={{
          backgroundImage: "url(" + "https://www.myfreetextures.com/wp-content/uploads/2011/06/an-old-and-worn-parchment-paper-900x1093.jpg" + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderColor: 'black'
      }}>
  <s.Navbar.Brand href="home"><h4>Captain's Log</h4></s.Navbar.Brand>
  <s.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <s.Navbar.Collapse id="responsive-navbar-nav">
    <s.Nav className="mr-auto">
      <s.Nav.Link href="why">Why Captain's Log?</s.Nav.Link>
      <s.Nav.Link href="input">Inputs</s.Nav.Link>
      <s.NavDropdown title="History" id="collasible-nav-dropdown">
        <s.NavDropdown.Item href="healthhistory">Health</s.NavDropdown.Item>
        <s.NavDropdown.Item href="notehistory">Notes</s.NavDropdown.Item>
        <s.NavDropdown.Item href="journalhistory">Journal</s.NavDropdown.Item>
        <s.NavDropdown.Divider />
        <s.NavDropdown.Item href="foodimagehistory">Food Images</s.NavDropdown.Item>
      </s.NavDropdown>
    </s.Nav>
    <s.Nav>
      <s.Nav.Link href="entries"><h5>Entries</h5></s.Nav.Link>
      {/* <s.Nav.Link href="settings">Settings</s.Nav.Link> */}
    </s.Nav>
  </s.Navbar.Collapse>
</s.Navbar>
        // <div className='row'>
        //     <div className='col-12 bg-dark w-100'>
        //         <Link to={'/input'} className='btn btn-outline-primary m-2'>Input</Link>
        //         <Link to={'/profile'} className='btn btn-outline-primary m-2'>Profile</Link>
        //         <Link to={'/journal'} className='btn btn-outline-primary m-2'>Journal</Link>
        //         <Link to={'/history'} className='btn btn-outline-primary m-2'>History</Link>
        //         <Link to={'/contact'} className='btn btn-outline-primary m-2'>Contact Us</Link>
        //         <div className='justify-content-end'>
        //             <Link to={'/login'} className='btn btn-outline-primary m-2 justify-content-right'>Login</Link>
        //         </div>
        //     </div>
        // </div>
        
    )
}

export default Navbar;