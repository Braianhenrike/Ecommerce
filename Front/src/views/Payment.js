import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Table, Button } from "reactstrap";

import Cards from 'react-credit-cards';
import { useCart } from "components/UseCart/UseCart";
import { useLocation } from "react-router-dom";
import PaymentForm from "components/CreditCard/CreditCard";
import { CardElement } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { loadStripe } from "@stripe/stripe-js";
import 'react-credit-cards/es/styles-compiled.css';
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const { cart, totalPurchase } = location.state || { cart: [], totalPurchase: 0 };
  const { removeFromCart } = useCart();
  const [cartUpdated, setCartUpdated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const stripePromise = loadStripe('sk_test_Ho24N7La5CVDtbmpjc377lJI');
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [focus, setFocus] = useState('');

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'number':
        setNumber(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'expiry':
        setExpiry(value);
        break;
      case 'cvc':
        setCvc(value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    if (cartUpdated) {
      setCartUpdated(false);
    }
  }, [cart, cartUpdated]);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    setCartUpdated(true);
  };

  const calculateTotalPurchase = () => {
    return cart.reduce((total, product) => {
      const price = parseFloat(product.price.replace(',', '.'));
      return total + (price * product.quantity);
    }, 0);
  };

  return (
    <div className="content">
      <Card>
        <CardHeader>
          <h3>Payment Details</h3>
        </CardHeader>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Categoria</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={`data:image/png;base64,${product.image}`}
                      alt={product.name}
                      style={{ maxWidth: "50px", maxHeight: "50px" }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>R${product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.categoria.nome}</td>
                  <td>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>Total Purchase: R${calculateTotalPurchase()}</div>
          <hr />
          <h4>Payment Method</h4>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="card">Card</option>
            {/* Adicione mais opções de pagamento conforme necessário */}
          </select>
          {paymentMethod === 'card' && (
            <div>
              <h4>Card Details</h4>
              <TransitionGroup>
                <CSSTransition
                  key={paymentMethod}
                  timeout={500}
                  classNames="fade"
                >
                  <div id="PaymentForm">
                    <Cards
                      cvc={cvc}
                      expiry={expiry}
                      focused={focus}
                      name={name}
                      number={number}
                    />
                    <form>
                      <input
                        type="tel"
                        name="number"
                        placeholder="Card Number"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                      />
                      <input
                        type="tel"
                        name="name"
                        placeholder="Name"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                      />
                      <input
                        type="tel"
                        name="expiry"
                        placeholder="Valid Thru"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                      />
                      <input
                        type="tel"
                        name="cvc"
                        placeholder="CVC"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                      />
                    </form>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </div>
          )}
          <button disabled={!stripe} onClick={handleSubmit}>
            {isProcessing ? "Processing..." : "Pay"}
          </button>

        </CardBody>
      </Card>
    </div>
  );
}

export default Payment;
