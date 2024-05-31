import {useState, useEffect} from 'react'
import axios from "axios";
import personsService from './services/persons.js';


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

const Persons = ({persons, newFilter, handleDelete}) => {
    return (
        <div>
            <ul>
                {persons.map((person) => {
                    if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
                        return <Person key={person.id} name={person.name} number={person.number}
                                       handleDelete={() => handleDelete(person.id)}/>
                    }

                })}
            </ul>
        </div>
    )
}

const Person = ({name, number, handleDelete}) => {
    return (
        <li>
            {name} {number}
            <button onClick={handleDelete}>Delete</button>

        </li>
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

    const handleDelete = (id) => {
        console.log(`deleting ${id}`)
        if (window.confirm("Delete " + persons.find(p => p.id === id).name + "?")) {
            personsService.remove(id)
                .then(response => {
                    setPersons(persons.filter((val) => {
                        return val.id !== response.data.id
                    }))
                })
        } else {
            console.log("Aborted deleting")
        }


    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newPhone,

        }
        let objExists = false
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].name === newPerson.name) {
                objExists = true
                break
            }
        }

        if (objExists) {
            const originalPerson = persons.find(person => newPerson.name === person.name)
            const updatedPerson = {...originalPerson, number: newPerson.number}

            if (window.confirm(`${updatedPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
                personsService.update(updatedPerson.id, updatedPerson)
                    .then(response => {
                        console.log("value was updated")
                        setPersons(persons.map((person) => {
                            return person.id !== response.data.id ? person : response.data
                        }))
                        setNewName('')
                        setNewPhone('')
                    })
            } else {
                console.log("Aborted update")
            }

        } else {
            personsService.create(newPerson)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewPhone('')
                })


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
            <Persons newFilter={newFilter} persons={persons} handleDelete={(id) => handleDelete(id)}/>
        </div>
    )
}

export default App