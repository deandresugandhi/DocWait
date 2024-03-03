import app from "./app.js";


// Home route
app.get('/', (req, res) =>
     res.send({ info: 'Doc Wait App' }))

//Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

