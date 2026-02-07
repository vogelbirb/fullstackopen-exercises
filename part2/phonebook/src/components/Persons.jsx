const Person = ({ person: { name, number }, onDelete }) => <li>{name} {number} <button onClick={onDelete}>Delete</button></li>;

const Persons = ({ persons, filter, onDelete }) => {
  const personsToShow = filter.length > 0 ? persons.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase())) : persons;

  return <ul>
    {personsToShow.map(person => <Person key={person.id} person={person} onDelete={() => onDelete(person.id)} />)}
  </ul>
};

export default Persons;
