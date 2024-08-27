import React from 'react'
import { useCurrentUser } from '../context/CurrentUserContext'
import SignUpForm from './auth/SignUpForm'
import PostsPage from './posts/PostsPage'


function Home() {
    const currentUser = useCurrentUser()
    const loggedInPage = <><PostsPage message='No results found'/></>
    const loggedOutPage = <><SignUpForm/></>

  return (
    <div>{currentUser ? loggedInPage : loggedOutPage}</div>
  )
}

export default Home