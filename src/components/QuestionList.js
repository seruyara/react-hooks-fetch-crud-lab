import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => console.error(error));
  }, []);

  function addQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          const updatedQuestions = questions.filter(
            (question) => question.id !== id
          );
          setQuestions(updatedQuestions);
        }
      })
      .catch((error) => console.error(error));
  };
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions && questions.map((question) => (
          <QuestionItem key={question.id} question={question} onDelete={handleDelete}/>
        ))}
        <QuestionForm props={addQuestion} />
      </ul>
    </section>
  );
}

export default QuestionList;