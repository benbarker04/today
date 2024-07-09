import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import styles from '../App.module.css'
import navstyles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'
import { CurrentUserContext } from '../App'

function NavBar() {
    const currentUser = useContext(CurrentUserContext)
    const loggedInIcons = <>{currentUser?.username}</>
    const loggedOutIcons = <><NavLink to='/signin'><i class="fa-solid fa-right-to-bracket"></i>Sign-In</NavLink></>

    return (
        <Navbar className={navstyles.NavBar} fixed='top' bg="light" expand="lg">
            <Container>
                <NavLink to='/'>
                    <Navbar.Brand href="#home"><h1 className={styles.logo}>Today</h1></Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ml-auto'>
                        <NavLink to='/'><i class="fa-solid fa-house-chimney"></i>Home</NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar