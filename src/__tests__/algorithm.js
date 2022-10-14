import { countNeighbours, nextGeneration } from '../algorithm';

describe('test neighbours', () => {
  it('should count the neighbours', () => {
    const grid = [
      [1, 1, 0],
      [0, 0, 0],
      [0, 0, 1],
    ];

    expect(countNeighbours(grid, 0, 0)).toBe(1);
    expect(countNeighbours(grid, 1, 1)).toBe(3);
    expect(countNeighbours(grid, 1, 2)).toBe(2);
    expect(countNeighbours(grid, 2, 0)).toBe(0);
    expect(countNeighbours(grid, 2, 2)).toBe(0);
  });
});

describe('test next generation', () => {
  it('should get the next generation', () => {
    expect(
      nextGeneration([
        [1, 1, 0],
        [0, 0, 0],
        [0, 0, 1],
      ])
    ).toEqual([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]);
    expect(
      nextGeneration([
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ])
    ).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it('should create a blinker', () => {
    expect(
      nextGeneration([
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ])
    ).toEqual([
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ]);
    expect(
      nextGeneration([
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ])
    ).toEqual([
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ]);
  });
});
