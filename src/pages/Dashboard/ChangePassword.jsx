import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useChangeUserPasswordMutation } from "../../feature/userApi";
import Loading from "../../components/shared/Loading";
import { toast } from "react-toastify";

function ChangePassword() {
  const [inputData, setInputData] = useState({
    current: "",
    password: "",
    confirmPassword: "",
  });
  const [passError, confirmPassError] = useState(false);
  const [changePass, { isLoading, isError, error, isSuccess, data }] =
    useChangeUserPasswordMutation();
  const handleChange = (event) => {
    setInputData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { current, password, confirmPassword } = inputData;
    if (password !== confirmPassword) {
      confirmPassError(true);
    } else {
      confirmPassError(false);
      changePass({current, password})
      setInputData({
        current: "",
        password: "",
        confirmPassword: "",
      })
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (isError) {
      toast.error(error?.data?.message)
    }
  }, [isSuccess, isError, data, error]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h4 className="text-center text-decoration-underline">Change Password</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            name="current"
            value={inputData.current}
            onChange={handleChange}
            placeholder="Enter Your Current Password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter New Password"
            value={inputData.password}
            onChange={handleChange}
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
            name="confirmPassword"
            placeholder="Enter Password Again"
            value={inputData.confirmPassword}
            onChange={handleChange}
            required
          />
          {passError && (
            <p className="text-danger">
              Password and Confirm Password Not Matched!
            </p>
          )}
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-end">
          <Button type="submit"> Change Password</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default ChangePassword;
