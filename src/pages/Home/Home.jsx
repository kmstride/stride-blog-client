import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import Slider from "../../components/Home/Slider";
import { useCountPostQuery, useGetAllPostQuery } from "../../feature/blogApi";
import Loading from "../../components/shared/Loading";
import { Link } from "react-router-dom";
import Search from "../../components/shared/Search";
import MyPagination from "../../components/shared/Pagination";

function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(10);
  const { data: countData, isLoading: countLoading } = useCountPostQuery();
  const { data, isLoading, isSuccess } = useGetAllPostQuery({
    page: currentPage,
    size,
  });
  useEffect(() => {
    if (isSuccess) {
      setPosts(data);
    }
  }, [isSuccess, data]);
  if (isLoading || countLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Container>
        <Slider posts={data} />
        <Row>
          <Col md={8}>
            <h1>Blog Posts</h1>
            {posts?.length > 0 ? (
              posts?.map((post) => (
                <Card className="mb-4" key={post._id}>
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>Author: {post.author.name}</Card.Text>
                    <Card.Text>
                      {post.description.length > 150
                        ? post.description.slice(0, 150)
                        : post.description}
                    </Card.Text>
                    <Card.Link>
                      <Link to={`/posts/${post._id}`}>Read More</Link>
                    </Card.Link>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p className="text-danger fw-bold">No Post Found!</p>
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
          </Col>

          <Col md={4}>
            <h2>Search</h2>
            <Search setPosts={setPosts} />

            <h2>Authors</h2>
            <ListGroup className="mb-4">
              {data?.length > 0 ? (
                data
                  ?.slice(0, 4)
                  .map((post) => (
                    <ListGroup.Item key={post?._id}>
                      {post?.author?.name}
                    </ListGroup.Item>
                  ))
              ) : (
                <p className="text-danger fw-bold">No Post Found!</p>
              )}
            </ListGroup>

            <h2>Recent Posts</h2>
            <ListGroup>
              {data?.length > 0 ? (
                data
                  ?.slice(0, 4)
                  .map((post) => (
                    <ListGroup.Item key={post?._id}>
                      {post?.title}
                    </ListGroup.Item>
                  ))
              ) : (
                <p className="text-danger fw-bold">No Post Found!</p>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
