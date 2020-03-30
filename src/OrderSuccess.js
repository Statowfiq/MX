import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { AMOUNT, NAME, FROMCURRENCY } from "./Queries";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import Success from "./success.svg";

const useStyles = makeStyles({
  footer: {
    flexShrink: "0",
    // textAlign: "center",
    backgroundColor: "grey",
    color: "white"
  }
});

export default function OrderSuccess() {
  const classes = useStyles();
  const client = useApolloClient();

  const { data: amount } = useQuery(AMOUNT);
  const { data: name } = useQuery(NAME);
  const { data: fromcurrency } = useQuery(FROMCURRENCY);

  return (
    <>
      <div>
        <CardContent>
          <img
            src={Success}
            style={{ width: "42px", height: "60px", margin: "5px" }}
          />
          <h4>Order Successfull</h4>
          <p>
            Congratulations, <b>{name.name}</b> Your order of{" "}
            <b>
              {amount.amount} {fromcurrency.fromcurrency}
            </b>{" "}
            has been placed successfully. For doorstep delivery cash will be
            deliverd within 1 hour at the requested address.Thank you for
            placing your order with us. Happy Trading.
          </p>
        </CardContent>
      </div>
    </>
  );
}
