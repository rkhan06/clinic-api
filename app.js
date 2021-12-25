const express = require('express')

const app = express();

//middlewares
app.use(express.json());


app.get('/api/clinic', (req, res) =>{
  res.send('Some data');
})

const PORT = process.env.PORT = '3000';
// start server
app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`)
});

module.exports = app;