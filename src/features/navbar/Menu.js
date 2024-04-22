import React from "react";
import { Navbar, Container, Nav}  from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

function Menu() {
    const navigate = useNavigate();

    const linkStyle = {
        color: "#fff",
        marginLeft: '5px',
        marginRight: '5px',
        textDecoration: 'none'
    }
    const handleLogout = () => {    
        localStorage.removeItem('authToken');
        navigate('/login')
    }
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">TODO</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/" style={linkStyle}>Home</Link>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/signup" style={linkStyle}>Signup</Link>
                        {localStorage.getItem('authToken') && <button onClick={handleLogout}>logout</button>}
                        
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}


export default Menu;