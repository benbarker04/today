import React, { useState } from "react";
import commentStyles from '../../styles/Comment.module.css'
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCurrentUser } from '../../context/CurrentUserContext'
import { MoreDropDown } from '../../components/MoreDropDown'
import { axiosRes } from '../../api/axiosDefaults';
import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
    const {
        profile_id,
        owner,
        updated_at,
        content,
        id,
        setPosts,
        setComments,
    } = props;

    const [showEditForm, setShowEditForm] = useState(false);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}/`);
            setPosts((prevPosts) => ({
                results: [
                    {
                        ...prevPosts.results[0],
                        comments_count: prevPosts.results[0].comments_count - 1,
                    },
                ],
            }));

            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !== id),
            }));
        } catch (err) { 
            console.log(err)
        }
    };


    return (
        <>
            <hr />
            <Media>
                <Link className={commentStyles.Owner} to={`/profiles/${profile_id}`}>
                    {owner}
                </Link>
                <Media.Body className="align-self-center ml-2">
                    <span className={commentStyles.Date}>{updated_at}</span>
                    {showEditForm ? (
                        <CommentEditForm
                        id={id}
                        profile_id={profile_id}
                        content={content}
                        setComments={setComments}
                        setShowEditForm={setShowEditForm}
                      />
                    ) : (
                        <p>{content}</p>
                    )}
                </Media.Body>
                {is_owner && !showEditForm && (
                    <MoreDropDown
                        handleEdit={() => setShowEditForm(true)}
                        handleDelete={handleDelete}
                    />
                )}
            </Media>
        </>
    );
}

export default Comment