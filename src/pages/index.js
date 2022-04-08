import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import FormAtas from "../components/FormAtas";
import Tabel from "../components/Tabel";
import Header_Cust from '../components/Header';
import { Grid, Pagination } from 'semantic-ui-react';
import Pagination_Cust from '../components/Pagination_Cust';
import Modal_Confirm from '../components/Modal_Confirm';

export default function Home({custs = []}) {

  const [Cust, setNewCustomer] = useState({ 
    custid: "", 
    firstname: '',
    lastname: '', 
    email: '',
    phone: '', 
    address: '',
  });
  
  const [_custid, setCustID] = useState({_id:""});
  const [isUpdate, setIsUpdate] = useState(false);
  const [isConfirm, setConfirm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [custperPage] = useState(5);

  const indexOfFirstCust = (currentPage - 1) * custperPage;
  const indexOfLastCust = indexOfFirstCust + custperPage;
  const currentPost = custs.slice(indexOfFirstCust, indexOfLastCust);

  //CHANGE PAGE
  const handleChangePage = (event, newPage) => setCurrentPage(newPage);

  return (
    <div>
      <Header_Cust></Header_Cust>

      <FormAtas 
        Cust = {Cust}
        isUpdate = {isUpdate}
        setNewCustomer = {setNewCustomer}
        setIsUpdate = {setIsUpdate}
        _custid = {_custid}
        setConfirm = {setConfirm}
      ></FormAtas>

      <Tabel
        custs = {currentPost}
        setNewCustomer = {setNewCustomer}
        setIsUpdate = {setIsUpdate}
        setCustID = {setCustID}
        setIsDelete = {setIsDelete}
      ></Tabel>

      <Grid style={{marginTop:"30px"}} centered >
        <Pagination
          defaultActivePage={1}
          activePage = {currentPage}
          totalPages={Math.ceil(custs.length/custperPage)}
          onPageChange={handleChangePage}>
        </Pagination>

        {/* <Pagination
          custsPerPage = {custperPage}
          currentPage = {currentPage}
          totalCusts = {custs.length}
          setCurrentPage = {setCurrentPage}
          paginate = {paginate}
        ></Pagination> */}
      </Grid>

      <Modal_Confirm
        isUpdate = {isUpdate}
        isDelete = {isDelete}
        setIsUpdate = {setIsUpdate}
        setIsDelete = {setIsDelete}
        setConfirm = {setConfirm}
        isConfirm = {isConfirm}
      ></Modal_Confirm>
    
    </div>
  )
}

export async function getServerSideProps(){
  const response = await fetch("http://localhost:3000/api/datadiri")
  const custs = await response.json();

  return{
    props: {
      custs,
    }
  }
}

