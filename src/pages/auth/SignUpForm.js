import React, { useState } from "react";
import styles from "../../App.module.css";
import formStyles from '../../styles/Form.module.css'
import btnStyles from '../../styles/Buttons.module.css'
import { Form, Button, Col, Row, Container, Image, Alert } from "react-bootstrap";
import signupimage from '../../assets/two-people-looking-their-phones-one-them-is-looking-phone_905510-426.avif'
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

function SignUpForm() {
        const [signUpData, setSignUpData] = useState({
          username: "",
          password1: "",
          password2: "",
        });
        const { username, password1, password2 } = signUpData;

        const [errors, setErrors,] = useState({});
    
        const history = useHistory();

        const handleChange = (event) => {
          setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
          });
        };

        const handleSubmit = async (event) => {
            event.preventDefault()
            try{
                await axios.post('dj-rest-auth/registration/', signUpData)
                history.push('/signin')
            }catch(err){
               setErrors(err.response?.data) 
            }
        }

    return (
        <Row className={formStyles.Row}>
            <Col className="my-auto py-2 p-md-2" md={6}>
                <Container className={`${styles.Content} p-4 `}>
                    <h1>Sign-up</h1>
                    <h4>Join our community</h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={username} name="username" type="username" placeholder="Username" onChange={handleChange} />
                        </Form.Group>
                        {errors.username?.map((message, idx)=> 
                            <Alert variant="dark" key={idx}>{message}</Alert>
                        )}

                        <Form.Group controlId="password1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password1} name="password1" type="password" placeholder="Password" onChange={handleChange} />
                        </Form.Group>
                        {errors.password1?.map((message, idx)=> 
                            <Alert variant="dark" key={idx}>{message}</Alert>
                        )}

                        <Form.Group controlId="password2">
                            <Form.Label>Confirm your password</Form.Label>
                            <Form.Control value={password2} name="password2" type="password" placeholder="Confirm your password" onChange={handleChange} />
                        </Form.Group>
                        {errors.password2?.map((message, idx)=> 
                            <Alert variant="dark" key={idx}>{message}</Alert>
                        )}

                        <Button className={btnStyles.black} variant="dark" type="submit">
                            Submit
                        </Button>
                        {errors.non_field_errors?.map((message, idx)=> 
                            <Alert variant="dark" key={idx} className="mt-3">{message}</Alert>
                        )}
                    </Form>
                    <p >Already have an account?<Link to='/signin' className={formStyles.link}>Sign-in here</Link></p>
                </Container>
            </Col>
            <Col md={6}
                className={`my-auto d-none d-md-block p-2`}>
                <Image className={`${styles.FillerImage}`} src={signupimage} alt="Two friends smiling at their phone"/>
            </Col>
        </Row>

    )
}

export default SignUpForm