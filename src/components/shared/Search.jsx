import { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { IoMdSearch } from "react-icons/io";
import { useSearchPostMutation } from "../../feature/blogApi";

function Search({setPosts}) {
    const [inputData, setInputData] = useState("");
    const [searchPost, {isSuccess, data, isError, error}] = useSearchPostMutation();
    const handleSearch=()=>{
        searchPost({data: inputData})
    }
    useEffect(()=>{
      if(isSuccess){
        console.log(data)
        setPosts(data)
        setInputData("")
      }
      if(isError){
        console.log(error)
      }
    },[isSuccess, data])
  return (
    <div>
      {/* <Form.Control type="text" placeholder="Search" className=" mr-sm-2" /> */}
      <InputGroup>
        <Form.Control
          placeholder="Search Here"
          onChange={(event)=>setInputData(event.target.value)}
          value={inputData}
        />
        <Button variant="outline-secondary" onClick={handleSearch}>
        <IoMdSearch />
        </Button>
      </InputGroup>
    </div>
  );
}

export default Search;
