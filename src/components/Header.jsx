import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import sun from "../icons/sun.svg"
import moon from "../icons/moon.svg"
import { toggleTheme } from "../slices/mySlice"

export default function Header() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.myState)
    return (
        <div className={'header-container ' + state.theme}>

            <div className="header">

                <div className="left">
                    <h2 style={{ cursor: "Pointer" }} onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    }}>Where in the world?</h2>
                </div>

                <div className="right">
                    <img style={{ cursor: "Pointer" }} onClick={() => dispatch(toggleTheme())} src={state.theme === "light" ? sun : moon} alt="" />
                </div>

            </div>
        </div>
    )
}
