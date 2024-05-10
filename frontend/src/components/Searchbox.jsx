import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams()
  const [keyword, setKeyword] = useState(urlKeyword || "");


  return (
    <form className="form">
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search to-do's by tags or text.."
          value={keyword}
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          style={{ margin: "5px", flex: "1" }}
        />
        <button type="submit" className="btn" style={{ marginLeft: "5px" }} onClick={()=> navigate(keyword ? `/search/${keyword}`: "/")}>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
