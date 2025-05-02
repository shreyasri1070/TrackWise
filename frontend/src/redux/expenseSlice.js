import { createSlice } from "@reduxjs/toolkit";


const expenseSlice=createSlice({

    name:'expense',
    initialState:{
        loading:false,
        expense:[],
        category:"",
        markAsDone:"",
        singleExpense:null

    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        setExpense:(state,action)=>{
            state.expense=action.payload
        },
        setCategory:(state,action)=>{
            state.category=action.payload
        },
        setMarkAsDone:(state,action)=>{
            state.markAsDone=action.payload
        },
        setSingleExpense:(state,action)=>{
            state.singleExpense=action.payload
        }

    }

});

export const {
    setExpense,setLoading,setMarkAsDone,setCategory,setSingleExpense
}=expenseSlice.actions
export default expenseSlice.reducer;