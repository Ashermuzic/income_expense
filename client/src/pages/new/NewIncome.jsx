import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const NewIncome = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    product_id: "", // Send product_id to the backend
    amount: "",
    price: "",
    description: "",
  });

  const [selectedProductName, setSelectedProductName] = useState(""); // To display selected product name
  const [selectedProductId, setSelectedProductId] = useState(""); // To store selected product ID

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8800/products")
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data);
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create an object with the required structure
    const incomeData = {
      product_id: selectedProductId, // Use selectedProductId to send product_id to the backend
      amount: parseInt(formData.amount),
      price: parseFloat(formData.price),
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      description: formData.description,
    };

    console.log(incomeData);

    axios
      .post("http://localhost:8800/incomes/", incomeData)
      .then((res) => {
        navigate("/incomes");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleProductChange = (e) => {
    const selectedProduct = e.target.value;
    setSelectedProductName(selectedProduct);

    // Find the corresponding product ID based on the selected product name
    const product = products.find(
      (product) => product.product_name === selectedProduct
    );
    if (product) {
      setSelectedProductId(product.product_id);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="dropDown">
            <select
              name="categoryId"
              value={selectedProductName}
              onChange={handleProductChange}
            >
              <option value="">Select the product</option>
              {products.map((product) => (
                <option key={product.product_id} value={product.product_name}>
                  {product.product_name}
                </option>
              ))}
            </select>
          </div>

          <div className="right">
            <form onSubmit={handleFormSubmit}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.name === "product_name" ? (
                    <input
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      value={selectedProductName}
                      readOnly
                    />
                  ) : (
                    <input
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [input.name]: e.target.value,
                        })
                      }
                    />
                  )}
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewIncome;
