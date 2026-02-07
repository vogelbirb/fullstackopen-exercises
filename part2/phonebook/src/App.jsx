import { useEffect, useState } from "react";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import Notification from "./components/Notification.jsx";
import personsService from "./services/persons.js";

const newPersonDefault = { name: "", number: "" }

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState(newPersonDefault);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(null);

  const displayNotification = (message, isError, millis) => {
    // FIXME: add useEffect or something to make new messages work, or maybe a queue
    setMessage(message);
    setIsError(isError === undefined ? false : isError);

    if (millis === null) {
      return;
    }

    setTimeout(() => {
      setMessage(null);
      setIsError(null);
    }, millis === undefined ? 5000 : millis);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name == newPerson.name);

    if (existingPerson) {
      if (!confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        return;
      }

      const personObject = { ...existingPerson, number: newPerson.number };
      personsService.update(existingPerson.id, personObject).then(returnedPerson => {
        setPersons(persons.map(person => person.id === personObject.id ? returnedPerson : person))
        displayNotification(`Updated ${personObject.name}`);
      }).catch(() => {
        setPersons(persons.filter(person => person.id !== personObject.id));
        displayNotification(`Information of ${personObject.name} has already been removed from server`, true);
      });
      return;
    }

    const personObject = { name: newPerson.name, number: newPerson.number };
    personsService.create(personObject).then(
      returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewPerson(newPersonDefault);
      }).catch(() => {
        displayNotification(`Error adding ${personObject.name} to the server`, true);
      });
    displayNotification(`Added ${personObject.name}`);
  }

  const deletePerson = (id) => {
    const personObject = persons.find(person => person.id === id);
    if (!window.confirm(`Delete ${personObject.name}?`)) {
      return;
    }
    personsService.deleteOne(id).then(() => {
      setPersons(persons.filter(person => person.id !== id));
    }).catch(() => {
      setPersons(persons.filter(person => person.id !== id));
      displayNotification(`${personObject.name} was already deleted from the server`, true);
    });
  }

  const handleNameChange = (event) => {
    setNewPerson({ ...newPerson, name: event.target.value, });
  };

  const handleNumberChange = (event) => {
    setNewPerson({ ...newPerson, number: event.target.value, });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };


  useEffect(() => {
    personsService
      .getAll()
      .then(persons => { setPersons(persons) })
      .catch(() => displayNotification(`Error loadings persons from the server`, true, null))
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a New Person</h3>
      <PersonForm onSubmit={addPerson} person={newPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} onDelete={deletePerson} />
    </div>
  );
}

export default App;
