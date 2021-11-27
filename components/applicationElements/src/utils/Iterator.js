class Iterator {
  constructor(array) {
    this.array = array;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.array.length;
  }

  next() {
    return this.array[this.index++];
  }

  remove() {
    this.array.splice(this.index - 1, 1);
  }
}

export default Iterator;
