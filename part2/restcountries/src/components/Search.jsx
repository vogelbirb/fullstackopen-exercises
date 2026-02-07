const Filter = ({ value, onChange }) => <nav>
  Find Countries
  <input type="text" value={value} onChange={onChange} />
</nav>;

export default Filter;
