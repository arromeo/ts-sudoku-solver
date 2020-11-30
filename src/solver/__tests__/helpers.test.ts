import { translateToCoordinates } from '../helpers';

describe('Helpers', () => {
  describe('translateToCoordinates()', () => {
    test("Given ('row', 0, 0) returns (0, 0)", () => {
      expect(translateToCoordinates('row', 0, 0)).toStrictEqual({
        row: 0,
        column: 0
      });
    });
    test("Given ('row', 4, 5) returns (4, 5)", () => {
      expect(translateToCoordinates('row', 4, 5)).toStrictEqual({
        row: 4,
        column: 5
      });
    });
    test("Given ('row', 8, 8) returns (8, 8)", () => {
      expect(translateToCoordinates('row', 8, 8)).toStrictEqual({
        row: 8,
        column: 8
      });
    });
    test("Given ('row', 9, 8) throws exception", () => {
      expect(() => translateToCoordinates('row', 9, 8)).toThrow();
    });
    test("Given ('row', 8, 9) throws exception", () => {
      expect(() => translateToCoordinates('row', 8, 9)).toThrow();
    });
    test("Given ('row', -1, 0) throws exception", () => {
      expect(() => translateToCoordinates('row', -1, 0)).toThrow();
    });
    test("Given ('row', 0, -1) throws exception", () => {
      expect(() => translateToCoordinates('row', 0, -1)).toThrow();
    });
    test("Given ('column', 0, 0) returns (0, 0)", () => {
      expect(translateToCoordinates('column', 0, 0)).toStrictEqual({
        row: 0,
        column: 0
      });
    });
    test("Given ('column', 4, 5) returns (5, 4)", () => {
      expect(translateToCoordinates('column', 4, 5)).toStrictEqual({
        row: 5,
        column: 4
      });
    });
    test("Given ('column', 8, 8) returns (8, 8)", () => {
      expect(translateToCoordinates('column', 8, 8)).toStrictEqual({
        row: 8,
        column: 8
      });
    });
    test("Given ('column', 9, 8) throws exception", () => {
      expect(() => translateToCoordinates('column', 9, 8)).toThrow();
    });
    test("Given ('column', 8, 9) throws execption", () => {
      expect(() => translateToCoordinates('column', 8, 9)).toThrow();
    });
    test("Given ('column', -1, 0) throws execption", () => {
      expect(() => translateToCoordinates('column', -1, 0)).toThrow();
    });
    test("Given ('column', 0, -1) throws execption", () => {
      expect(() => translateToCoordinates('column', 0, -1)).toThrow();
    });
    test("Given ('block', 0, 0) returns (0, 0)", () => {
      expect(translateToCoordinates('block', 0, 0)).toStrictEqual({
        row: 0,
        column: 0
      });
    });
    test("Given ('block', 4, 6) returns (5, 3)", () => {
      expect(translateToCoordinates('block', 4, 6)).toStrictEqual({
        row: 5,
        column: 3
      });
    });
    test("Given ('block', 8, 8) returns (8, 8)", () => {
      expect(translateToCoordinates('block', 8, 8)).toStrictEqual({
        row: 8,
        column: 8
      });
    });
    test("Given ('block', 9, 8) throws exception", () => {
      expect(() => translateToCoordinates('block', 9, 8)).toThrow();
    });
    test("Given ('block', 8, 9) throws exception", () => {
      expect(() => translateToCoordinates('column', 8, 9)).toThrow();
    });
    test("Given ('block', -1, 0) throws exception", () => {
      expect(() => translateToCoordinates('column', -1, 0)).toThrow();
    });
    test("Given ('block', 0, -1) throws exception", () => {
      expect(() => translateToCoordinates('column', 0, -1)).toThrow();
    });
  });
});
