import { useState, useEffect } from "react";

function Users() {
      const [data, setData] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [dataPerPage, setDataPerPage] = useState(10);
      const [currentPage, setCurrentPage] = useState(1);
      
    const noOfDataPerPage= Math.ceil(data.length/dataPerPage);
    const pages = [...Array(noOfDataPerPage + 1).keys()].slice(1);
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const visibleData = data.slice(indexOfFirstData, indexOfLastData);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then(res=>{
      if(!res.ok){
      throw Error("Could not fetch data")
      }
      return res.json();
    })
    .then(data=>{
      setIsLoading(false);
      setData(data);
      
    })
    .catch(err=>{
      console.log(err.message)
      setIsLoading(false);
    })
  }, []);

  const nextPage = () => {
    if(currentPage !== noOfDataPerPage){
      setCurrentPage(currentPage + 1);
    }
  }

 const prevPage = () => {
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1);
    }
  }
  return(

    <>
      <select onChange={(e) => setDataPerPage(e.target.value)} value={dataPerPage}>
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="50">50</option>
      </select>
    <div>
      <h1>Data</h1>
      {isLoading && <div>Loading...</div>}
      <ul>
        {visibleData.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
    <button><span onClick={(prevPage)}>Prev</span></button>
    <p>
      {pages.map((page) => (
        <button
          key={page.id}
          onClick={() => setCurrentPage(page)}
          className={ page === currentPage ? "active" : "" }
        >
          {page}
        </button>
      ))}
    </p>
    <button><span onClick={(nextPage)}>Next</span></button>
    </>

  )
}
export default Users;