import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Table, Button } from "reactstrap";
import { useCart } from "components/UseCart/UseCart";
import { useLocation } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();

  const { cart, totalPurchase } = location.state || { cart: [], totalPurchase: 0 };
  const { removeFromCart } = useCart();
  const [cartUpdated, setCartUpdated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const stripePromise = loadStripe('sk_test_Ho24N7La5CVDtbmpjc377lJI');

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
    return cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
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

          
        </CardBody>
      </Card>
    </div>
  );
}

export default Payment;
