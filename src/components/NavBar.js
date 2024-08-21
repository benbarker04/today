import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import styles from '../App.module.css'
import navstyles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'
import {
    useCurrentUser,
    useSetCurrentUser
} from '../context/CurrentUserContext'
import axios from 'axios'

function NavBar() {
    const currentUser = useCurrentUser()
    const setCurrentUser = useSetCurrentUser();

    

    const handSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/")
            setCurrentUser(null)
        }catch (err){
            console.log(err)
        }
    }

    const loggedInIcons = <>
        <NavLink to='/posts/create'><i class="fa-solid fa-plus"></i>Add Post</NavLink>
        <NavLink to='/liked'><i class="fa-solid fa-thumbs-up"></i>Likes</NavLink>
        <NavLink to='/' onClick={handSignOut}><i class="fa-solid fa-arrow-right-from-bracket"></i>Sign-Out</NavLink>
        <NavLink to={`/profiles/${currentUser?.profile_id}`}>{currentUser?.username}</NavLink>
    </>
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