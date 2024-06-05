import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setToken } from "../../feature/rootSlice";
import GoogleLogin from "../../components/shared/GoogleLogin";
import { useLoginMutation } from "../../feature/userApi";
import Loading from "../../components/shared/Loading";

function Login() {
  const [userLogin, {isLoading, data, isSuccess, isError, error}] = useLoginMutation();
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  let from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    userLogin({email, password})
  };
  useEffect(() => {
    if(isSuccess){
      console.log(data)
      if (!token) {
        localStorage.setItem("authToken", data?.authToken);
        dispatch(setToken(data?.authToken));
      }
      toast.success("Login Successfull!");
      navigate(from, { replace: true });
    }
    if(isError){
      console.log(error)
    }
  }, [token, isSuccess, isError, data, error]);
  if(isLoading){
    return <Loading />
  }
  return (
    <div>
      <h3 className="text-center text-decoration-underline">Login Here</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
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
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Not Have Any Account? <Link to="/register">Register Here</Link>
      </p>
      <GoogleLogin />
    </div>
  );
}

export default Login;
