import allWords from './dictionary.json';

const MIN_LENGTH = 4;

const DICTIONARY = new Set(allWords.filter((word) => word.length >= 4));

export const contains = (word: string): Boolean => DICTIONARY.has(word);

export const possibleWords = (letters: string[]): string[] =>
  Array.from(DICTIONARY).filter((word) => isAllowed(letters, word));

export const isAllowed = (letters: string[], word: string) => {
  const onlyValidLetters = word.split('').every((c) => letters.includes(c));
  const noDuplicates = new Set(word).size === word.length;

  return onlyValidLetters && noDuplicates;
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const randomLetters = (count: number): string[] => {
  const letters = Array.from(alphabet)
    .sort((a, b) => 0.5 - Math.random())
    .slice(0, count);

  const wordCount = possibleWords(letters).length;

  return wordCount > 5 && wordCount < 100 ? letters : randomLetters(count);
};
