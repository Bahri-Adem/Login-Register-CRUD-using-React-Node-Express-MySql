import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateStudent() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Image, setImage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("username")) {
      setName(localStorage.getItem("username"));
    } else {
      navigate("/");
    }
  }, [navigate]);
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Access the selected file
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImage(file.name); // Set the image file name
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:4000/create", { Name, Email, Image })
      .then((res) => {
        console.log(res);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Create Student</h2>

          <div>
            <label htmlFor="Name">Name:</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="Email">Email:</label>
            <input
              type="Email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="Image">Email:</label>
            <input
              id="Image"
              type="file"
              name="Image"
              className="form-control"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
