import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
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
            id: persons.length
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
            <div>filter show with <input value={newFilter} onChange={handleFilterChange}/></div>
            <h2>add a new</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>number: <input value={newPhone} onChange={handlePhoneChange}/></div>
                <div>
                    <button type="submit" onClick={handleSubmit}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => {
                if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
                    return <p key={person.id}>{person.name} {person.number}</p>
                }

            })}
        </div>
    )
}

export default App