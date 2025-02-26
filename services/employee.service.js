const db = require('../db')

module.exports.getAllEmployees = async () => {
    const [record] = await db.query("SELECT * FROM employees")
        // .then(data => res.send(data[0])) // we will be using async await
        // .catch(err => console.log(err)) // it will be handling inside global err handling 
        return record;
}


module.exports.getEmployeeById = async (id) => {
    const [[record]] = await db.query("SELECT * FROM employees WHERE id =?" ,[id]) // by passing ?,[id](both pass seperately into server), So we can avoid sql injection
        return record;
}

module.exports.deleteEmployee = async (id) => {
    const [{affectedRows}] = await db.query("DELETE FROM employees WHERE id =?" ,[id]) // by passing ?,[id](both pass seperately into server), So we can avoid sql injection
        return affectedRows;
}

module.exports.addOrEditEmployee = async (obj,id=0) => {
    const [[[{affectedRows}]]] = await db.query("CALL usp_employee_add_or_edit(?,?,?,?)" ,
        [id,obj.name,obj.employee_code,obj.salary]) // by passing ?,[id](both pass seperately into server), So we can avoid sql injection
        return affectedRows;
}