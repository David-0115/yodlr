import React, { useState, useEffect, useContext } from "react";
import yodlrApi from './yodlrApi'
import AppContext from "./AppContext";
import AdminUserTable from "./AdminUserTable";
import Loader from "./Loader";
import { Box } from "@mui/material";


const Admin = () => {
    const [users, setUsers] = useState([]);
    const { updateAlertMsg } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getUserList() {
            try {
                const response = await yodlrApi.getUsers()
                setUsers(response.data)
            } catch (e) {
                updateAlertmsg({
                    type: "error",
                    text: `API error: ${e}`
                });
            }
            setIsLoading(false)
        };

        if (!users.length) {
            setIsLoading(true)
            getUserList();
        }
    }, [users]);

    const editUser = async (id, data) => {
        try {
            const response = await yodlrApi.updateUser(id, data)
            setUsers([])
        } catch (e) {
            updateAlertmsg({
                type: "error",
                text: `API error: ${e}`
            });
        }
    }

    const deleteUser = async (id) => {
        try {
            const response = await yodlrApi.deleteUser(id)
            setUsers([])
        } catch (e) {
            updateAlertmsg({
                type: "error",
                text: `API error: ${e}`
            });
        }
    }

    const updateUserState = async (id) => {
        try {
            const response = await yodlrApi.getUser(id)
            const state = response.data.state
            response.data.state = state === "pending" || state === "inactive" ? "active" : state === "active" ? "inactive" : "pending"
            const response2 = await yodlrApi.updateUser(id, response.data)
            setUsers([])
        } catch (e) {
            updateAlertMsg({
                type: "error",
                text: `API error: ${e}`
            });
        }
    }

    const userFunctions = {
        edit: editUser,
        delete: deleteUser,
        updateState: updateUserState
    }

    return (
        <>
            <h3>User Manager</h3>
            <Box
                sx={{ maxWidth: 800, maxHeight: 400, overflow: 'auto' }}
            >

                {isLoading || !users.length ? <Loader />
                    : <AdminUserTable users={users} userFns={userFunctions} />}
            </Box>
        </>

    )
}

export default Admin