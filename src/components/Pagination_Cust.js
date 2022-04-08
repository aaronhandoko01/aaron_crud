import React, { Component, useState } from "react";
import { Pagination, PaginationItem } from "semantic-ui-react";

// export default class Pagination_Cust extends Component {
//     state = {
//         activePage: currentPage
//       }

//     handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

//     render() {
//       const {activePage} = this.state;

//       return(
//         <Pagination
//             activePage = {activePage}
//             totalPages={tot_page}
//             onPageChange={this.handlePaginationChange}>
//         </Pagination>
//       )
//     }
  
// }

const Pagination_Cust = ({custsPerPage, currentPage, totalCusts, setCurrentPage, paginate})=>{

    const handlePaginationChange = (e, { activePage }) => paginate({activePage})
    const tot_page = Math.ceil(totalCusts/custsPerPage);

    return (
        <Pagination
            activePage = {currentPage}
            totalPages={tot_page}
            onPageChange={(event, data) => setCurrentPage({data})}
            >
        </Pagination>
    )
}

export default Pagination_Cust;