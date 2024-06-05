import Button from "react-bootstrap/Button";
import { FaGoogle } from "react-icons/fa6";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";
import Loading from "./Loading";
import { useEffect } from "react";
import { useGoogleLoginMutation } from "../../feature/userApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../feature/rootSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function GoogleLogin() {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [
    googleSignIn,
    { isLoading, isSuccess, isError, data, error: googleError },
  ] = useGoogleLoginMutation();
  useEffect(() => {
    if (user) {
      googleSignIn({
        email: user.user.email,
        photo: user.user.photoURL,
        name: user.user.displayName,
      });
    }
    if (error) {
      console.log(error);
    }
  }, [user, error]);
  useEffect(() => {
    if (isSuccess) {
      if (!token) {
        localStorage.setItem("authToken", data?.authToken);
        dispatch(setToken(data?.authToken));
      }
      toast.success("Login Successfull!");
      navigate("/dashboard", { replace: true });
    }
    if (isError) {
      console.log(googleError);
    }
  }, [isSuccess, isError, data, googleError]);
  if (loading || isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <hr />
      <div className="d-flex justify-content-center">
        <Button onClick={() => signInWithGoogle()}>
          <FaGoogle /> Login With Google
        </Button>
      </div>
    </div>
  );
}

export default GoogleLogin;
