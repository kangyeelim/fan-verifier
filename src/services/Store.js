export function Store(initialState = {}) {
  this.state = initialState;
}

Store.prototype.mergeState = function(partialState) {
  Object.assign(this.state, partialState);
}

Store.prototype.getState = function(key) {
  return this.state.key;
}
