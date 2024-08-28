import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import styles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {axiosReq} from "../../api/axiosDefaults";
import Post from "./Post";

function Postview() {
  const { id } = useParams()
  const [post, setPost] = useState({ results : [] })

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{data: post}] = await Promise.all([
          axiosReq.get(`/posts/${id}`)
        ])
        setPost({results: [post]})
        console.log(post)
      } catch (err){
        console.log(err)
      }
    }
    handleMount()
  }, [id])

  return (
    <Row className='mt-5 h-100'>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p className="d-sm-none">Popular profiles for mobile</p>
        <Post {...post.results[0]} setPosts={setPost} Postview/>
        <Container className={styles.Content}>
          Comments
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default Postview;