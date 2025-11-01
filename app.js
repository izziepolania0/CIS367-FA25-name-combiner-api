const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

/* 
GET: /api/combine?name1=James&name2=Alvin 
*/
app.get("/api/combine", (req, res) => {
  let result = {
    name1: "",
    name2: "",
    results: [],
  };

  // extract the query string params
  const { name1, name2 } = req.query;
  result.name1 = name1;
  result.name2 = name2;

  // compute combinations
  const combos = [
    { id: 1, name: name1 + name2, goodness: +(Math.random() * 5).toFixed(1) },
    {
      id: 2,
      name: name2[0] + name1.slice(1),
      goodness: +(Math.random() * 5).toFixed(1),
    },
    {
      id: 3,
      name:
        name1.slice(0, Math.ceil(name1.length / 2)) +
        name2.slice(Math.floor(name2.length / 2)),
      goodness: +(Math.random() * 5).toFixed(1),
    },
  ];

  // create array of results
  result.results = combos;

  // write the results to a file
  const logsDir = path.join(__dirname, "logs");
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }
  const filePath = path.join(logsDir, "output.log");
  //console.log(filePath)
  fs.appendFile(
    filePath,
    `${new Date().toISOString()} | ${JSON.stringify(result)}\n`,
    (err) => {
      if (err) console.log(err);
    }
  );

  //send back the response with the data
  res.json(result);
});

/*
{   
    "name1":"John", 
    "name2":"Bob", 
    "results": [{"id":1, "name":"JohnBob", "goodness":4.0},
                {"id":2, "name":"Bohn",    "goodness":1.0}
                {"id":3, "name":"Johob",   "goodness":3.5}] 
}
*/

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
