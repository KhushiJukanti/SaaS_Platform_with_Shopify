// ShopifyNavbar.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from './AuthContext';

const ShopifyNavbar = () => {
    const { isLoggedIn, checkLoginStatus } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        checkLoginStatus(); // Update the login status
        navigate('/');
    };

    return (
        <div className='container mt-3'>
            <Navbar expand="lg" style={{ backgroundColor: '#e3f2fd' }}>
                <Container>
                    <Navbar.Brand as={Link} to="#">
                        Shopify
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {isLoggedIn ? (
                                <>
                                    <Nav.Link as={Link} to="/dashboard" active={location.pathname === '/dashboard'}>
                                        Dashboard
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
                                        Login
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/register" active={location.pathname === '/register'}>
                                        Register
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                        {isLoggedIn && (
                            <Button variant="outline-danger" onClick={handleLogout} className="ml-auto">
                                Logout
                            </Button>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default ShopifyNavbar;
