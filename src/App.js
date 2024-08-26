import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Container } from 'react-bootstrap';
import './api/axiosDefaults'
import SignInForm from './pages/auth/SignInForm';
import Home from './pages/Home';
import PostCreateForm from './pages/posts/PostCreateForm'
import Postview from './pages/posts/PostView';
import SignUpForm from './pages/auth/SignUpForm';

function App() {
  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.main}>
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path='signup' render={() => <SignUpForm/>} />
              <Route exact path='/posts/create' render={() => <PostCreateForm />}/>
              <Route exact path='/posts/:id' render={() => <Postview/>}/>
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;