// @flow strict

import {wordTokenizer} from './wordTokenizer';

describe('wordTokenizer()', () => {
  it('tokenizes words', () => {
    expect(wordTokenizer('Hello World.')).toEqual(['Hello', ' ', 'World', '.']);
  });

  it('tokenizes multiple whitespace', () => {
    expect(wordTokenizer('Hello   World.')).toEqual([
      'Hello',
      '   ',
      'World',
      '.',
    ]);
  });

  it('tokenizes multiple not a word characters', () => {
    expect(wordTokenizer('Hello %%World%%')).toEqual([
      'Hello',
      ' ',
      '%',
      '%',
      'World',
      '%',
      '%',
    ]);
  });

  it('tokenizes punctuation characters', () => {
    expect(wordTokenizer('Lord* of-the (Rings): Far Away!?')).toEqual([
      'Lord',
      '*',
      ' ',
      'of',
      '-',
      'the',
      ' ',
      '(',
      'Rings',
      ')',
      ':',
      ' ',
      'Far',
      ' ',
      'Away',
      '!',
      '?',
    ]);
  });

  it('tokenizes non-latin characters', () => {
    expect(wordTokenizer('Duża śliwka aus dem grünen Obstgarten')).toEqual([
      'Duża',
      ' ',
      'śliwka',
      ' ',
      'aus',
      ' ',
      'dem',
      ' ',
      'grünen',
      ' ',
      'Obstgarten',
    ]);
  });
});