import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "./Select";
import Header from "./Header";
import Chart from "./Chart";
import Grid from "@material-ui/core/Grid";
import Footer from "./Footer.js";

const useStyles = makeStyles({
  root: {
    // height: "489px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function Dashboard() {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Grid container spacing={24}>
        <Grid item xs={9}>
          <Chart />
        </Grid>
        <Grid item xs={3}>
          <Select />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
