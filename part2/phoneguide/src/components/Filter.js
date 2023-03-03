const Filter = ({ toFilter, handleFilterChange }) => {
  return (
    <div>
      filter show with: <input value={toFilter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
