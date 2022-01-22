import allWords from './dictionary.json';

const DICTIONARY = new Set(
  allWords.filter((word) => word.length >= 4 && word.length <= 6),
);

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
  const letters = shuffle([
    ...takeRand(2, vowels),
    ...takeRand(count - 2, consonants),
  ]);

  const wordCount = possibleWords(letters).length;

  return wordCount >= 5 && wordCount <= 50 ? letters : randomLetters(count);
};

const takeRand = (count: number, pop: string): string[] =>
  shuffle(Array.from(pop)).slice(0, count);

// Durstenfeld shuffle algorithm.
function shuffle<T>(arr: Iterable<T>): T[] {
  const out = Array.from(arr);

  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }

  return out;
}
