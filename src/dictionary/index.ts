import allWords from './dictionary.json';

const DICTIONARY = new Set(allWords.filter((word) => word.length >= 4));

export const contains = (word: string): Boolean => DICTIONARY.has(word);

export const possibleWords = (letters: string[]): string[] =>
  Array.from(DICTIONARY).filter((word) => isAllowed(letters, word));

export const isAllowed = (letters: string[], word: string) => {
  const onlyValidLetters = word.split('').every((c) => letters.includes(c));
  const noDuplicates = new Set(word).size === word.length;

  return onlyValidLetters && noDuplicates;
};

const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
const vowels = 'AEIOU';

export const randomLetters = (count: number): string[] => {
  const letters = [
    ...takeRand(2, vowels),
    ...takeRand(count - 2, consonants),
  ].sort();

  const wordCount = possibleWords(letters).length;

  return wordCount > 8 && wordCount < 50 ? letters : randomLetters(count);
};

const takeRand = (count: number, pop: string): string[] =>
  Array.from(pop)
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
