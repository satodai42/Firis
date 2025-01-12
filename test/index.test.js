
// テスト対象のファイルを読み込む
const Firis = require('../src/index.js');

if(!global.structuredClone){
  global.structuredClone = function structuredClone(objectToClone) {
    if (objectToClone === undefined) return undefined;
    return JSON.parse(JSON.stringify(objectToClone));
  }
}

test("Firis-Test01", () => {
  const firis = new Firis()
  expect(firis.createStringContainer("あいうえお")).toBe(true)

  expect(firis.getRomaji()).toEqual(["a", "i", "u", "e", "o"])
  expect(firis.getKana()).toEqual(["あ", "い", "う", "え", "お"])

  expect(firis.getEnteredRomaji()).toEqual([])
  expect(firis.getEnteredKana()).toEqual([])

  expect(firis.inputKey('a')).toBe(0)
  expect(firis.inputKey('z')).toBe(1)
  expect(firis.inputKey('i')).toBe(0)

  expect(firis.getEnteredRomaji()).toEqual(["a", "i"])
  expect(firis.getEnteredKana()).toEqual(["あ", "い"])

  expect(firis.inputKey('w')).toBe(0)
  expect(firis.inputKey('u')).toBe(0)
  expect(firis.inputKey('e')).toBe(0)

  expect(firis.inputKey('zz')).toBe(-1)

  expect(firis.inputKey('o')).toBe(2)

});

test("Firis-Test02", () => {
  const firis = new Firis()
  expect(firis.createStringContainer("ちゃちゅっちぇっちょ")).toBe(true)

  expect(firis.getRomaji()).toEqual(["tya", "tyu", "t", "tye", "t" , "tyo"])
  expect(firis.getKana()).toEqual(["ちゃ", "ちゅ", "っ", "ちぇ", "っ" , "ちょ"])

  expect(firis.getEnteredRomaji()).toEqual([])
  expect(firis.getEnteredKana()).toEqual([])

  expect(firis.inputKey('t')).toBe(0)
  expect(firis.inputKey('y')).toBe(0)
  expect(firis.inputKey('a')).toBe(0)

  expect(firis.inputKey('c')).toBe(0)
  expect(firis.inputKey('h')).toBe(0)
  expect(firis.inputKey('u')).toBe(0)

  expect(firis.inputKey('c')).toBe(0)

  expect(firis.inputKey('c')).toBe(0)
  expect(firis.inputKey('h')).toBe(0)
  expect(firis.inputKey('e')).toBe(0)

  expect(firis.inputKey('l')).toBe(0)
  expect(firis.inputKey('t')).toBe(0)
  expect(firis.inputKey('u')).toBe(0)

  expect(firis.inputKey('t')).toBe(0)
  expect(firis.inputKey('i')).toBe(0)

  expect(firis.inputKey('x')).toBe(0)
  expect(firis.inputKey('y')).toBe(0)
  expect(firis.inputKey('o')).toBe(2)

});

test("Firis-Test03", () => {
  const firis = new Firis()
  expect(firis.createStringContainer("↓")).toBe(false)
});