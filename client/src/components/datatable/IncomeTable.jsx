import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { incomeColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const IncomeTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/incomes")
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8800/incomes/${id}`)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload(true);
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 190,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/incomes/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View Transaction Detail</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Income
        <Link to="/incomes/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={incomeColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default IncomeTable;
