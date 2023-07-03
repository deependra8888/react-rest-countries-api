import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setCountry } from '../slices/mySlice';


export default function Details() {
    let navigate = useNavigate()
    const state = useSelector(state => state.myState);
    const dispatch = useDispatch();
    let { name } = useParams();

    //variables

    const [commonName, setcommonName] = useState('');
    const [officialName, setofficialName] = useState('')
    const [population, setpopulation] = useState('')
    const [region, setregion] = useState('')
    const [subregion, setsubregion] = useState('')
    const [capital, setcapital] = useState([]);
    const [timezone, settimezone] = useState([])
    const [currencies, setcurrencies] = useState([])
    const [languages, setlanguages] = useState([])
    const [flagurl, setflagurl] = useState('')

    useEffect(() => {
        for (let country of state.countries)
            // eslint-disable-next-line
            if (country.name.official == name) {
                dispatch(setCountry(country));
                console.log(state.country)
                setcommonName(state.country.name.common);
                setofficialName(state.country.name.official)
                setpopulation(state.country.population)
                setregion(state.country.region)
                setsubregion(state.country.subregion)
                setcapital(state.country.capital)
                settimezone(state.country.timezones)
            }



        //get languages
        let languagesArr = [];
        if (state.country.languages) {
            let languagesEntries = Object.entries(state.country.languages)
            for (let array of languagesEntries) {
                languagesArr.push(array[1]);
                languagesArr.push(" ")
            }
            setlanguages(languagesArr)
        }

        //get currencies
        let currenciesArr = [];
        if (state.country.currencies) {
            let currenciesEntries = Object.entries(state.country.currencies);
            for (let array of currenciesEntries) {
                currenciesArr.push(array[1].name);
                currenciesArr.push(" ");
                currenciesArr.push(array[1].symbol);
            }
            setcurrencies(currenciesArr)
        }

        if (state.country.flags.png) {
            setflagurl(state.country.flags.png)
        }
        // eslint-disable-next-line
    }, [state.country])


    return (
        <div className={'details-container ' + state.theme}>

            <div className="details">

                <div className="actions">
                    <button onClick={() => {
                        navigate("/")
                    }} className="back-button"> ◄ Back</button>
                </div>

                <div className="details-info-container">

                    <img className='details-flag' src={flagurl} alt="" />

                    <div className="details-info">
                        <h2>{commonName}</h2>

                        <div className="details-inner-info">
                            <div className="details-main-info">
                                <p className="d-info">Official Name : <span className='d-info-value'>{officialName}</span></p>
                                <p className="d-info">Population : <span className='d-info-value'>{population}</span></p>
                                <p className="d-info">Region : <span className='d-info-value'>{region}</span></p>
                                <p className="d-info">Sub Region : <span className='d-info-value'>{subregion}</span></p>
                                <p className="d-info">Capital : <span className='d-info-value'>{capital}</span></p>
                            </div>

                            <div className="details-sub-info">
                                <p className="d-info">Timezone : <span className='d-info-value'>{timezone}</span></p>
                                <p className="d-info">Currencies : <span className='d-info-value'>{currencies}</span></p>
                                <p className="d-info">Languages : <span className='d-info-value'>{languages}</span></p>
                            </div>
                        </div>


                    </div>

                </div>
            </div>

        </div>
    )
}

