import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export default function Door() {
  return (
    <div style={{ padding: "0" }}>
      <h4>Enter the address where you want the cash to be delivered</h4>
      <form>
        <TextField
          required
          id="standard-required"
          label="Street Address"
          variant="outlined"
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <TextField
          required
          id="standard-required"
          label="City"
          variant="outlined"
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <TextField
          required
          id="standard-required"
          label="State"
          variant="outlined"
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <TextField
          required
          id="standard-required"
          label="Zip code"
          variant="outlined"
          style={{ width: "100%" }}
        />
      </form>
    </div>
  );
}
