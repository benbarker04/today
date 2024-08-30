import React from 'react'
import profileStyles from  '../../styles/Profile.module.css'
import btnStyles from '../../styles/Buttons.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useCurrentUser } from '../../context/CurrentUserContext'
import { Button } from 'react-bootstrap'
import { useSetProfileData } from '../../context/ProfileDataContext'
import { useHistory } from "react-router";

const Profile = (props) => {
    const {profile, mobile} = props
    const {id, following_id, owner} = profile

    const {handleFollow, handleUnfollow} = useSetProfileData()

    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner

  return (
    <div className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}>
        <div>
            <Link className={`align-self-center mx-2 ${profileStyles.WordBreak}`} to={`/profiles/${id}`}>
                <strong>{owner}</strong>
            </Link>
        </div>
        <div className={`text-right ${mobile && 'ml-auto'}`}> 
            {!mobile && currentUser && !is_owner &&(
                following_id ? (
                    <Button variant="dark" className={`${btnStyles.button} ${btnStyles.black}`} onClick={() => handleUnfollow(profile)}>Unfollow</Button>
                ) : (
                    <Button variant="dark" className={`${btnStyles.button} ${btnStyles.black}`} onClick={() => handleFollow(profile)}>Follow</Button>
                )
            )}
        </div>
    </div>
  )
}

export default Profile