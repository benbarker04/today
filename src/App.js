import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import './api/axiosDefaults'
import SignInForm from './pages/auth/SignInForm';
import Home from './pages/Home';
import PostCreateForm from './pages/posts/PostCreateForm'
import Postview from './pages/posts/PostView';
import { useCurrentUser } from './context/CurrentUserContext';
import PostsPage from './pages/posts/PostsPage';
import PostEditForm from './pages/posts/PostEditForm';

function App() {
  const currentUser = useCurrentUser()
  const profile_id = currentUser?.profile_id || ''

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.main}>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/feed" render={() => <PostsPage
            message='No results found. Follow a user to see their posts on this page.'
            filter={`owner__followed__owner__profile=${profile_id}&`}
          />} />
          <Route exact path="/liked" render={() => <PostsPage
            message='No results found. Like some posts to see them on this page.'
            filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
          />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path='/posts/create' render={() => <PostCreateForm />} />
          <Route exact path='/posts/:id/edit' render={() => <PostEditForm />} />
          <Route exact path='/posts/:id' render={() => <Postview />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;