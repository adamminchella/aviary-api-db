const app = require("./server");
const port = 3000;

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
