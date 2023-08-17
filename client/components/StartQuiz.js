import React, { useState } from 'react';
import io from 'socket.io-client';

const StartQuiz = () => {
  const [socket] = useState(io.connect('http://localhost:3000')); // Replace with your server URL
  const [sessionId] = useState('some-session-id'); // Replace with your session management logic

  const startQuiz = () => {
    socket.emit('startQuiz', sessionId);
  };

  return (
    <div className="start-quiz">
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
};

export default StartQuiz;
