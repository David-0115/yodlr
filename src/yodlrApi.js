import axios from 'axios';
const baseUrl = "http://localhost:3000";

class yodlrApi {

    static async register(data) {
        try {
            const response = await axios.post(`${baseUrl}/users`, data);
            return {
                status: response.status,
                data: response.data
            };
        } catch (e) {
            return {
                status: response.status,
                data: response.message
            };
        }
    };

    static async getUsers() {
        try {
            const response = await axios.get(`${baseUrl}/users`);
            return {
                status: response.status,
                data: response.data
            };
        } catch (e) {
            return {
                status: response.status,
                data: response.message || e
            }
        };
    };

    static async getUser(id) {
        try {
            const response = await axios.get(`${baseUrl}/users/${id}`);
            return {
                status: response.status,
                data: response.data
            };
        } catch (e) {
            return {
                status: response.status,
                data: response.message || e
            }
        };
    };

    static async deleteUser(id) {
        try {
            const response = await axios.delete(`${baseUrl}/users/${id}`);
            return {
                status: response.status,
            };
        } catch (e) {
            return {
                status: response.status,
                data: response.message || e
            }
        };
    };

    static async updateUser(id, data) {
        if (!data.email || !data.firstName || !data.lastName || !data.state) {
            return {
                status: 400,
                data: "Invalid fields."
            };
        } else if (!id) {
            return {
                status: 400,
                data: "Invalid user id"
            };
        };
        try {
            console.log("Api - data:", data)
            const response = await axios.put(`${baseUrl}/users/${id}`, data);
            return {
                status: response.status,
                data: response.data
            };
        } catch (e) {
            return {
                status: response.status,
                data: response.message || e
            };
        }
    };
};

export default yodlrApi;