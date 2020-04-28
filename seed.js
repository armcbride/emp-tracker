const {prompt} = require('inquirer');

const Db = require('./db');

require('console.table');

init();
function init(){
    loadPrompts();
}

async function loadPrompts(){
const {choice} = await prompt([
    {
        type: "list",
        message:"What would you like to do?",
        name: "choice",
        choices: [
            {
                name: "View all Employees.", 
                value: "VIEW_EMPLOYEES"
            },
            { 
                name: "View all Departments.",
                value: "VIEW_DEPARTMENTS"
            },
            {
                name: "View all Roles.",
                value: "VIEW_ROLE"
            },
            {
                name: "Create a new role.",
                value: "ADD_ROLE"
            },
            { 
                name: "Create new Department.",
                value: "ADD_DEPARTMENT"
            },
            {
                name: "Create new Employee.",
                value: "ADD_EMPLOYEE"
            },
            {
                name: "Update Employee information.",
                value: "UPDATE_EMPLOYEE"
            }       
    ]}
])
    switch (choice){
        case "VIEW_EMPLOYEES":
            return getEmployees();
        case "VIEW_DEPARTMENTS":
            return getDepartments(); 
        case "VIEW_ROLE":
            return getRole();
        case "ADD_EMPLOYEE":
             return addEmployees();
        case "ADD_DEPARTMENT":
            return addDepartment(); 
        case "ADD_ROLE":
            return addRole();       
    }

} 

async function getEmployees(){
    const employees = await Db.viewEmployees()
    console.table(employees);
    loadPrompts();
}

async function getDepartments(){
    const department = await Db.viewDepartment()
    console.table(department);
    loadPrompts();
}

async function getRole(){
    const role = await Db.viewRoles()
    console.table(role);
    loadPrompts();
}

async function addEmployees(){
    const roles = await Db.viewRoles();
    const employees = await Db.viewEmployees();


    const employee = await prompt([
        {
            type:"input",
            message: "What is the employees First name?",
            name:"firstname"
        },
        {
          type: "input",
          message: "what is the employees Last name?",
          name: "lastname"  
        }
    ])

    const roleChoices = roles.map(({id, title})=>({
        name: title,
        value: id
    }))

    const {roleID} = await prompt({
        type: "list",
        message: "What is the employees role?",
        name: "roleID",
        choices: roleChoices
    })

    employee.rol_id = roleID;

    await Db.createEmployee()

}