import { questions } from './mock/questions';
import './App.css';
import { useEffect, useState } from 'react';
import { QuestionCard } from './components/QuestionCard';

function App() {
  // const [questions, setQuestions] = useState([])
  // const [fetchQuestions, setFetchQuestions] = useState(true)
  // const [error, setError] = useState(null)

  const [userAnswers, setUserAnswers] = useState({
    userName: '',
    answers: [],
  });

  const [onSubmitLoading, setOnSubmitLoading] = useState(false);

  useEffect(() => {
    if (!questions) return;
    const answers = questions.map((qs) => {
      const questionObject = {
        questionId: qs.id,
        selectedChoiceIds: [],
      };
      return questionObject;
    });

    setUserAnswers((prev) => ({ ...prev, answers }));
  }, [questions]);

  const onUserNameChange = (e) => {
    setUserAnswers((prev) => ({ ...prev, userName: e.target.value }));
  };

  const canSubmit = () => {
    let valid = true;
    if (!userAnswers.userName.trim()) {
      valid = false;
    }
    userAnswers.answers.forEach((ans) => {
      if (!ans.selectedChoiceIds.length) {
        valid = false;
      }
    });
    return valid;
  };

  const onSubmit = async () => {
    if (!canSubmit()) {
      alert('You should fill in all blank fields');
      return;
    }

    setOnSubmitLoading(true);
    try {
      console.log(userAnswers);
    } catch (error) {
      console.log(error);
    } finally {
      setOnSubmitLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className='hero my-2'>
        <h1>React Questionary Application</h1>

        <div className='mb-3'>
          <label htmlFor='username-field' className='form-label'>
            Enter your user name
          </label>
          <input
            type='text'
            className='form-control'
            id='username-field'
            placeholder='Username'
            value={userAnswers.userName}
            onChange={onUserNameChange}
          />
        </div>
      </div>

      {questions.map((question) => {
        return (
          <QuestionCard
            key={question.id}
            question={question}
            onSelectChoice={setUserAnswers}
            userAnswers={userAnswers}
          />
        );
      })}

      <button
        className='btn btn-primary mb-3'
        onClick={onSubmit}
        disabled={onSubmitLoading}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
