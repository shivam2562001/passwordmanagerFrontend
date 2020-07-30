import React,{Component}from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import RegisterForm from "./components/registerForm";
import LoginForm from './components/loginForm';
import Logout from "./components/logout";
import auth from "./services/authService";
import Home from "./components/home";
import AllPassword from './components/allpassword'
import ProtectedRoute from "./components/common/protectedRoute";
import PasswordForm from './components/Passwordform';
import EditPassword from "./components/EditPassword";
import "react-toastify/dist/ReactToastify.css";
import './App.css';


class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/allpasswords" component={AllPassword} />
            <ProtectedRoute path="/savepassword" component={PasswordForm} />
            <ProtectedRoute path="/editpassword/:id" component={EditPassword} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/home" component={Home} />
            <Redirect from="/" exact to="/home" />
            <Redirect from="/submit" to="/allpasswords" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
