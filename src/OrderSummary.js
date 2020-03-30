import React from "react";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { AMOUNT, NAME, FROMCURRENCY, TOCURRENCY, EXCHAMOUNT } from "./Queries";
import { useApolloClient, useQuery } from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "lightgrey",
    color: "grey",
    padding: "10px",
    paddingBottom: "5px"
  },
  body: {
    fontSize: 14,
    padding: "10px",
    paddingBottom: "5px"
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

function createData(desc, amount, currency) {
  return { desc, amount, currency };
}

const useStyles = makeStyles({
  table: {
    minWidth: 100
  }
});

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

export default function OrderSummary(props) {
  const classes = useStyles();
  const [selectedvalue, setSelectedValue] = React.useState("cash");
  const client = useApolloClient();
  const { history } = props;

  const handleNext = e => {
    client.writeData({ data: { selectedvalue: selectedvalue } });

    history.push(selectedvalue === "cash" ? "/success" : "/carddetails");
  };

  const { data: amount } = useQuery(AMOUNT);
  const { data: name } = useQuery(NAME);
  const { data: fromcurrency } = useQuery(FROMCURRENCY);
  const { data: tocurrency } = useQuery(TOCURRENCY);
  const { data: exchamount } = useQuery(EXCHAMOUNT);
  const handleChange = event => {
    setSelectedValue(event.target.value);
  };
  console.log(exchamount);
  const rows = [
    createData(
      "Exchange rate",
      exchamount.exchamount.toFixed(2),
      tocurrency.tocurrency
    ),

    createData(
      "Equivalent amount",
      amount.amount > 0
        ? Number(
            exchamount.exchamount.toFixed(2) * Number(amount.amount)
          ).toFixed(2)
        : 0,
      tocurrency.tocurrency
    ),
    createData(
      "Fee",
      amount.amount > 0 ? Number(amount.amount) * 0.02 : 0,
      fromcurrency.fromcurrency
    )
  ];

  return (
    <>
      <div>
        <CardContent>
          <h4 style={{ backgroundColor: "primary" }}>Order details</h4>
          <p>Dear {name.name} please take a movement to review your order</p>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <StyledTableRow key={row.desc}>
                    <StyledTableCell component="th" scope="row">
                      {row.desc}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.amount} {row.currency}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <StyledTableRow>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ fontWeight: "bold" }}
                  >
                    Total
                  </StyledTableCell>
                  <StyledTableCell align="right" style={{ fontWeight: "bold" }}>
                    {amount.amount > 0
                      ? Number(amount.amount) * 0.02 + Number(amount.amount)
                      : 0}{" "}
                    {fromcurrency.fromcurrency}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <h4 style={{ backgroundColor: "primary" }}>
            Select a payment method
          </h4>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="payment"
              name="pay"
              value={selectedvalue}
              onChange={handleChange}
            >
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Cash on delivery"
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Card payment"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
        <CardActions style={{ float: "right" }}>
          {/* <Link to={selectedvalue === "cash" ? "/success" : "/carddet"}> */}
          <Button
            type="submit"
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {selectedvalue === "cash" ? "Confirm" : "Proceed to pay"}
          </Button>
          {/* </Link> */}
        </CardActions>
      </div>
    </>
  );
}
