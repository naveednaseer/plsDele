import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'


const Header = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()


    const logoutHandler = () => {
        dispatch(logout())
    }


    return (
      <header>
        <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
          <Container>
          <link href='https://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' />
            <LinkContainer to='/'>
              <Navbar.Brand><div style={{fontFamily: 'Pacifico', fontSize: '25px'}}>Phroph</div></Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="ml-auto">
                  
                <LinkContainer to='/cart'>
                    <Nav.Link><i className="fas fa-shopping-cart mr-1"></i>CART</Nav.Link>
                </LinkContainer> 
                
                { userInfo ? (
                  <NavDropdown title={userInfo.name.toUpperCase()} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>PROFILE</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>LOGOUT</NavDropdown.Item>
                  </NavDropdown>
                ) : (

                  <LinkContainer to='/login'>
                    <Nav.Link><i className="fas fa-user mr-1"></i>LOGIN</Nav.Link>
                  </LinkContainer>)}


                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title={'Admin'} id='adminmenu'>
                    
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>USERS</NavDropdown.Item>
                      </LinkContainer>
                    
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>PRODUCTS</NavDropdown.Item>
                      </LinkContainer>
                    
                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item>ORDERS</NavDropdown.Item>
                      </LinkContainer>

                  </NavDropdown>
                  )}
              
                
                </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
}

export default Header
