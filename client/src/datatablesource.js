export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "product_name",
    headerName: "Product Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={`http://localhost:8800/images/${params.row.product_img}`}
            alt="avatar"
          />
          {params.row.product_name}
        </div>
      );
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
  },

  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "category_name",
    headerName: "Category",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus active`}>
          {params.row.category_name}
        </div>
      );
    },
  },
];

export const incomeColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "product_name",
    headerName: "Product Name",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={`http://localhost:8800/images/${params.row.product_img}`}
            alt="avatar"
          />
          {params.row.product_name}
        </div>
      );
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "date",
    headerName: "Transaction Date",
    width: 170,
    renderCell: (params) => {
      // Parse the date string
      const date = new Date(params.row.date);

      // Format the date as YYYY-MM-DD
      const formattedDate = date.toISOString().split("T")[0];

      return <div>{formattedDate}</div>;
    },
  },
  {
    field: "category_name",
    headerName: "Category",
    width: 110,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus active`}>
          {params.row.category_name}
        </div>
      );
    },
  },
];

export const incomeHistoryColumns = [
  { field: "id", headerName: "ID", width: 60 },
  {
    field: "product_name",
    headerName: "Product Name",
    width: 130,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 80,
  },
  {
    field: "date",
    headerName: "Transaction Date",
    width: 130,
    renderCell: (params) => {
      // Parse the date string
      const date = new Date(params.row.date);

      // Format the date as YYYY-MM-DD
      const formattedDate = date.toISOString().split("T")[0];

      return <div>{formattedDate}</div>;
    },
  },
];

export const expenseColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "expense_name",
    headerName: "Expense Name",
    width: 170,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 170,
  },
  {
    field: "date",
    headerName: "Transaction Date",
    width: 150,
    renderCell: (params) => {
      // Parse the date string
      const date = new Date(params.row.date);

      // Format the date as YYYY-MM-DD
      const formattedDate = date.toISOString().split("T")[0];

      return <div>{formattedDate}</div>;
    },
  },
  {
    field: "category_name",
    headerName: "Category",
    width: 110,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus active`}>
          {params.row.category_name}
        </div>
      );
    },
  },
];

export const expenseHistoryColumns = [
  { field: "id", headerName: "ID", width: 60 },
  {
    field: "expense_name",
    headerName: "Product Name",
    width: 130,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 80,
  },
  {
    field: "date",
    headerName: "Transaction Date",
    width: 130,
    renderCell: (params) => {
      // Parse the date string
      const date = new Date(params.row.date);

      // Format the date as YYYY-MM-DD
      const formattedDate = date.toISOString().split("T")[0];

      return <div>{formattedDate}</div>;
    },
  },
];
