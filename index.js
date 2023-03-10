//dependencies
const morgan = require('morgan');
const express = require('express');
const app = express();

//routes
const employeeR = require('./routes/employees');
const user = require('./routes/user');

//middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors')

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res, next)=>{
    res.status(200).json({code: 1, message: "Bienvenido a la BD de Empleados"});
    res.send("Hola");
});

app.use("/user", user);
app.use(auth);
app.use("/employees", employeeR);

app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is Running...");
});