import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateStudent() {
  var { id, name, email, image } = useParams();
  const [Name, setName] = useState(name);
  const [Email, setEmail] = useState(email);
  const [Image, setImage] = useState(image);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Access the selected file

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImage(file.name); // Set the image file name
    }
  };
  console.log(Name);
  console.log(Email);
  console.log(Image);
  useEffect(() => {
    if (localStorage.getItem("username")) {
      setName(localStorage.getItem("username"));
    } else {
      navigate("/");
    }
  }, [navigate]);
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put("http://localhost:4000/update/" + id, { Name, Email, Image })
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
          <h2>Update Student</h2>

          <div>
            <label htmlFor="Name">Name:</label>
            <input
              id="Name"
              type="text"
              placeholder="Enter Name"
              value={Name}
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="Email">Email:</label>
            <input
              id="Email"
              type="Email"
              placeholder="Enter Email"
              value={Email}
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
          <button type="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
