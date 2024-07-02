import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import styles from '../App.module.css'
import navstyles from '../styles/NavBar.module.css'

function NavBar() {
    return (
        <Navbar className={navstyles.NavBar} fixed='top' bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home"><h1 className={styles.logo}>Today</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ml-auto'>
                        <Nav.Link><i class="fa-solid fa-house-chimney"></i>Home</Nav.Link>
                        <Nav.Link><i class="fa-solid fa-right-to-bracket"></i>Sign-In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar