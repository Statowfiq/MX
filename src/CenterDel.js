import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import centers from "./centers.json";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

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
              <>
                <Card
                  variant="outlined"
                  key={cen.id}
                  style={{
                    // textAlign: "left",
                    width: "83%",

                    padding: "10px"
                  }}
                >
                  <p
                    style={{
                      width: "60%",
                      margin: "0px",
                      textAlign: "left",
                      float: "left"
                    }}
                  >
                    <b>{cen.Name}</b>
                    <br />
                    {cen.Address}
                    <br />
                    {cen.Time}
                  </p>

                  <Button
                    type="submit"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    style={{
                      float: "right",
                      marginTop: "31px",
                      marginRight: "3px",
                      height: "38px"
                    }}
                    // onClick={handleNext}
                  >
                    Select
                  </Button>
                </Card>
                <br />
              </>
            ))}
          </p>
        </div>
        {/* </ul> */}
      </div>
    </>
  );
}
