import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dataChanged: false,
    tableData: [],
    tableColumns: [],
};

const dataSlice = createSlice({
    name: 'tablesdata',
    initialState: initialState,
    reducers: {
        changeData: (state) => {
            state.dataChanged = !state.dataChanged;
        },
	setData: (state, action) => {
	    state.tableData = action.payload;
	},
	setColumns: (state, action) => {
	    state.tableColumns = action.payload;
	}
    },
    extraReducers: {},
});

export const { changeData, setData, setColumns } = dataSlice.actions;
export default dataSlice.reducer;
