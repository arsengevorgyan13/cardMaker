import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type DeleteDataState = {
    deleteData: boolean;
};

const initialState: DeleteDataState = {
    deleteData: false,
};

const deleteDataReducer = createSlice({
    name: 'deleteData',
    initialState,
    reducers: {
        setDeleteData: (state, action: PayloadAction<boolean>) => {
            state.deleteData = action.payload;
        },
        clearDeleteData: (state) => {
            state.deleteData = false;
        },
    },
});

export const {setDeleteData, clearDeleteData} = deleteDataReducer.actions;
export default deleteDataReducer.reducer;