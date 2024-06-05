import React, { useEffect } from "react";
import { useLoggedInQuery } from "../../feature/userApi";
import Loading from "../../components/shared/Loading";
import { Button, Image } from "react-bootstrap";
import {Link} from "react-router-dom";
import AuthorPer from "../../components/shared/AuthorPer";

function Dashboard() {
  const { isLoading, isSuccess, isError, error, data } = useLoggedInQuery();
  useEffect(() => {
    if (isSuccess) {
      // console.log(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, data, error]);
  
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h3 className="text-center">Welcome {data?.name} to your dashboard</h3>
      <section className="d-flex justify-content-center gap-2">
        <div>
          <Image src={data?.photo} alt={data?.name} />
        </div>
        <div>
          <p>Name: {data?.name}</p>
          <p>Email: {data?.email}</p>
        </div>
        <div>
          <Link to={`/dashboard/edit-profile`} className="btn btn-info">Edit</Link>
        </div>
      </section>
      {/* <section>
        <h3>Author Performance</h3>
        <AuthorPer />
      </section> */}
    </div>
  );
}

export default Dashboard;
