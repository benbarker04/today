import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Styles from "../../App.module.css";
import postsPageStyles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from '../../api/axiosDefaults'
import Post from '../posts/Post'
import noResults from '../../assets/6179016.png'
import Asset from '../../components/Asset'

function PostsPage({ message, filter = '' }) {
    const [posts, setPosts] = useState({ results: [] })
    const [hasLoaded, setHasLoaded] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}`)
                setPosts(data)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }

        setHasLoaded(false)
        fetchPosts()
    }, [filter, pathname])

    return (
        <Row className="mt-5 h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p className="d-sm-none">Popular profiles mobile</p>
                {hasLoaded ? (
                    <>
                        {posts.results.length ? (
                            posts.results.map((post) => (
                                <Post key={post.id} {...post} setposts={setPosts}/>
                            ))
                        ) : (
                            <Container className={Styles.content}>
                                <Asset src={noResults} message={message}/>
                            </Container>
                        )}
                    </>
                ) : (
                    <Container>
                        <Asset spinner/>
                    </Container>
                )}
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular profiles for desktop</p>
            </Col>
        </Row>
    );
}

export default PostsPage;