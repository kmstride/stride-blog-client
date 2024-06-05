import React, { useEffect, useState } from "react";
import { useLoggedInQuery, useUpdateUserMutation } from "../../feature/userApi";
import Loading from "../../components/shared/Loading";
import { Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';

function EditProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    photo: "",
  });
  const { isLoading, data, isSuccess } = useLoggedInQuery();
  const [update, {isLoading: updateLoading, isSuccess: updateSuccess, data: updatedData}] = useUpdateUserMutation();
  const handleChange = (event) => {
    setProfile(prev=>{
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    update(profile)
  };
  useEffect(() => {
    if (isSuccess) {
      setProfile(data);
    }
  }, [isSuccess, data]);
  useEffect(()=>{
    if(updateSuccess){
      toast.success(updatedData?.message)
    }
  },[updateSuccess, updatedData])
  if (isLoading || updateLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h4 className="text-center text-decoration-underline">Edit Profile</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter Post Title"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Your Email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Profile Photo Url</Form.Label>
          <Form.Control
            name="photo"
            placeholder="Photo Url"
            value={profile.photo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-end">
          <Button type="submit"> Update Profile</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default EditProfile;
