import { Part } from "./Part";
console.log("content");
const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises}></Part>
    ))}
  </div>
);

export default Content;
