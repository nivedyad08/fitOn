import React from 'react'

export default function reactPayPal() {
    const [paid, setPaid] = React.useState(false);
    const [error, setError] = React.useState(null);
    const paypalRef = React.useRef();
    React.useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Your description",
                                amount: {
                                    currency_code: "USD",
                                    value: 500.0,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setPaid(true);
                    console.log(order);
                },
                onError: (err) => {
                    //   setError(err),
                    console.error(err);
                },
            })
            .render(paypalRef.current);
    }, []);
    return (
        <div>

        </div>
    )
}