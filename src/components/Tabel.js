import { Table,  Button,  Icon, Grid } from "semantic-ui-react"
import { useRouter } from "next/router"
import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const Tabel = ({custs, setNewCustomer, setIsUpdate, setCustID, setIsDelete}) => {
    
    const router = useRouter();

    // TABLE SORTING HANDLER
    const [state, dispatch] = React.useReducer(Reducer, {
        column: "custid",
        data: custs,
        direction: "ascending",
    })

    const { column, data, direction } = state

    //DELETE {Hanya perlu id}
    const deleteCust = async () => {
      try {
          const res = await fetch(`http://localhost:3000/api/datadiri/${_custid._id}`, {
              method: 'DELETE',
              headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
              }
          })
          router.push("/");
      } catch (error) {
          console.log(error);
      }
    }

    return (
        <Grid centered>     
        <Table sortable celled fixed compact collapsing size= "large" striped color="red" celled selectable >
          <Table.Header className= "full-width">
            <Table.Row textAlign="center">
              <Table.HeaderCell
                width ={1}
                sorted={column === 'custid' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'custid' })}
              >
                ID
              </Table.HeaderCell>
              <Table.HeaderCell
                width ={2}
                sorted={column === 'firstname' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'firstname' })}
              >
                First Name
              </Table.HeaderCell>
              <Table.HeaderCell
                width ={2}
                sorted={column === 'lastname' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'lastname' })}
              >
                Last Name
              </Table.HeaderCell>
              <Table.HeaderCell
                width ={2}
                sorted={column === 'email' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'email' })}
              >
                Email
              </Table.HeaderCell>
              <Table.HeaderCell
                width ={2}
                sorted={column === 'phone' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'phone' })}
              >
                Phone
              </Table.HeaderCell>
              <Table.HeaderCell
                width ={16}
                sorted={column === 'address' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'address' })}
              >
                Address
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((cust) => (
              <Table.Row key={cust._id}>
                <Table.Cell textAlign = "center">{cust.custid}</Table.Cell>
                <Table.Cell>{cust.lastname}</Table.Cell>
                <Table.Cell>{cust.firstname}</Table.Cell>
                <Table.Cell>{cust.email}</Table.Cell>
                <Table.Cell>{cust.phone}</Table.Cell>
                <Table.Cell>{cust.address}</Table.Cell>
                <Table.Cell collapsing width={1}>
                  <Button icon
                    onClick={()=> {
                      setNewCustomer({custid: cust.custid, firstname: cust.firstname, lastname:cust.lastname, email:cust.email, 
                          phone:cust.phone, address:cust.address
                      })
                      setIsUpdate(true)
                      setCustID({ _id: cust._id})
                    }}>
                    <Icon name='pencil' />
                  </Button>
                  <Button icon
                    onClick={()=> {
                      setCustID({ _id: cust._id});
                      deleteCust();
                      setIsDelete(true);
                    }}>
                    <Icon name='erase' />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Grid>
    )
}

function Reducer(state, action) {
    switch (action.type) {
      case 'CHANGE_SORT':
        if (state.column === action.column) {
          return {
            ...state,
            data: state.data.slice().reverse(),
            direction:
              state.direction === 'ascending' ? 'descending' : 'ascending',
          }
        }
  
        return {
          column: action.column,
          data: _.sortBy(state.data, [action.column]),
          direction: 'ascending',
        }
      default:
        throw new Error()
    }
  }

export default Tabel;