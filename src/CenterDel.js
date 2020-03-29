import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import centers from "./centers.json";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
  footer: {
    flexShrink: "0",
    // textAlign: "center",
    backgroundColor: "grey",
    color: "white"
  }
});

export default function Center() {
  const classes = useStyles();

  return (
    <>
      <div>
        <h4>Select a Cashier Center</h4>
        {/* <ul> */}
        <div style={{ overflowX: "scroll" }}>
          <p>
            {centers.map(cen => (
              // <li key={cen.id}>
              // {cen.Name}
              // </li>

              <Card variant="outlined" key={cen.id}>
                <p>{cen.Name}</p>
                <p>{cen.Address}</p>
                <p>{cen.Time}</p>
              </Card>
            ))}
          </p>
        </div>
        {/* </ul> */}
      </div>
    </>
  );
}
