// export function createCache(name, value) {
//   if (isLocalStorageAvailable()) {
//     window.localStorage.setItem(name, value);
//   }
// }

// export function readCache(name) {
//   let output = false;
//   if (isLocalStorageAvailable()) {
//     output = window.localStorage.getItem(name);
//   }
//   return output;
// }

// export function eraseCache(name) {
//   if (isLocalStorageAvailable()) {
//     window.localStorage.removeItem(name);
//   }
// }


// function isLocalStorageAvailable() {
//   let output;
//   var test = 'test';
//   try {
//     localStorage.setItem(test, test);
//     localStorage.removeItem(test);
//     output = true;
//   } catch (e) {
//     output = false;
//   }
//   return output;
// }
