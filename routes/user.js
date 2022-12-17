const express = require('express');
const user = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/database');


user.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM employee WHERE email = '${email}' AND password = '${password}';`

    const rows = await db.query(query);

    if (email && password)
        if (rows.length == 1) {
            if (rows[0].admin === 1) {
                const token = jwt.sign({
                    email: rows[0].email,
                    password: rows[0].password
                }, "debugkey");
                return res.status(200).json({ code: 200, message: token });
            }
            return res.status(200).json({ code: 400, message: "User no tiene permisos de admin" });
        } else {
            return res.status(200).json({ code: 400, message: "Usuario y contraseña incorrectos" });
        }
});

module.exports = user;