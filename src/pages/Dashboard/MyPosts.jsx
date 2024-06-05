import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  useCountPostByUserQuery,
  useDeletePostMutation,
  usePostsByUserQuery,
} from "../../feature/blogApi";
import Loading from "../../components/shared/Loading";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MyPagination from "../../components/shared/Pagination";
import DeleteConfirmationModal from "../../components/Modals/DeleteConfirmationModal";
import { toast } from "react-toastify";
import Search from "../../components/shared/Search";

function MyPosts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(4);
  const [show, setShow] = useState(false);
  const [postId, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [
    deletePost,
    { isSuccess, isLoading: deleteLoading, isError, error, data: deletedData },
  ] = useDeletePostMutation();
  const { isLoading: countLoading, data: countData } =
    useCountPostByUserQuery();
  const {
    isLoading,
    data,
    isSuccess: postSuccess,
  } = usePostsByUserQuery({
    page: currentPage,
    size,
  });
  
  const handleDelete = (post) => {
    setShow(true);
    setPost(post);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(deletedData?.message);
      console.log(deletedData);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, deletedData, error]);
  useEffect(() => {
    if (postSuccess) {
      setPosts(data);
    }
  }, [postSuccess, data]);
  if (isLoading || countLoading || deleteLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="d-flex justify-content-around">
        <h4 className="text-center text-decoration-underline">
          My Posts: {countData?.count}
        </h4>
        <div>
          <Search setPosts={setPosts} />
        </div>
      </div>
      {posts?.length > 0 ? (
        <Row xs={1} md={2} className="g-4">
          {posts?.map((post) => (
            <Col key={post?._id}>
              <Card>
                <Card.Img variant="top" src={post?.thumbnail} width="200px" />
                <Card.Body>
                  <Card.Title>{post?.title}</Card.Title>
                  <Card.Text>
                    {post.description.length > 150
                      ? post.description.slice(0, 150)
                      : post.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link to={`/dashboard/edit-post/${post?._id}`}>
                    <Button size="sm" variant="info">
                      Edit
                    </Button>
                  </Link>{" "}
                  <Button
                    onClick={() => handleDelete(post)}
                    size="sm"
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-danger fw-bold">Post Not Found!</p>
      )}
      <div className="d-flex justify-content-center">
        {countData?.count > size && (
          <MyPagination
            count={countData?.count}
            size={size}
            setSize={setSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
      {show && (
        <DeleteConfirmationModal
          data={postId}
          setPost={setPost}
          show={show}
          setShow={setShow}
          deletePost={deletePost}
        />
      )}
    </div>
  );
}

export default MyPosts;
