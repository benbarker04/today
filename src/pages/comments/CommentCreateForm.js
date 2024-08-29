import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import CommentFormStyles from '../../styles/CommentCreateEditFrom.module.css';
import { axiosRes } from "../../api/axiosDefaults";
import btnStyles from '../../styles/Buttons.module.css'
import Styles from '../../App.module.css'
import { Button } from "react-bootstrap";

function CommentCreateForm(props) {
    const { post, setPost, setComments, profile_id } = props;
    const [content, setContent] = useState("");

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosRes.post("/comments/", {
                content,
                post,
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        comments_count: prevPost.results[0].comments_count + 1,
                    },
                ],
            }));
            setContent("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form className={`${Styles.content} mt-2`} onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup>
                    <Form.Control
                        className={CommentFormStyles.Form}
                        placeholder="Write your comment here"
                        as="textarea"
                        value={content}
                        onChange={handleChange}
                        rows={2}
                    />
                </InputGroup>
            </Form.Group>
            <Button className={`${btnStyles.black} btn d-block ml-auto`} variant="dark" type="submit"
                disabled={!content.trim()}
            >
                post
            </Button>
        </Form>
    );
}

export default CommentCreateForm;