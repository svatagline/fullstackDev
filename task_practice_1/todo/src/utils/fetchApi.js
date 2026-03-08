import axios from "axios"
export const fetchApi = async ({ endpoint = "", method = 'GET', data }) => {
    try {
        const options = {
            method,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token") ?? ""
            },
            data: data,
            url: "http://localhost:5000/api/" + endpoint,
        };
        const response = await axios(options);
        return response
    } catch (error) {
        alert("Error:", error?.message)
        console.log("Error in fetch api: ", error)
        return {}
    }

}