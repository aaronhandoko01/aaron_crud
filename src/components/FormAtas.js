import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import {Container, Button, Form,  Grid} from "semantic-ui-react"
import { useRouter } from "next/router"

const FormAtas = ({Cust, isUpdate, setNewCustomer, setIsUpdate, _custid, setConfirm}) =>{
    
    const {custid, firstname, lastname, email, phone, address} = Cust 
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
            if (isUpdate){
                updateCust();
            }
            else{
                createCust();
            }
            }
            else {
                setIsSubmitting(false);
            }
            setConfirm(true)
            setNewCustomer({ custid: '', firstname: '', lastname:'', email:'', phone:'', address:'' });
        }
    }, [errors])


    //CREATE
    const createCust = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/datadiri', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Cust)
        })
        router.push("/");
    } catch (error) {
        console.log(error);
    }
    }

    //UPDATE
    const updateCust = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/datadiri/${_custid._id}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Cust)
        })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }
    // BUTTON HANDLER
    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
        if (errs.length < 1){
            setNewCustomer({ custid: '', firstname: '', lastname:'', email:'', phone:'', address:'' });
            setConfirm(true);
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setNewCustomer({ custid: '', firstname: '', lastname:'', email:'', phone:'', address:'' });
        setIsUpdate(false);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewCustomer({...Cust, [name]:value});
    }

    const validate = () => {
        let errors = {};
        if(!custid){
        errors.custid = "ID is Required"
        }

        if(!firstname){
        errors.firstname = "Firstname is Required"
        }
        if(!lastname){
        errors.lastname = "Lastname is Required"
        }
        if(!email){
        errors.email = "Email is Required"
        }
        if (email.indexOf("@") == -1){
        errors.email = "Alamat Email Salah"
        }
        if(!phone){
        errors.phone = "Phone is Required"
        }
        if(phone.length != 11 && phone.length !=12 ){
        errors.phone = "Incorrect phone number"
        }
        if(!address){
        errors.address = "Address is Required"
        }
        return errors
    }

    return (
        <Container textAlign="left"
            style={{alignItems:"center"}}>
            <Form size="tiny" action="#" onSubmit={handleSubmit} style={{gravity:"center"}}>
              <Grid centered>
                <Grid.Column width = {6}>
                  <Grid.Row>
                    <Form.Input 
                      label="ID"
                      placeholder ="Your Customer ID"
                      name="custid"
                      autoFocus
                      value = {custid}
                      onChange={handleChange}
                      // readOnly
                    />
                  </Grid.Row>
                  <Grid.Row>
                    <Form.Input 
                      error = {
                        errors.firstname ? {content:"Please enter your firstname"} : null
                      }
                      label="First Name*"
                      placeholder ="First Name"
                      name="firstname"
                      value = {firstname}
                      onChange={handleChange}
                      style={{marginBottom:"5px"}}
                    />
                  </Grid.Row>
                  <Grid.Row>
                    <Form.Input 
                      error = {
                      errors.lastname ? {content:"Please enter your lastname"} : null
                      }
                      label="Last Name*"
                      placeholder ="Last Name"
                      name="lastname"
                      value = {lastname}
                      onChange={handleChange}
                    />
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width = {6}>
                  <Grid.Row>
                    <Form.Input 
                      error = {
                      errors.email ? {content:errors.email} : null
                      }
                      label="Email*"
                      placeholder ="Email"
                      name="email"
                      value = {email}
                      onChange={handleChange}
                      style={{marginBottom:"5px"}}
                    />
                  </Grid.Row>
                  <Grid.Row>
                    <Form.Input 
                      error = {
                      errors.phone ? {content:errors.phone} : null
                      }
                      label="Phone*"
                      placeholder ="Phone"
                      name="phone"
                      type="tel"
                      value = {phone}
                      onChange={handleChange}
                      style={{marginBottom:"5px"}}
                    />
                  </Grid.Row>
                  <Grid.Row>
                    <Form.Input 
                      error = {
                      errors.address ? {content:"Please enter your address"} : null
                      }
                      label="Address*"
                      placeholder ="Address"
                      name="address"
                      value = {address}
                      onChange={handleChange}
                    />
                  </Grid.Row>
                </Grid.Column>
              </Grid>
              <Grid centered>
                <Grid.Row>
                  <Grid.Column width = {2}>
                    <Button
                      type ="submit"
                      primary
                      positive
                      style={{marginBottom:"20px"}}
                    > {isUpdate ? "UPDATE" : "SUBMIT"} </Button>
                  </Grid.Column>
                  <div>
                    {isUpdate ? (
                      <Grid.Column>
                        <Button
                          type ="submit"
                          primary
                          negative
                          style={{marginBottom:"20px"}}
                          onClick={handleCancel}
                        > CANCEL </Button>
                      </Grid.Column>
                      
                    ): null}
                  </div>
                </Grid.Row>
              </Grid>
            </Form>
          </Container>
          
    )
};

export default FormAtas;