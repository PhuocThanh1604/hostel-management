import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";



export default function Paypal({ total, room, day, handlePayment }) {
    return (

        <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: total,
                            },
                        },
                    ],
                });
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                    const name = details.payer.name.given_name;

                    handlePayment();
                });
            }}
            onError={(err) => {
                return err;
            }}

            onCancel={(data) => {
                return data;
            }
            }
        />
    )
}
