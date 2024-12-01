const express = require('express')
const app = express()
const { mongoDB } = require('./db')
const port = 8000

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
})

mongoDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', require('./Routes/CreatUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})