import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Image, Alert } from "react-bootstrap";
import styles from "../../App.module.css"
import formStyles from "../../styles/Form.module.css"
import btnStyles from "../../styles/Buttons.module.css"
import pceformStyles from "../../styles/PostCreateEditForm.module.css"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

function PostEditForm() {

    const [errors, setErrors] = useState({})

    const [postData, setPostData] = useState({
        title: '',
        content: '',
        image: '',
    })
    const { title, content, image } = postData

    const imageInput = useRef(null)
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/${id}`)
                const { title, content, image, is_owner } = data

                is_owner ? setPostData({ title, content, image }) : history.push('/')
            } catch (err) {
                console.log(err)
            }
        }

        handleMount()
    }, [history, id])

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image)
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0])
            })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()

        formData.append('title', title)
        formData.append('content', content)

        if (imageInput?.current?.files[0]){
            formData.append('image', imageInput.current.files[0])
        }
        
        try {
            await axiosReq.put(`/posts/${id}`, formData)
            history.push(`/posts/${id}`)
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data)
            }
        }
    }

    const textfields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={title} onChange={handleChange} />
            </Form.Group>
            {errors?.title?.map((message, idx) =>
                <Alert variant="dark" key={idx}>{message}</Alert>
            )}
            <Form.Group>
                <Form.Label>Content</Form.Label>
                <Form.Control as='textarea' rows={6} name="content" value={content} onChange={handleChange} />
            </Form.Group>
            <Button className={btnStyles.black} variant="dark" type="submit">Submit Changes</Button>
            <Button className={`${btnStyles.black} ml-2`} onClick={() => history.goBack()} variant="dark">Cancel</Button>
        </div>
    )

    return (
        <Form onSubmit={handleSubmit}>
            <Row className={`${formStyles.Row} mt-5`}>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container className={`${styles.Content} ${pceformStyles.Container} d-flex flex-column justify-content-center`}>
                        <Form.Group className="text-center">
                                    <figure>
                                        <Image className={styles.image} src={image} />
                                    </figure>
                                    <div>
                                        <Form.Label className={btnStyles.button} htmlFor="image-upload">
                                            Click here to upload a different image
                                        </Form.Label>
                                    </div>
                            <Form.File ref={imageInput} className={styles.hidden} id="image-upload" accept="image/*" onChange={handleChangeImage} />
                        </Form.Group>
                        {errors?.image?.map((message, idx) =>
                            <Alert variant="dark" key={idx}>{message}</Alert>
                        )}
                    </Container>
                    <div className={`${styles.paddingtop} d-md-none`}>{textfields}</div>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container>
                        {textfields}
                    </Container>
                </Col>
            </Row>
        </Form >
    )
}

export default PostEditForm;