import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {ordered, restocked} from './cakeSlice'

export const CakeView = () => {
    const numberOfCakes = useSelector((state) => state.cake.numOfCakes)
    const dispatch = useDispatch()
    return (
        <div>
            <h1>Number of cakes - {numberOfCakes} </h1>
            <button onClick={() => dispatch(ordered())}>Order cakes - </button>
            <button onClick={() => dispatch(restocked(20))}>Restock cakes - </button>
        </div>
    )
}