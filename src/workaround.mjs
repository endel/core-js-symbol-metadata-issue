import "core-js";

// Workaround
Object.defineProperty(Function.prototype, Symbol.metadata, {
  value: null,
  writable: true,
  configurable: true,
});

class MyClass {}
MyClass[Symbol.metadata] = {};
