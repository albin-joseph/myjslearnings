import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {ordered, restocked} from './icecreamSlice'

export const IcecreamView = () => {
    const numberOfIcecreams = useSelector((state) => state.icecream.numOfIcecream)
    const dispatch = useDispatch()
    return (
        <div>
            <h1>Number of icecreamss - {numberOfIcecreams} </h1>
            <button onClick={() => dispatch(ordered())}>Order icecreamss - </button>
            <button onClick={() => dispatch(restocked(10))}>Restock icecreamss - </button>
        </div>
    )
}