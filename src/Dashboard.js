import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "./Select";
import Header from "./Header";
import Chart from "./Chart";
import Grid from "@material-ui/core/Grid";
import Footer from "./Footer.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Location from "./Location";
import Card from "@material-ui/core/Card";
import DeliveryOpt from "./DeliveryOpt";
import Details from "./Details.js";
import OrderSummary from "./OrderSummary";
import OrderSuccess from "./OrderSuccess";
import CardDetails from "./CardDetails";

const useStyles = makeStyles(theme => ({
  root: {
    // "& .MuiTextField-root": {
    //   margin: theme.spacing(1),
    //   width: 200
    // },
    margin: "20px",
    marginLeft: "40px",
    // marginTop: "50px",
    height: "600px",
    overflowY: "auto"
  },
  app: {
    textAlign: "center",
    backgroundColor: theme.palette.background.default
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Header />
      <Grid container spacing={24}>
        <Grid item xs={8}>
          <Chart />
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <Router>
              <div>
                <Route exact path="/" component={Select} />
                <Route path="/deliveryoption" component={DeliveryOpt} />
                <Route path="/details" component={Details} />
                <Route path="/summary" component={OrderSummary} />
                <Route path="/success" component={OrderSuccess} />
                <Route path="/carddetails" component={CardDetails} />
              </div>
            </Router>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
