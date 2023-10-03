export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "product_name",
    headerName: "Product Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
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
