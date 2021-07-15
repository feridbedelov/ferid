import './index.css';

export const QuestionCard = ({ question, onSelectChoice, userAnswers }) => {
  const { text, choices } = question;

  const isSelected = (answerId) => {
    const userHistory = [...userAnswers.answers];

    const selectedQuestion = userHistory.find(
      (answer) => answer?.questionId === question.id,
    );

    if (selectedQuestion) {
      return selectedQuestion.selectedChoiceIds.includes(answerId);
    } else {
      return false;
    }
  };

  const onSelect = (e, answerId) => {
    const userHistory = [...userAnswers.answers];
    const currentQuestionId = question.id;

    const updatedHistory = userHistory.map((answer) => {
      if (answer?.questionId === currentQuestionId) {
        if (isSelected(answerId)) {
          const updatedAnswerIndex = answer.selectedChoiceIds.indexOf(answerId);
          answer.selectedChoiceIds.splice(updatedAnswerIndex, 1);
        } else {
          if (question.hasMultiSelect) {
            answer.selectedChoiceIds = [...answer.selectedChoiceIds, answerId];
          } else {
            answer.selectedChoiceIds = [answerId];
          }

          answer.selectedChoiceIds.push(answerId);
        }
      }
      return answer;
    });

    onSelectChoice((prev) => ({
      ...prev,
      answers: updatedHistory,
    }));
  };

  return (
    <div className='question-card my-4'>
      <div className='question-title'>{text}</div>
      <div className='question-answers my-2'>
        {choices.map((answer) => {
          return (
            <div key={answer.id} className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                checked={isSelected(answer.id)}
                id={`checbox-${answer.id}`}
                onChange={(e) => onSelect(e, answer.id)}
              />
              <label
                className='form-check-label'
                htmlFor={`checbox-${answer.id}`}
              >
                {answer.text}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
