import { createSlice } from "@reduxjs/toolkit";
let initialState = {};
if (localStorage.getItem("rest-countries-state") === null) {
    initialState = {
        theme: "light", countries: [], country: {
            "name": { "common": "Germany", "official": "Federal Republic of Germany" },
            "population": 83240525,
            "region": "Europe",
            "subregion": "Western Europe",
            "capital": ["Berlin"],
            "timezones": ["UTC+01:00"],
            "flags": {
                "png": "https://flagcdn.com/w320/de.png",
                "svg": "https://flagcdn.com/de.svg"
            },
            "languages": { "deu": "German" },
            "currencies": {
                "EUR": {
                    "name": "Euro",
                    "symbol": "€"
                }
            },
        }
    };
} else {
    initialState = JSON.parse(localStorage.getItem("rest-countries-state"))
}



const mySlice = createSlice({
    name: "mySlice",
    initialState: initialState,
    reducers: {
        toggleTheme: (state, action) => {
            if (state.theme === "light") {
                state.theme = "dark"
            } else state.theme = "light";
        },
        setCountries: (state, action) => {
            state.countries = action.payload
        },
        setCountry: (state, action) => {
            state.country = action.payload
        }
    }

})


export const { toggleTheme, setCountries, setCountry } = mySlice.actions;
export default mySlice.reducer;