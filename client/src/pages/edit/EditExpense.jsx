import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditExpense = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    expense_name: "",
    amount: "",
    price: "",
    description: "",
    provider_name: "",
    provider_info: "",
    categoryId: null,
    category_name: "",
    product_img: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/expense/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setFormData({
            ...formData,
            expense_name: res.data[0].expense_name,
            amount: res.data[0].amount,
            price: res.data[0].price,
            description: res.data[0].description,
            categoryId: res.data[0].category_id,
            category_name: res.data[0].category_name,
            product_img: res.data[0].product_img,
            provider_name: res.data[0].provider_name,
            provider_info: res.data[0].provider_info,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [cat, setCat] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "category_name") {
      const selectedCategory = cat.find(
        (category) => category.category_name === value
      );

      if (selectedCategory) {
        // Update the formData with the categoryId only
        setFormData({
          ...formData,
          categoryId: selectedCategory.category_id,
        });
      } else {
        // Handle the case where the category name doesn't exist
        setFormData({
          ...formData,
          categoryId: null,
        });
      }
    } else {
      // For other input fields, update formData as usual
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8800/expense/cat")
      .then((res) => {
        if (res.status === 200) {
          setCat(res.data);
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const getCategoryName = (categoryId) => {
    const category = cat.find(
      (category) => category.category_id === categoryId
    );
    return category ? category.category_name : "";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create an object with the expected structure
    const productData = {
      provider_name: formData.provider_name,
      provider_info: formData.provider_info,
      description: formData.description,
    };

    axios
      .put(`http://localhost:8800/expense/${id}`, productData)
      .then((res) => {
        navigate("/expenses");
      })
      .catch((err) => {
        console.log(err);
      });
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
          <div className="left">
            <div className="dropDown">
              <div>Category: </div>
              <div>{formData.category_name}</div>
            </div>
          </div>
          <div className="right">
            <form onSubmit={handleFormSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.name === "amount" ||
                  input.name === "price" ||
                  input.name === "expense_name" ? (
                    <input
                      type={input.type}
                      name={input.name}
                      value={formData[input.name]}
                      placeholder={input.placeholder}
                      readOnly // Add the readOnly attribute here
                    />
                  ) : (
                    <input
                      type={input.type}
                      name={input.name}
                      value={formData[input.name]}
                      placeholder={input.placeholder}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
              ))}
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
