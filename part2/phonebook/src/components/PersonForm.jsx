
const PersonForm = ({ onSubmit, person: { name, number }, onNameChange, onNumberChange }) =>
  <form onSubmit={onSubmit}>
    <div>
      Name: <input required value={name} onChange={onNameChange} />
    </div>
    <div>
      Number: <input required value={number} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>;

export default PersonForm;
