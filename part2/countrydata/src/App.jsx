import {useState, useEffect} from 'react'
import countryService from './services/countries.js'


const Form = ({val, handleCountryChange}) => {

    return (
        <div>
            find countries <input value={val} onChange={handleCountryChange}></input>
        </div>
    )
}

const CountryList = ({countries, filter, currentCountry, setCurrentCountry, handleShowCountry}) => {
    const countryNames = countries.map((country) => {
        return country.name.common
    })

    const matchingCountries = countryNames.filter((val) => {
        return val.toLowerCase().includes(filter.toLowerCase())
    })

    if (matchingCountries.length > 10) { // too many countries

        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else if (matchingCountries.length <= 10 && matchingCountries.length > 1) { // show all the countries

        return (
            <div>
                {matchingCountries.map((country) => {
                    return <Country key={country} name={country} handleShowCountry={(id) => handleShowCountry(id)}/>
                })}
            </div>
        )
    } else if (matchingCountries.length === 1) { // show data about the specific country

        return (
            <div>
                <CountryInfo name={matchingCountries[0]} currentCountry={currentCountry}
                             setCurrentCountry={setCurrentCountry}/>
            </div>
        )
    } else {

        return (
            <div>
                <p>Couldn't find any countries matching the filter</p>
            </div>
        )
    }
}

const Country = ({name, handleShowCountry}) => {

    return (
        <div>
        {name} <button onClick={() => handleShowCountry(name)}>show</button>
        </div>
    )
}

const CountryInfo = ({name, currentCountry, setCurrentCountry}) => {
    useEffect(() => {
        countryService.getSpecific(name)
            .then(response => {
                setCurrentCountry(response.data)
            })
    }, [])
    if (!currentCountry) {
        return null
    }

    return (
        <div>
            <h1>{currentCountry.name.common}</h1>
            <p>Capital: {currentCountry.capital}</p>
            <p>Area: {currentCountry.area}</p>
            <h3>Languages</h3>
            {Object.values(currentCountry.languages).map((language) => {

                return <li key={language}>{language}</li>
            })}
            <img src={currentCountry.flags.png} alt={currentCountry.flags.alt}/>
        </div>

)
}

function App() {
    const [newFilter, setNewFilter] = useState('')
    const [countries, setCountries] = useState(null)
    const [currentCountry, setCurrentCountry] = useState(null)

    useEffect(() => {
        console.log('effect')
        countryService.getAll()
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])

    const handleShowCountry = (id) => {
        setNewFilter(id)
    }
    const handleCountryChange = (event) => {
        setNewFilter(event.target.value)

    }
    if (!countries) {
        return null
    }
    return (<div>
            <Form val={newFilter} handleCountryChange={handleCountryChange}/>
            <CountryList countries={countries} filter={newFilter} currentCountry={currentCountry}
                         setCurrentCountry={setCurrentCountry} handleShowCountry={(id) => handleShowCountry(id)}/>
        </div>
    )
}

export default App
