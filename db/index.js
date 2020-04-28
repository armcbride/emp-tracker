const connection = require('./connection');


class Db {
    constructor (connection){
        this.connection = connection;
    };
    
    createEmployee (employee){
        return this.connection.query(
            "INSERT INTO employee SET ?", employee
        )
    };

    createDepartment (department){
        return this.connection.query(
            "INSERT INTO employee SET ?", department
        )
    };

    createRole (role){
        return this.connection.query(
            "INSERT INTO employee SET ?", role
        )
    };

    viewDepartment (){
        return this.connection.query (
            "SELECT department.dep_id, department.name FROM employee LEFT JOIN role on employee.rol_id = role.rol_id LEFT JOIN department on role.dep_id = department.dep_id GROUP BY department.dep_id, department.name"
        )
    }
    viewRoles (){
        return this.connection.query(
            "SELECT role.rol_id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.dep_id = department.dep_id"
        )
    }

    viewEmployees (){
        return this.connection.query(
          "SELECT employee.emp_id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, FROM employee LEFT JOIN role on employee.rol_id = role.rol_id LEFT JOIN department on role.dep_id = department.dep_id"  
        )
    }
}