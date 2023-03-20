import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personsService from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [toFilter, setfilter] = useState("");
	const [notification, setNotification] = useState({
		message: null,
		type: null,
	});

	useEffect(() => {
		console.log("effect");
		personsService.getAll().then((initialNotes) => {
			console.log("promise fulfilled");
			setPersons(initialNotes);
		});
	}, []);

	const messageOperation = ({ message, type }) => {
		setNotification({
			message: message,
			type: type,
		});

		setTimeout(() => {
			setNotification({
				message: null,
				type: null,
			});
		}, 3000);
	};
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
					messageOperation({
						type: "success",
						message: `changed number of ${personUpdated.name}`,
					});
				})
				.catch((error) => {
					messageOperation({
						type: "error",
						message: `Information of ${personUpdated.name} has already been removed from server`,
					});
				});
		}
	};
	const addPerson = (event) => {
		const newPerson = { name: newName, number: newNumber };
		event.preventDefault();
		persons.some((person) => person.name === newPerson.name)
			? handlerUpdate(newPerson)
			: personsService
					.createPerson(newPerson)
					.then((response) => {
						setPersons(persons.concat(response));
						setNewName("");
						setNewNumber("");
						messageOperation({
							type: "success",
							message: `Added ${newPerson.name}`,
						});
					})
					.catch((error) => {
						const errorMessage = error.response.data.error;
						messageOperation({
							type: "error",
							message: errorMessage,
						});
					});
	};
	const deletePerson = (id) => {
		if (window.confirm("Do you really want delete the user?")) {
			personsService
				.deletePerson(id)
				.then((response) => {
					console.log("vamos a Refrezcar la lista");
					setPersons(persons.filter((person) => person.id !== id));
				})
				.catch((error) => {
					messageOperation({
						type: "error",
						message: `Information of ${
							persons.find((person) => person.id === id).name
						} has already been removed from server`,
					});
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
			<Notification message={notification.message} type={notification.type} />
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
