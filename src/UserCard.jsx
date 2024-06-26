import React, { useState, useContext } from "react";
import AppContext from "./AppContext";
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, List, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import yodlrApi from "./yodlrApi";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Loader from "./Loader";

const UserCard = (data) => {
    const { updateAlertMsg } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(data.user)
    const INITIAL_STATE = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        state: user.state
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const location = useLocation();
    const path = location.pathname.substring(1).split('/');
    const navigate = useNavigate();

    const toggleDialog = () => {
        setIsOpen(!isOpen);
    }

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    }

    const handleDelete = async (id) => {
        const resp = await yodlrApi.deleteUser(id);
        if (resp.status === 204) {
            updateAlertMsg({
                type: "success",
                text: `User account for ${user.firstName} ${user.lastName} has been deleted.`
            });
        } else {
            updateAlertMsg({
                type: "warning",
                text: "There was an API error, the user was not deleted."
            });
        }
        toggleDialog()
        if (path[0] === "user") {
            navigate('/')
        }
    }

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    const handleSubmit = async evt => {
        evt.preventDefault();
        setIsLoading(true)
        const resp = await yodlrApi.updateUser(user.id, formData);
        if (resp.status !== 200) {
            setIsEdit(false)
            setIsLoading(false)
            updateAlertMsg({
                type: "warning",
                text: "There was an API error, the user was not deleted."
            });
        } else {
            const resp = await yodlrApi.getUser(user.id)
            setUser(resp.data)
            setIsLoading(false)
            setFormData(INITIAL_STATE)
            setIsEdit(false)
        }

    }

    if (isLoading) {
        return (
            <Loader />
        )
    } else {
        return (
            <>
                <Card sx={{ maxWidth: 350 }}>
                    <CardMedia
                        component='img'
                        height='175'
                        image='/src/assets/profile-placeholder.png'
                        alt='Profile image'
                    />
                    <CardContent>
                        <List
                            sx={{
                                width: '90%',
                                maxWidth: 325,
                                bgcolor: 'background.paper'
                            }}
                        >
                            {Object.entries(user).map(([key, value]) => (
                                isEdit ?
                                    key === "id" || key === "state" ?
                                        <Typography
                                            key={value}
                                            sx={{
                                                fontSize: 12,
                                                margin: '2px'
                                            }}
                                        >
                                            {key.toLowerCase()}: {value}
                                        </Typography>
                                        :
                                        <TextField
                                            sx={{ size: "small", m: 1 }}
                                            key={value}
                                            label={key}
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleChange}

                                        />
                                    :
                                    <Typography
                                        key={value}
                                        sx={{
                                            fontSize: 12,
                                            margin: '2px'
                                        }}
                                    >
                                        {key.toLowerCase()}: {value}
                                    </Typography>

                            ))}


                        </List>
                        <Box
                            sx={{
                                maxWidth: 325,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: "space-between"
                            }}
                        >
                            {isEdit ?
                                <>
                                    <Button onClick={toggleEdit} sx={{ color: "red" }}>Cancel</Button>
                                    <Button onClick={handleSubmit} sx={{ color: "green" }}>Save</Button>
                                </>
                                :
                                <>
                                    <IconButton onClick={toggleEdit}><ModeEditIcon sx={{ color: 'green' }} /></IconButton>
                                    <IconButton onClick={toggleDialog}><DeleteForeverIcon sx={{ color: 'red' }} /></IconButton>
                                </>
                            }

                        </Box>
                    </CardContent>
                </Card>
                <Dialog
                    open={isOpen}
                    onClose={toggleDialog}
                >
                    <DialogTitle>
                        Warning!
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={toggleDialog} color="primary">
                            No
                        </Button>
                        <Button onClick={() => handleDelete(data.user.id)} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>

                </Dialog>
            </>
        )
    }

}

export default UserCard;
