import Header from "./Header";
import Content from "./Content";
import TotalExcercises from "./TotalExcercises";

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name}></Header>
      <Content parts={course.parts}></Content>
      <TotalExcercises parts={course.parts}></TotalExcercises>
    </>
  );
};

export default Course;
