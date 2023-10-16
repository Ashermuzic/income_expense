import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    product_name: "",
    amount: "",
    description: "",
    categoryId: null,
    product_img: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/products/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setFormData({
            ...formData,
            product_name: res.data[0].product_name,
            amount: res.data[0].amount,
            description: res.data[0].description,
            categoryId: res.data[0].category_id,
            product_img: res.data[0].product_img,
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
      product_name: formData.product_name,
      amount: parseInt(formData.amount), // Convert amount to a number
      description: formData.description,
      category_id: formData.categoryId,
      product_img: formData.product_img,
    };

    axios
      .put(`http://localhost:8800/products/${id}`, productData)
      .then((res) => {
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(formData);

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
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : `http://localhost:8800/images/${formData.product_img}`
              }
              alt=""
            />

            <div className="dropDown">
              <div>Category: </div>
              <div>{getCategoryName(formData.categoryId)}</div>
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
                    value={formData[input.name]}
                    placeholder={input.placeholder}
                    onChange={handleInputChange}
                  />
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

export default EditProduct;
