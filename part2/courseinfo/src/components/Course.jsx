import Header from "./Header";

const Content = ({ parts }) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>
);

const Part = ({ part: { name, exercises } }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ total }) => <p><b>Total of {total} exercises</b></p>;

const Course = ({ course: { name, parts } }) => (
  <>
    <Header text={name} level={2} />
    <Content parts={parts} />
    <Total
      total={
        parts.reduce((sum, { exercises }) =>
          sum + exercises
          , 0)
      }
    />
  </>
);

export default Course;
