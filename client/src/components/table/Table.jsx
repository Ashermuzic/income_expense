import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const List = () => {
  const [mostRecent, setMostRecent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/stats/most_recent_transaction")
      .then((res) => {
        setMostRecent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Product Name</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Total Price</TableCell>
            <TableCell className="tableCell">Transaction Type</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mostRecent.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="tableCell">{data.product_id}</TableCell>
              <TableCell className="tableCell">{data.product_name}</TableCell>
              <TableCell className="tableCell">
                {new Date(data.date).toLocaleDateString()}
              </TableCell>
              <TableCell className="tableCell">$ {data.total_price}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${data.type}`}>{data.type}</span>
              </TableCell>
              <TableCell className="tableCell">
                <div className="cellAction">
                  <Link
                    to={`/${data.type}s/${data.product_id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="linkBox">View Transaction Detail</div>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
