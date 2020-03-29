import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { AMOUNT, NAME, FROMCURRENCY } from "./Queries";
import { useApolloClient, useQuery } from "@apollo/react-hooks";

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
          <h4>Order Successfull</h4>
          <p>
            Congratilations, {name.name} Your order of {amount.amount}{" "}
            {fromcurrency.fromcurrency} is plaed successfully .For doorstep
            delivery cash will be deliverd within 1 hour.Thank you for placing
            your order with us.
          </p>
        </CardContent>
      </div>
    </>
  );
}
