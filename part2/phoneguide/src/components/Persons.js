import Person from "./Person";
const Persons = ({ persons, toFilter }) => {
  const personsFilter = persons.filter((person) =>
    person.name.toLowerCase().includes(toFilter.toLowerCase())
  );
  const personsShow = toFilter === "" ? persons : personsFilter;
  return (
    <>
      {personsShow.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
        ></Person>
      ))}
    </>
  );
};

export default Persons;
