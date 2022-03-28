const server = require("./server");
const connection = require("./db/connect");

connection();
server.listen(4000, () => {
  console.log("LISTENING...");
});
