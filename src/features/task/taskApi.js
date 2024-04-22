import axios from 'axios';

export function fetchAllTasks() {
    return new Promise(async (resolve) => {
        const response = await axios.get('http://localhost:8000/api/v1/tasks/', {
            headers: {
            'Authorization': localStorage.getItem('authToken')
        }});
        const data = response.data
        resolve({ data })
    })
}

export function fetchDeleteTask(id) {
    return new Promise(async (resolve) => {
        const response = await axios.delete(`http://localhost:8000/api/v1/tasks/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('authToken')
            }
        });
        const data = response.data;
        resolve({ data })
    })
}

export function fetchCreateTask(formData) {
    return new Promise(async (resolve) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/tasks/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authToken')
                }
            });
            const data = response.data;
            resolve({ data })
        }catch(error){
            console.log(error)
        }
        
    })
}

export function fetchEditTask({id, formData}){
    return new Promise(async (resolve) => {
        try{
            const response = await axios.patch(`http://localhost:8000/api/v1/tasks/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authToken')
                }
            })
            const data = response.data;
            resolve({ data })
        }catch(error){
            console.log(error)
        }
    })
}