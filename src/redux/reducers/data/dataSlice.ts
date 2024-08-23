import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dataChanged: false,
    tableData: [],
    tableColumns: [],
    informTableHeaders: [],
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
        },
        setInformTableHeaders: (state, action) => {
            state.informTableHeaders = action.payload;
        },
    },
    extraReducers: {},
});

export const { changeData, setData, setColumns, setInformTableHeaders } =
    dataSlice.actions;
export default dataSlice.reducer;
