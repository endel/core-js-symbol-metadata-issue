# core-js Symbol.metadata Compatibility Fix

> Archived as issue with `@colyseus/schema` has been fixed on https://github.com/colyseus/schema/pull/214

## Problem

The `core-js` library defines `Function.prototype[Symbol.metadata]` as `null` and read-only. This can cause compatibility issues with libraries that need to modify class metadata, such as [`@colyseus/schema`](https://github.com/colyseus/schema).

Example of the issue:

```javascript
import "core-js";

class MyClass {}
MyClass[Symbol.metadata] = {}; // This will fail
```

Error:
```
Uncaught TypeError: Cannot assign to read only property 'Symbol(Symbol.metadata)' of function 'class (...)
```

## Solution

Add this code before importing any libraries that need to set class metadata:

```javascript
import "core-js";

Object.defineProperty(Function.prototype, Symbol.metadata, {
  value: null,
  writable: true,
  configurable: true,
});

class MyClass {}
MyClass[Symbol.metadata] = {}; // This works now!
```

This makes `Symbol.metadata` writable, allowing libraries to set class metadata as needed.
