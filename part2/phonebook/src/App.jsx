import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', phone:'00-494'}
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
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
            phone: newPhone
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
                return <p key={person.name}>{person.name} {person.phone}</p>
            })}
        </div>
    )
}

export default App