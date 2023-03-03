const TotalExcercises = ({ parts }) => {
  const total = parts
    .map((part) => part.exercises)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  );
};
export default TotalExcercises;
