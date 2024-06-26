import axois from './axios';

const baseUrl = "http://localhost:3000"

const useApi = async (path, method, data = null) => {

    console.log(`${baseUrl}${path}`)
    try {
        const response = await axois({
            method: method,
            url: `${baseUrl}${path}`,
            data: data,
        })
        return response.data
    } catch (e) {
        console.error(`Error making ${method.toUpperCase()} request to ${url}`)
        console.error(e)
    }

}

export default useApi;