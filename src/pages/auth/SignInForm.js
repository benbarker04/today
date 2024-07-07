import React, { useState } from "react";
import styles from "../../App.module.css";
import formStyles from '../../styles/Form.module.css'
import btnStyles from '../../styles/Buttons.module.css'
import { Form, Button, Col, Row, Container, Image, Alert } from "react-bootstrap";
import signinimage from '../../assets/GEN-Z-GENERATION-Z-iStock--Eduard-Figueres--1441262328.jpg'
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

function SignInForm() {
    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = signInData;

    const [errors, setErrors] = useState({});

    const history = useHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/login/", signInData);
            history.push("/feed");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div>
            <Row className={formStyles.Row}>
                <Col className="my-auto py-2 p-md-2" md={6}>
                    <Container className={`${styles.Content} p-4 `}>
                        <h1>Sign-In</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control value={username} name="username" type="username" placeholder="Username" onChange={handleChange} />
                            </Form.Group>
                            {errors.username?.map((message, idx) =>
                                <Alert variant="dark" key={idx}>{message}</Alert>
                            )}

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={password} name="password" type="password" placeholder="Password" onChange={handleChange} />
                            </Form.Group>
                            {errors.password?.map((message, idx) =>
                                <Alert variant="dark" key={idx}>{message}</Alert>
                            )}

                            <Button className={btnStyles.black} variant="dark" type="submit">
                                Submit
                            </Button>
                            {errors.non_field_errors?.map((message, idx) =>
                                <Alert variant="dark" key={idx} className="mt-3">{message}</Alert>
                            )}
                        </Form>
                    </Container>
                </Col>
                <Col md={6}
                    className={`my-auto d-none d-md-block p-2`}>
                    <Image className={`${styles.FillerImage}`} src={signinimage} alt="Two friends smiling at their phone" />
                </Col>
            </Row></div>
    )
}

export default SignInForm