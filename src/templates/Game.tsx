import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import * as animations from '../components/animations';
import { Button } from '../components/Button';
import * as dictionary from '../dictionary';
import { useKeyPress } from '../hooks/useKeyPress';
import { useMemoProfile } from '../hooks/useMemoProfile';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  width: auto;
  height: auto;
  margin: 0 2rem;
`;

const Letter = styled(Button)`
  font-size: larger;
  width: 3rem;
`;

const Letters = styled.div`
  display: flex;
  gap: 1rem;
`;

const InputWrapper = styled.div<{ $error: boolean }>`
  display: flex;
  justify-content: space-between;

  ${({ $error }) =>
    $error &&
    css`
      animation: ${animations.shake} 0.25s ease-in-out 0s;
      animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
    `}
`;

const Input = styled.input`
  padding: 1rem 2.5rem;
  font-size: larger;
  border: none;
  outline: none;
`;

const Word = styled.span<{ $hidden: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid var(--text-color);
  padding: 1rem;
  width: 8rem;
  height: 3rem;
  text-transform: uppercase;
  cursor: default;

  transition: all 0.5s;

  ${({ $hidden }) =>
    $hidden
      ? css`
          background-color: var(--text-color);
          content: none;
        `
      : css`
          animation: ${animations.bounce} 0.5s ease-in-out 0s;
        `}
`;

const EmptyWord = styled(Word)`
  background-color: var(--text-color);
`;

const Words = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const Score = styled.div``;

const Game: React.FC = () => {
  const { letters } = useLetters(6);

  const pwords = useMemoProfile(
    `possibleWords(${letters})`,
    () => dictionary.possibleWords(letters).sort((a, b) => a.length - b.length),
    [],
  );

  const [guess, setGuess] = useState<string>('');
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const word = e.target.value.toUpperCase();
    if (!dictionary.isAllowed(letters, word)) {
      return;
    }

    setGuess(word);
  };

  const [found, setFound] = useState<string[]>([]);
  const enterPressed = useKeyPress('Enter');

  const submitGuess = (word: string) => {
    if (
      !dictionary.isAllowed(letters, word) ||
      !dictionary.contains(word) ||
      found.includes(word)
    ) {
      setError(true);
      return;
    }

    setFound((found) => [...found, word]);
    setGuess('');
  };

  useEffect(() => {
    if (enterPressed) submitGuess(guess);
  }, [enterPressed]);

  const [error, setError] = useState(false);

  return (
    <Page>
      <header>
        <h1>Words</h1>
      </header>
      <Letters>
        {letters.map((letter) => (
          <Letter
            key={letter}
            disabled={guess.includes(letter)}
            onClick={() => setGuess((g) => g + letter)}
          >
            {letter}
          </Letter>
        ))}
      </Letters>
      <InputWrapper $error={error} onAnimationEnd={() => setError(false)}>
        <Input
          type="text"
          onChange={onInputChange}
          value={guess}
          autoFocus
          autoComplete="off"
          spellCheck="false"
          onBlur={({ target }) => target.focus()}
        />
        <Button onClick={() => submitGuess(guess)}>Submit</Button>
      </InputWrapper>

      <Score>
        Found {found.length} of {pwords.length}
      </Score>
      <Words>
        {pwords.sort().map((word) => (
          <Word key={word} $hidden={!found.includes(word)}>
            {word}
          </Word>
        ))}
      </Words>
    </Page>
  );
};

export default Game;

const useLetters = (count: number) => {
  const initialLetters = useMemoProfile(
    `randomLetters(${count})`,
    () => dictionary.randomLetters(count),
    [],
  );

  const [letters, setLetters] = useState(initialLetters);

  const shuffleLetters = () =>
    setLetters((letters) => letters.sort((a, b) => 0.5 - Math.random()));

  const tabPressed = useKeyPress('Tab');
  useEffect(() => {
    if (tabPressed) shuffleLetters();
  }, [tabPressed]);

  return {
    letters,
    shuffleLetters,
  };
};
