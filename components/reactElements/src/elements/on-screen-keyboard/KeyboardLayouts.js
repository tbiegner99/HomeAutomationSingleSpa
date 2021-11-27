const SpecialKeys = {
  BACKSPACE: '<back>',
  SPACE: '<space>',
  CAPS: '<caps>',
  GO: '<enter>',
  SYMBOLS: '<sym>',
  LESS_SYMBOLS: '1/2',
  MORE_SYMBOLS: '2/2',
  LETTERS: 'ABC'
};

const lettersLayout = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  [SpecialKeys.CAPS, 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'l', SpecialKeys.BACKSPACE],
  [SpecialKeys.SYMBOLS, SpecialKeys.SPACE, '.', SpecialKeys.GO]
];

const symbolsLayout = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['+', '\u00D7', '\u00F7', '=', '/', '_', '<', '>', '[', ']'],
  ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
  [SpecialKeys.MORE_SYMBOLS, '-', "'", '"', ':', ';', ',', '?', SpecialKeys.BACKSPACE],
  [SpecialKeys.LETTERS, SpecialKeys.SPACE, '.', SpecialKeys.GO]
];
const symbolsPage2Layout = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['`', '~', '\\', '|', '{', '}', '\u20AC', '\u00A3', '\u00A5', '\u20A9'],
  [
    '\u00B0',
    '\u2022',
    '\u25CB',
    '\u25CF',
    '\u25A1',
    '\u25A0',
    '\u2664',
    '\u2661',
    '\u2662',
    '\u2667'
  ],
  [
    SpecialKeys.LESS_SYMBOLS,
    '\u2606',
    '\u25AA',
    '\u00A4',
    '\u27EA',
    '\u27EB',
    '\u00A1',
    '\u00BF',
    SpecialKeys.BACKSPACE
  ],
  [SpecialKeys.LETTERS, SpecialKeys.SPACE, '.', SpecialKeys.GO]
];

export { SpecialKeys, lettersLayout, symbolsLayout, symbolsPage2Layout };
