import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import AppContext from './AppContext';
import yodlrApi from "./yodlrApi";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material";


const Register = () => {
    const { updateAlertMsg, updateAppData } = useContext(AppContext)

    const INITIAL_STATE = {
        email: "",
        firstName: "",
        lastName: ""
    }

    const [formData, setFormData] = useState(INITIAL_STATE)
    const [submit, setSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        setSubmit(true)
        setIsLoading(true)
    }

    useEffect(() => {
        async function createUser() {
            const userData = await yodlrApi.register(formData)
            if (userData.status === 200) {
                updateAlertMsg({
                    type: "success",
                    text: `The user account for ${userData.data.firstName} ${userData.data.lastName} has been created.`
                });
            } else {
                updateAlertMsg({
                    type: "warning",
                    text: `${userData.data}`
                })
            }
            setFormData(INITIAL_STATE)
            setIsLoading(false)
            updateAppData("newUser", userData.data);

            navigate(`/user/${userData.data.id}`)


        }
        if (submit) createUser();

    }, [submit])

    if (isLoading) {
        return (
            <>
                <Loader />
            </>
        )
    } else {
        return (
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    border: '2px solid grey',
                    borderRadius: '5px',
                    p: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    height: '75vh',
                    boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                width="40%"
            >
                <Box sx={{
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <Typography>
                        <h1>Welcome to Yodlr!</h1>
                        Please complete the form below to register.
                    </Typography>

                </Box>
                <div>
                    <TextField
                        sx={{ m: 1, width: '40ch' }}
                        required
                        id="outlined-firstName"
                        label="First name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                        sx={{ m: 1, width: '40ch' }}
                        required
                        id="outlined-lastName"
                        label="Last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                        sx={{ m: 1, width: '40ch' }}
                        required
                        type="email"
                        id="outlined-email"
                        label="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                >Register</Button>

            </Box>
        )
    }



}

export default Register;