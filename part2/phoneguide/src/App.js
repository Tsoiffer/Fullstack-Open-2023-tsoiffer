import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [toFilter, setfilter] = useState("");

	useEffect(() => {
		console.log("effect");
		axios.get("http://localhost:3001/persons").then((response) => {
			console.log("promise fulfilled");
			setPersons(response.data);
		});
	}, []);

	const addPerson = (event) => {
		event.preventDefault();
		setPersons(persons.concat({ name: newName, number: newNumber }));
		setNewName("");
		setNewNumber("");
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
			<Persons persons={persons} toFilter={toFilter} />
		</div>
	);
};

export default App;
