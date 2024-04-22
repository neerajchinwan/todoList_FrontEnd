import { useEffect, useState } from 'react';
import { fetchCreateTaskAsync } from '../taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectTask, fetchEditTaskAsync } from '../taskSlice';

function AddTaskForm() {
    const dispatch = useDispatch();
    const [editTaskFlag, setEditTaskFlag] = useState(false);
    const task = useSelector(selectTask);
    
    const [formData, setFormData] = useState({
        title: '',
        status: '',
        description: '',
        finishedBy: ''
    });

    useEffect(() => {
        if(task._id){
            setEditTaskFlag(true)
            setFormData({
                title: task.title,
                status: task.status,
                description: task.description,
                finishedBy: task.finishedBy.split('T')[0]
            })
        }
    }, [task])


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const apiCall = async () => {
        try{
            if(!editTaskFlag){

            const response = await dispatch(fetchCreateTaskAsync(formData));
                if(response.payload.status === 'success'){
                    setFormData({
                        title: '',
                        status: '',
                        description: '',
                        finishedBy: ''
                    })
                }
            }else{
                setEditTaskFlag(false)
                const response = await dispatch(fetchEditTaskAsync({id:task._id, formData}));
                if(response.payload.status === 'success'){
                    setFormData({
                        title: '',
                        status: '',
                        description: '',
                        finishedBy: ''
                    })
                }
            }
            
        }catch(error){
            console.log(error)
        }
            
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        apiCall();
    }



    return (
        <div style={{ padding: '20px', marginTop: '40px' }}>
            <form
            onSubmit={handleSubmit}
            style={{ padding: '20px', border: '1px solid #cdcdcd', borderRadius: '5px', boxShadow: '1px 1px 10px 5px rgba(0,0,0,0.1)' }}
            >
                <h1 className='fs-3 text-center mb-3'>Add Task</h1>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        placeholder="title"
                        value = {formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                        Status
                    </label>
                    <select 
                    className="form-select" 
                    aria-label="Select Status" 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    >
                        <option defaultValue=''>Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        placeholder="description"
                        value = {formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="finishedBy" className="form-label">
                        Finished By
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="finishedBy"
                        name="finishedBy"
                        value={formData.finishedBy}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddTaskForm;

