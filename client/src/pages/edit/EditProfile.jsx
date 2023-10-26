import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = ({ inputs, title }) => {
  const username = localStorage.getItem("username");
  const isAuthenticated = !!username;

  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    company_name: "",
    phone: "",
    email: "",
    address: "",
    role: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/auth/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setFormData({
            ...formData,
            username: res.data.username,
            company_name: res.data.company_name,
            phone: res.data.phone,
            email: res.data.email,
            address: res.data.address,
            role: res.data.role,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // For other input fields, update formData as usual
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create an object with the expected structure
    const ownerData = {
      user_id: id,
      username: formData.username,
      company_name: formData.company_name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      role: formData.role,
    };

    axios
      .put(`http://localhost:8800/auth/${id}`, ownerData)
      .then((res) => {
        navigate("/profile");
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
                  : `http://localhost:8800/images/${formData.product_img}`
              }
              alt=""
            />
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
  ) : null;
};

export default EditProfile;
