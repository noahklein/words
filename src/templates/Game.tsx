import React, { useState } from 'react';
import styled from 'styled-components';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  width: 100vw;
  height: 100vh;
`;

const Letters = styled.div`
  display: flex;
  gap: 1rem;
`;

const Letter = styled.div`
  background-color: aliceblue;
  padding: 1rem;

  &:hover {
    background-color: aqua;
  }
`;

const Input = styled.input`
  padding: 1rem;
  font-size: larger;
`;

const Game: React.FC = () => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  const [guess, setGuess] = useState<string>('');
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();

    const isAllowed = val.split('').every((c) => letters.includes(c));
    if (!isAllowed) {
      return;
    }

    setGuess(val);
  };

  return (
    <Page>
      <header>
        <h1>Words</h1>
      </header>
      <Letters>
        {letters.map((letter) => (
          <Letter key={letter}>{letter}</Letter>
        ))}
      </Letters>
      <div>
        <Input type="text" onChange={onInputChange} value={guess} />
      </div>
    </Page>
  );
};

export default Game;
