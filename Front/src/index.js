import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import UserLayout from "./layouts/User/User";
import AuthLayout from "./layouts/Auth/Auth";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { CartProvider } from "./components/UseCart/UseCart";  

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <CartProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/user" render={(props) => <UserLayout {...props} />} />
            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
        </BrowserRouter>
      </CartProvider>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);
