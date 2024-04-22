import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllTasks, fetchDeleteTask, fetchCreateTask, fetchEditTask } from './taskApi';
import Swal from 'sweetalert2';


const initialState = {
    tasks: [],
    status: 'idle',
    task: {}
}

export const fetchAllTasksAsync = createAsyncThunk(
    'task/fetchAllTasks', async () => {
        const response = await fetchAllTasks();

        return response.data
    }
)

export const fetchDeleteTaskAsync = createAsyncThunk(
    'task/fetchDeleteTask', async (id) => {
        const response = await fetchDeleteTask(id);
        if (response.status === 'success') {
            console.log('hello')
            Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success"
            });
        }
        return response.data;
    }
)

export const fetchCreateTaskAsync = createAsyncThunk(
    'task/fetchCreateTask', async(formData) => {
        const response = await fetchCreateTask(formData);
        return response.data;
    }
)

export const fetchEditTaskAsync = createAsyncThunk(
    'task/fetchEditTask', async({id, formData}) => {
        const response = await fetchEditTask({id, formData});
        return response.data;
    }
)


export const taskSlice = createSlice({  
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.task = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTasksAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllTasksAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.tasks = action.payload.data;
            })
            .addCase(fetchDeleteTaskAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDeleteTaskAsync.fulfilled, (state,action) => {
                state.status = 'success';
                const index = state.tasks.findIndex(task => task._id === action.payload.data._id );
                state.tasks.splice(index, 1);
            })
            .addCase(fetchCreateTaskAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCreateTaskAsync.fulfilled, (state,action) => {
                state.status = 'success';
                state.tasks.push(action.payload.data)
            })
            .addCase(fetchEditTaskAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEditTaskAsync.fulfilled, (state, action) => {
                state.status = 'success';
                const index = state.tasks.findIndex(task => task._id === action.payload.data._id);
                state.tasks.splice(index,1,action.payload.data)
            })
    }
})

export const { addTask } = taskSlice.actions

export const selectAllTasks = (state) => state.task.tasks;
export const selectTask = (state) => state.task.task;

export default taskSlice.reducer;