import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

function Slider(props) {
  return (
    <Carousel>
      {props?.posts?.length
        ? props?.posts?.slice(0, 4).map((post) => (
            <Carousel.Item key={post?._id}>
              <div className="d-flex justify-content-center"><Image src={post?.thumbnail} width="500px" alt={post?.title} fluid/></div>
              <Carousel.Caption>
                <h3>{post?.title}</h3>
                <p>
                  {post.description.length > 50
                    ? post.description.slice(0, 50)
                    : post.description}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        : [1, 2, 3].map((item) => (
            <Carousel.Item key={item}>
              <Image
                src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                alt={item}
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
    </Carousel>
  );
}

export default Slider;
