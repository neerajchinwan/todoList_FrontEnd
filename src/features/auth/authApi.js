import axios from 'axios';

export function createUser(formData){
    return new Promise(async (resolve, reject) => {
        try{
            const response = await axios.post('http://localhost:8000/api/v1/users/create', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = response.data;
            resolve({ data });
        }catch(error){
            reject(error.response.data.error.errorResponse.errmsg)
        }
    })
}