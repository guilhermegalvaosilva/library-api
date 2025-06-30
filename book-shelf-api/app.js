const express = require("express");
const app = express();
const booksRoutes = require("./routes/books"); // isso é essencial

app.use(express.json());
app.use("/books", booksRoutes); // isso também!

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
