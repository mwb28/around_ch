// app.js
const os = require("os");

console.log("Betriebssystem:", os.platform());
console.log("Architektur:", os.arch());
console.log("Freier Speicher (in Bytes):", os.freemem());
console.log("Gesamtspeicher (in Bytes):", os.totalmem());
