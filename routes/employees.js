const express = require('express');
const employees = express.Router();
const db = require('../config/database');


employees.post("/buscar", async (req, res, next) => {
    const { employee_id, first_name } = req.body;
    console.log("asd")
    if (first_name) {
        const employees = await db.query("SELECT * FROM employee WHERE first_name = '" + first_name + "'");
        return res.status(200).json({ code: 200, message: employees });
    }

    if (employee_id) {
        const employees = await db.query("SELECT * FROM employee WHERE employee_id = " + (employee_id));
        return res.status(200).json({ code: 200, message: employees });
    }

    return res.status(404).send({ code: 404, message: "Id & first_name vacio" });
});

employees.post("/", async (req, res, next) => {
    const { first_name, last_name, email, password, phone, adress } = req.body;

    if (first_name && last_name && email && password && phone && adress) {
        let query = "INSERT INTO employee(first_name, last_name, email, password, phone, adress)";
        query += `VALUES('${first_name}', '${last_name}', '${email}', '${password}', ${phone}, '${adress}')`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) 
            return res.status(201).json({ code: 201, message: "Empleado agregado correctamente" });

        return res.status(500).json({ code: 500, message: "Error!!" });;
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos!" })
});

employees.delete("/", async (req, res, next) => {
    const { employee_id, first_name } = req.body;
    if (first_name) {
        const query = `DELETE FROM employee WHERE first_name = '${first_name}'`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) 
            return res.status(200).json({ code: 200, message: `empleado  ${first_name} Eliminado correctamente` });
        else 
            return res.status(404).json({ code: 404, message: `empleado  ${first_name} No encontrado!` });
    }
    if (employee_id) {
        const query = `DELETE FROM employee WHERE employee_id=${employee_id}`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) 
            return res.status(200).json({ code: 200, message: `empleado ${employee_id} Eliminado correctamente` });
        else 
            return res.status(404).json({ code: 404, message: `empleado ${employee_id} No encontrado correctamente` });
    }

    return res.status(404).json({ code: 404, message: "id y first_name vacios" });
});

employees.put("/:name([A-Za-z]+)", async (req, res, next) => {
    const { first_name, last_name, email, password, phone, adress } = req.body;

    let query = `UPDATE employee SET last_name='${last_name}'`;
    query += `, email='${email}', password= '${password}', phone = ${phone}, adress = '${adress}' WHERE first_name = '${first_name}';`;

    if (first_name && last_name && email && password && phone && adress) {
        const rows = await db.query(query);

        if (rows.affectedRows == 1) 
            return res.status(200).json({ code: 200, message: `empleado ${req.params.name} Actualizado correctamente` });

        return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
    }

    return res.status(500).json({ code: 500, message: "Campos incompletos, no es posible actualizar" })
});

module.exports = employees;