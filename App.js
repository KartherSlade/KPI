import "./App.css";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Layout from "./components/Layout";
import Feed from "./components/Feed";
import CreatePost from "./components/CreatePost";
import Profile from "./components/Profile";
import UsersList from "./components/UsersList";
import {useEffect} from 'react';

const ImSoFuckingCool = () => {
  const history = useHistory();
  useEffect(() => {
    history.goBack();
  }, [])
  
  return null;
}

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Feed />
          </Route>
          <Route path="/search">
            <UsersList />
          </Route>
          <Route path="/create-post">
            <CreatePost />
          </Route>
          <Route path="/profile/:id">
            <Profile />
          </Route>
          <Route path="/followers/:id">
            <UsersList />
          </Route>
          <Route path="/following/:id">
            <UsersList />
          </Route>
          <Route path="/hackerman">
            <ImSoFuckingCool />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
