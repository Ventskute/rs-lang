export class Filler {
  static BorderArray(arr, row, col) {
    return !(row < 0 || row >= arr.length || col < 0 || col >= arr.length);
  }

  static CheckLetter(arr, row, col) {
    return arr[row][col] !== null;
  }

  static GetRandomValue(arr) {
    while (true) {
      let val = Math.round(Math.random() * arr.length);
      if (arr[val] == false) {
        return val;
      }
    }
  }

  static FillField(words, size, count) {
    const Path = {TOP: 0, RIGHT: 1, BOTTOM: 2, LEFT: 3};

    let field = new Array(size).fill(null).map(el => Array(size).fill(null));
    const letters = words.map(el => el.split('').map(l => [l, el])).flat();
    let check = false;

    const actionHelper = (row, col, level = 0) => {
      field[row][col] = letters[level];

      if (level === count - 1) {
          check = true;
          return;
      }

      const enumerationsFoo = new Array(4).fill(false);
      for (let i = 0; i < enumerationsFoo.length; i++) {
        if (check) return;

        let val = this.GetRandomValue(enumerationsFoo);
        enumerationsFoo[val] = true;

        switch (val) {
          case Path.TOP:
            if (this.BorderArray(field, row - 1, col) && !this.CheckLetter(field, row - 1, col))
              actionHelper(row - 1, col, level + 1);
            break;
          case Path.RIGHT:
            if (this.BorderArray(field, row, col + 1) && !this.CheckLetter(field, row, col + 1))
              actionHelper(row, col + 1, level + 1);
            break;
          case Path.BOTTOM:
            if (this.BorderArray(field, row + 1, col) && !this.CheckLetter(field, row + 1, col))
              actionHelper(row + 1, col, level + 1);
            break;
          case Path.LEFT:
            if (this.BorderArray(field, row, col - 1) && !this.CheckLetter(field, row, col - 1))
              actionHelper(row, col - 1, level + 1);
            break;
        }
      }

      if (check) return;

      field[row][col] = null;
    }

    actionHelper(Math.round(Math.random() * count) % size, Math.round(Math.random() * count) % size);

    return field;
  }
}