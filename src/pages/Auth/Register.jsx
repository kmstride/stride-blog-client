import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/shared/GoogleLogin";
import {toast} from 'react-toastify';
import {
  useRegisterMutation,
  useUploadPhotoMutation,
} from "../../feature/userApi";
import Loading from "../../components/shared/Loading";
import { useDispatch } from "react-redux";
import { setToken } from "../../feature/rootSlice";

function Register() {
  const [passError, setPassError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [userRegister, { isLoading, isSuccess, isError, error, data }] =
    useRegisterMutation();
  const [uploadPhoto, { isLoading: photoLoading }] = useUploadPhotoMutation();
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    if (password !== confirmPassword) {
      setPassError(true);
    } else {
      setPassError(false);
      userRegister({ name, email, password });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      localStorage.setItem("authToken", data?.authToken);
      dispatch(setToken(data?.authToken));
      const formData = new FormData();
      formData.append("photo", photo);
      uploadPhoto(formData);
      toast.success("Registration Completed")
      navigate("/dashboard")
    }
    if (isError) {
      console.log(error);
    }
  }, [isError, isSuccess, data, error]);
  if (isLoading || photoLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h3 className="text-center text-decoration-underline">Register Here</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            name="name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Your Photo</Form.Label>
          <Form.Control
            onChange={(e) => setPhoto(e.target.files[0])}
            type="file"
            accept="image/*"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          {passError && (
            <p className="text-danger">
              Password and Confirm Password Not Matched!
            </p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password Again"
            name="confirmPassword"
            required
          />
          {passError && (
            <p className="text-danger">
              Password and Confirm Password Not Matched!
            </p>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already Have an Account? <Link to="/login">Login Here</Link>
      </p>
      <GoogleLogin />
    </div>
  );
}

export default Register;
