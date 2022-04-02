import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function usePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {

    event.preventDefault();

    const amountToCharge = 100;

    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !elements || !cardElement) {
      console.log("Error");
      return;
    }

    const stripeResponse = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });

    const { error, paymentMethod } = stripeResponse;

    if (error || !paymentMethod) {
      console.log("Error method", error);
      return;
    }

    const paymentMethodId = paymentMethod.id;

    console.log("Fetch: ", paymentMethod);

    fetch(`${process.env.REACT_APP_API_URL}/users/charge`, {
      method: 'POST',
      body: JSON.stringify(({
        paymentMethodId,
        amount: amountToCharge
      })),
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDg4OTc4ODAsImV4cCI6MTY0ODg5ODE4MCwic3ViIjoiOWIzYmI5NzctMmFhZS00ZWMxLWIzMWMtODVhYWU4MWFjZTNhIn0.Jo4X-KzGMwmkl1ii57Zg18XAqBe2yOHztpK0TXeoMp0',
        'Content-Type': 'application/json'
      },
    })

  };

  return {
    handleSubmit
  }
}

export default usePaymentForm;