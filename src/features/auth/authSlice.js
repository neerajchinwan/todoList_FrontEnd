import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { createUser } from './authApi';

const initialState = {
    user: [],
    status: 'idle'
}

export const createUserAsync = createAsyncThunk(
    'user/createUser', async (formData) => {
        try{
            const response = await createUser(formData);
            return response.data;
        }catch(error){
            return error
        }
        
    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = 'success';
                state.user = action.payload.data
            })
    }
})

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;