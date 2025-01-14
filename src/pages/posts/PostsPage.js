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
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from '../profiles/PopularProfiles'

function PostsPage({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
                setPosts(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPosts();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname]);

    return (
        <Row className="mt-5 h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile/>
                <i className={`fa-solid fa-magnifying-glass ${postsPageStyles.SearchIcon}`}></i>
                <Form className={postsPageStyles.SearchBar} onSubmit={(event) => event.preventDefault()} value={query}>
                    <Form.Control type='text' className='mr-2' placeholder='Search posts' onChange={(event) => setQuery(event.target.value)} />
                </Form>

                {hasLoaded ? (
                    <>
                        {posts.results.length ? (
                            <InfiniteScroll
                                children={
                                    posts.results.map((post) => (
                                        <Post key={post.id} {...post} setPosts={setPosts} />
                                    ))
                                }
                                dataLength={posts.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!posts.next}
                                next={() => fetchMoreData(posts, setPosts)}
                            />
                        ) : (
                            <Container className={Styles.content}>
                                <Asset src={noResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col md={4} className='d-none d-lg-block p-0 p-lg-2' >
            <Container>
               <PopularProfiles /> 
            </Container>                
            </Col>
        </Row>
    );
}

export default PostsPage;