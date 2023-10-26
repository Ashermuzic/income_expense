import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const username = localStorage.getItem("username");
  const isAuthenticated = !!username;

  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    product_name: "",
    amount: "",
    description: "",
    categoryId: null,
    // product_img: "",
  });

  const navigate = useNavigate();

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
      .get("http://localhost:8800/categories")
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
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create an object with the expected structure
    const productData = {
      product_name: formData.product_name,
      amount: parseInt(formData.amount), // Convert amount to a number
      description: formData.description,
      category_id: formData.categoryId,
    };

    axios
      .post("http://localhost:8800/products/", productData)
      .then((res) => {
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return isAuthenticated ? (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />

            <div className="dropDown">
              <select name="categoryId" onChange={handleInputChange}>
                <option value="">Select a category</option>{" "}
                {cat.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
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
                  <input
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default New;
