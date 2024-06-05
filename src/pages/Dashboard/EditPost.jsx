import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useSinglePostByIdQuery, useUpdatePostByIdMutation } from "../../feature/blogApi";
import { useEffect, useState } from "react";
import Loading from "../../components/shared/Loading";
import { toast } from "react-toastify";

function EditPost() {
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    title: "",
    thumbnail: "",
    description: "",
  });
  const { data, isLoading, isSuccess } = useSinglePostByIdQuery(id);
  const [updatePost, {isLoading: updateLoading, isSuccess: updateSuccess, data: updatedData}] = useUpdatePostByIdMutation();
  useEffect(() => {
    if (isSuccess) {
      setInputData(data);
    }
  }, [isSuccess, data]);
  useEffect(()=>{
    if(updateSuccess){
      toast.success(updatedData?.message)
    }
  },[updateSuccess])
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
    updatePost({data: inputData, id})
  };
  if (isLoading || updateLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h4 className="text-center text-decoration-underline">Edit Post</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Post Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={inputData.title}
            onChange={handleChange}
            placeholder="Enter Post Title"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Post Thumbnail Link</Form.Label>
          <Form.Control
            type="text"
            name="thumbnail"
            placeholder="thumbnail link"
            value={inputData.thumbnail}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Post Description</Form.Label>
          <Form.Control
            name="description"
            placeholder="post body"
            as="textarea"
            value={inputData.description}
            onChange={handleChange}
            rows={3}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-end">
          <Button type="submit"> Update Post</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default EditPost;
