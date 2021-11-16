const app = require ("./app")
const {PORT = 7878} = process.env;

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);