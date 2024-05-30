import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ])
    const [newName, setNewName] = useState('')
    const handleChange = (event) => {

        setNewName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName
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
            setPersons(persons.concat({name: newName}))
            setNewName('')
        }
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => {
                return <p key={person.name}>{person.name}</p>
            })}
        </div>
    )
}

export default App