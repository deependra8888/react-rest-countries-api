import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCountries } from '../slices/mySlice';
import Card from './Card';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Main() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.myState)
    const [showFilters, setshowFilters] = useState(false);
    const [filteredList, setfilteredList] = useState([])

    useEffect(() => {
        if (state.countries.length === 0) {
            fetch(`https://restcountries.com/v3.1/all`)
                .then(res => res.json())
                .then(data => {
                    dispatch(setCountries(data));
                    setfilteredList(data.slice(0, 20))
                })
        } else {
            setfilteredList(state.countries.slice(0, 20))
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        localStorage.setItem("rest-countries-state", JSON.stringify(state))
    }, [state])

    function filter(region) {
        setfilteredList([])
        let filteredArr = [];
        for (let country of state.countries) {
            // eslint-disable-next-line
            if (country.region == region) {
                filteredArr.push(country)
            }
        }
        setfilteredList(filteredArr)
        setshowFilters(false)
    }

    function search(name) {
        setfilteredList([])
        let filteredArr = [];
        for (let country of state.countries) {
            // eslint-disable-next-line
            if (country.name.common.toLowerCase() == name.toLowerCase() || country.name.common.toLowerCase().includes(name.toLowerCase()) || country.name.official.toLowerCase() == name.toLowerCase() || country.name.official.toLowerCase().includes(name.toLowerCase())) {
                filteredArr.push(country)
            }
        }
        setfilteredList(filteredArr)
        setshowFilters(false)
    }

    console.log(state)
    return (
        <div className={'main-container ' + state.theme}>
            <div className="main">

                <div className="actions">
                    <input onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            search(e.target.value);
                            e.target.value = "";
                        }
                    }} type="text" className="search" placeholder='Search' />

                    <div className="filter-container">
                        <button onClick={() => {
                            setshowFilters(!showFilters)
                        }} className="filter-button">Filter by Region <span style={{ transform: showFilters === true ? "rotate(180deg)" : "rotate(0deg)", transition: "0.5s" }}>▼</span></button>

                        <div style={{ display: showFilters === true ? "flex" : "none" }} className="filter" onMouseLeave={()=>{
                            setshowFilters(false)
                        }}>
                            <p onClick={() => filter("Africa")} className="filter-link">Africa</p>
                            <p onClick={() => filter("Americas")} className="filter-link">America</p>
                            <p onClick={() => filter("Asia")} className="filter-link">Asia</p>
                            <p onClick={() => filter("Europe")} className="filter-link">Europe</p>
                            <p onClick={() => filter("Oceania")} className="filter-link">Oceania</p>
                        </div>

                    </div>

                </div>

                <div className="countries-container">
                    {filteredList.map(obj => {
                        return (
                            <Link key={obj.name.official} to={`/${obj.name.official}`}>
                                <Card key={obj.name.official} obj={obj} />
                            </Link>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}
