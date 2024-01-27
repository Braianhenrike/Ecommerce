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
import { ProductProvider } from "components/ProductContext/ProductContext";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_stripe_public_key');

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <CartProvider>
        <ProductProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/user" render={(props) => (
                <Elements stripe={stripePromise}>
                  <UserLayout {...props} />
                </Elements>
              )} />
              <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
              <Redirect from="/" to="/auth/login" />
            </Switch>
          </BrowserRouter>
        </ProductProvider>
      </CartProvider>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);