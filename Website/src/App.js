import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Login from "./login";
import Register from "./register";
import Dashboard from "./dashboard";
import UserInfo from "./userinfo";
import Inventory from "./inventory";
import Friends from "./friends";
import Recipes from "./recipes";
import Recipe from "./recipe";
import { Helmet } from "react-helmet";
import Whishlists from "./wishlists";
import ShoppingLists from "./shoppinglists";

class App extends Component {
  isAuth = () => {
    let token = localStorage.getItem("auth");
    axios
      .get(
        "http://localhost:1331/inventory/all",
        {
          headers: { auth: token },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Token valido");
      })
      .catch((error) => {
        localStorage.removeItem("auth")
        console.log(error);
      });

    if (localStorage.getItem("auth") != null) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    if (this.isAuth() === false) {
      return (
        <React.Fragment>
          <Helmet>
            <title>KitchenApp</title>
          </Helmet>
          <Router>
            <Switch>
              <Route path="/register" component={Register} />
              <Route exact path="*" component={Login} />
            </Switch>
          </Router>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Helmet>
            <title>KitchenApp</title>
          </Helmet>
          <Router>
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route path="/dashboard/userinfo" component={UserInfo} />
              <Route path="/dashboard/inventory/" render={(props) => <Inventory shared={false} {...props}/>} />
              <Route path="/dashboard/shared/inventory/" render={(props) =><Inventory shared={true} {...props}/>} />
              <Route path="/dashboard/friends/" component={Friends} />
              <Route path="/dashboard/recipes/" component={Recipes} />
              <Route path="/dashboard/recipe/" component={Recipe} />
              <Route path="/dashboard/wishlists/" component={Whishlists} />
              <Route path="/dashboard/shoppinglists/" component={ShoppingLists} />

              <Route exact path="*" component={Dashboard} />
            </Switch>
          </Router>
        </React.Fragment>
      );
    }
  }
}

export default App;
