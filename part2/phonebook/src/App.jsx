import { useState, useEffect } from 'react'
import axios from "axios";


const Filter = ({newFilter, handleFilterChange}) => {
    return (
        <div>filter show with <input value={newFilter} onChange={handleFilterChange}/></div>
    )
}

const PersonForm = ({newName, handleNameChange, newPhone, handlePhoneChange, handleSubmit}) => {
    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>number: <input value={newPhone} onChange={handlePhoneChange}/></div>
            <div>
                <button type="submit" onClick={handleSubmit}>add</button>
            </div>
        </form>
    )
}

const Persons = ({persons, newFilter}) => {
    return (
        <div>
            {persons.map((person) => {
                if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
                    return <Person key={person.id} name={person.name} number={person.number}/>
                }

            })}
        </div>
    )
}

const Person = ({name, number}) => {
    return (
        <p>{name} {number}</p>
    )
}
const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3}
    ])

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])
    console.log('render', persons.length, 'notes')

    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const handleFilterChange = (event) => {
        const newFilterVal = event.target.value
        setNewFilter(newFilterVal)


    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newPhone,
            id: persons.length + 1
        }
        let objExists = false
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].name === newPerson.name) {
                objExists = true
                break
            }
        }

        if (objExists) {
            alert(`${newPerson.name} is already added to phonebook`)
        } else {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewPhone('')
        }
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

            <h2>add a new</h2>
            <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange}
                        handlePhoneChange={handlePhoneChange} newName={newName} newPhone={newPhone}/>
            <h2>Numbers</h2>
            <Persons newFilter={newFilter} persons={persons}/>
        </div>
    )
}

export default App