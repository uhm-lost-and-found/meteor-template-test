import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar } from 'react-bootstrap';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar expand="lg">
      <Container className="">
        <Navbar.Brand as={NavLink} to="/" className="mx-auto">
          <h4>LOST AND FOUND</h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <div className="flex-grow-1 pe-3">
            <Nav className="mx-auto justify-content-center">
              <Nav.Link className="mx-lg-2" id="your-item-id" as={NavLink} to="/" key="home">
                HOME
              </Nav.Link>
              <Nav.Link className="mx-lg-2" id="list-stuff-nav" as={NavLink} to="/list" key="list">
                LOST ITEMS
              </Nav.Link>
              {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                [
                  <Nav.Link className="mx-lg-2" id="add-stuff-nav" as={NavLink} to="/add" key="add">ADD ITEM</Nav.Link>,
                  <Nav.Link className="mx-lg-2" id="list-stuff-admin-nav" as={NavLink} to="/admin" key="admin">INBOX</Nav.Link>,
                ]
              ) : ''}
            </Nav>
          </div>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <a href="/signin" className="action-btn">SIGN IN</a>
            ) : (
              <a href="/signout" className="action-btn">SIGN OUT</a>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
