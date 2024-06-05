import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCreatePostMutation } from "../../feature/blogApi";
import { useEffect } from "react";
import Loading from "../../components/shared/Loading";
import { toast } from "react-toastify";

function CreatePost() {
  const [writePost, { isLoading, isSuccess, data, isError, error }] =
    useCreatePostMutation();
  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;
    const thumbnail = event.target.thumbnail.value;
    writePost({ title, thumbnail, description });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message)
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, error, data]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h3 className="text-center">Write A Post</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Post Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
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
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Post Description</Form.Label>
          <Form.Control
            name="description"
            placeholder="post body"
            as="textarea"
            rows={3}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-end">
          <Button type="submit"> Create Post</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CreatePost;
