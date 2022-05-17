import { createSlice } from '@reduxjs/toolkit';

const initialState={};

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state=action.payload;
            return state;
        },
        updatePropos:(state,action)=>{
            const newState=action.payload;
            state={...newState}
            return state;
        },
        updateImg:(state,action)=>{
            const newState=action.payload;
            state={...newState}
            return state;
        },
        ajouteMusic:(state,action)=>{
            const newState=action.payload;
            state={...newState}
            return state;
        },
        deleteMusic:(state,action)=>{
            const newState=action.payload;
            state={...newState}
            return state;
        },
        UPDATEALL:(state,action)=>{
            const newState=action.payload;
            state={...newState}
            return state;
        }
    }
})

export const getAllUser=state=>state.user;
export const { addUser ,updatePropos,updateImg,ajouteMusic,deleteMusic ,UPDATEALL}=userSlice.actions;
export default userSlice.reducer;