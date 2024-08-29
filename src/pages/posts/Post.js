import React from 'react'
import poststyles from '../../styles/Post.module.css'
import { useCurrentUser } from '../../context/CurrentUserContext'
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Postview from './PostView'
import { axiosRes } from '../../api/axiosDefaults'
import { MoreDropDown } from '../../components/MoreDropDown'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        image,
        updated_at,
        Postview,
        setPosts
    } = props

    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner
    const history = useHistory()

    const handleEdit = () => {
        history.push(`/posts/${id}/edit`)
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}`)
            history.goBack()
        } catch (err) {
            console.log(err)
        }
    }

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post('/likes/', { post: id })
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
                        : post
                })
            }))
        } catch (err) {
            console.log(err)
        }
    }

    const handleunlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                        ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                        : post;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <Card className={poststyles.Post}>
            <Card.Body>
                <Media className='align-items-center justify-content-between'>
                    <Link to={`/profiles/${profile_id}`}>
                        {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span>{updated_at}</span>
                        {is_owner && <MoreDropDown handleEdit={handleEdit} handleDelete={handleDelete}/>}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && <Card.Title className='text-center'>{title}</Card.Title>}
                {content && <Card.Text>{content}</Card.Text>}
                <div className={poststyles.postBar}>
                    {is_owner ? (
                        <OverlayTrigger placement='top' overlay={<Tooltip>You can't like your own post</Tooltip>}>
                            <i className='far fa-heart' />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleunlike}>
                            <i className={`far fa-heart ${poststyles.Heart}`} />
                        </span>
                    ) : (
                        <span onClick={handleLike}>
                            <i className={`far fa-heart ${poststyles.HeartOutline}`} />
                        </span>
                    )}
                    {likes_count}
                    <Link to={`/posts/${id}`}>
                        <i class="fa-regular fa-message"></i>
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    )
}

export default Post