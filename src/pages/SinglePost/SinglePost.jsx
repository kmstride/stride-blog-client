import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSinglePostByIdQuery } from '../../feature/blogApi';
import Loading from '../../components/shared/Loading';

function SinglePost() {
  const {id} = useParams();
  const {data, isLoading, isSuccess, isError, error} = useSinglePostByIdQuery(id);
  if(isLoading){
    return <Loading />
  }
  return (
    <div>
      {
        isSuccess && <section>
          <div className='d-flex justify-content-center'>
          <img src={data?.thumbnail} alt={data?.title} />
          </div>
          <h3>{data?.title}</h3>
          <p>Writer: {data?.author?.name}</p>
          <p>{data?.description}</p>
        </section>
      }
      {
        isError && <p className='text-danger text-center fw-bold'>{error?.data?.message}</p>
      }
    </div>
  )
}

export default SinglePost
