import { useEffect } from "react";

const usePaymentEffect = (checkout, paypal, handlePaymentSuccess,amount) => {
    useEffect(() => {
        if (checkout) {
            window.paypal
                .Buttons({
                    createOrder: (data, actions, err) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    description: "New Registration",
                                    amount: {
                                        currency_code: "USD",
                                        value: amount,
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        handlePaymentSuccess(order);
                    },
                    onError: (err) => {
                        console.log(err);
                    },
                })
                .render(paypal.current);
        }
    }, [checkout])
}

export default usePaymentEffect;