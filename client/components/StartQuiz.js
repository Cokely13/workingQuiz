import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const StartQuiz = () => {
  const [socket, setSocket] = useState(null);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const newSocket = io.connect('http://localhost:3000');
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.on('sessionCreated', (newSessionId) => {
        setSessionId(newSessionId);
      });
    }
  }, [socket]);

  const createSession = () => {
    const newSessionId = uuidv4();
    socket.emit('createSession', newSessionId);
  };

  const startQuiz = () => {
    socket.emit('startQuiz', sessionId);
  };

  return (
    <div className="start-quiz">
      <button onClick={createSession}>Create Quiz Session</button>
      {sessionId && (
        <>
          <p>Session ID: {sessionId}</p>
          <button onClick={startQuiz}>Start Quiz</button>
        </>
      )}
    </div>
  );
};

export default StartQuiz;
