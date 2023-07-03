import React from 'react'

export default function Card(props) {
    let obj = props.obj
    return (
        <div className='card'>
            <img src={obj.flags.png} alt="" />
            <div className="info">
                <p className="name">{obj.name.common}</p>
                <p className="population">Population : <span className='inner-info'>{obj.population}</span></p>
                <p className="region">Region : <span className='inner-info'>{obj.region}</span></p>
                <p className="capital">Capital : <span className='inner-info'>{obj.capital}</span></p>
            </div>

        </div>
    )
}
