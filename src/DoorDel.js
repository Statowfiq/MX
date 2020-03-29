import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  footer: {
    flexShrink: "0",
    // textAlign: "center",
    backgroundColor: "grey",
    color: "white"
  }
});

export default function Door() {
  const classes = useStyles();

  return (
    <>
      <div>
        <h4>Enter the address where you want the cash to be delivered</h4>
        <form>
          <TextField required id="standard-required" label="Street Address" />
          <TextField required id="standard-required" label="City" />
          <TextField required id="standard-required" label="State" />
          <TextField required id="standard-required" label="Zip code" />
        </form>
      </div>
    </>
  );
}
