import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [toFilter, setfilter] = useState("");

  useEffect(() => {
    console.log("effect");
    personsService.getAll().then((initialNotes) => {
      console.log("promise fulfilled");
      setPersons(initialNotes);
    });
  }, []);

  const handlerUpdate = (changePerson) => {
    if (
      window.confirm(
        `${changePerson.name} is already added to phonebook, replace the old namber with a new one`
      )
    ) {
      const personUpdated = {
        ...persons.find((person) => person.name === changePerson.name),
        number: changePerson.number,
      };
      personsService
        .updatePerson(personUpdated.id, personUpdated)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== response.id ? person : response
            )
          );
        });
    }
  };
  const addPerson = (event) => {
    const newPerson = { name: newName, number: newNumber };
    event.preventDefault();
    persons.some((person) => person.name === newPerson.name)
      ? handlerUpdate(newPerson)
      : personsService.createPerson(newPerson).then((response) => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewNumber("");
        });
  };
  const deletePerson = (id) => {
    if (window.confirm("Do you really want delete the user?")) {
      personsService.deletePerson(id).then((response) => {
        console.log("vamos a Refrezcar la lista");
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setfilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        toFilter={toFilter}
        handleFilterChange={handleFilterChange}
      ></Filter>
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        toFilter={toFilter}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
