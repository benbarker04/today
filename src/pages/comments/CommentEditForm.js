import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import commentEditStyles from '../../styles/CommentCreateEditFrom.module.css';
import btnStyles from '../../styles/Buttons.module.css'
import { Button } from "react-bootstrap";

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;

  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={commentEditStyles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2} 
        />
      </Form.Group>
      <div className="text-right">
        <Button className={`${btnStyles.black} ${commentEditStyles.Button}`} variant="dark"
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </Button>
        <Button className={`${btnStyles.black} ${commentEditStyles.Button}`} variant="dark" type="submit"  disabled={!content.trim()}>
          save
        </Button>
      </div>
    </Form>
  );
}

export default CommentEditForm;