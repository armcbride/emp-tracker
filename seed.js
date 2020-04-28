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
                name: "View all Employees", 
                value: "VIEW_EMPLOYEES"
            },
            { 
                name: "View all Departments",
                value: "VIEW_DEPARTMENTS"
            },
            {
                name: "View all Roles",
                value: "VIEW_ROLE"
            },
            {
                name: "Create a new role",
                value: "ADD_ROLE"
            },
            { 
                name: "Create new Department",
                value: "ADD_DEPARTMENT"
            },
            {
                name: "Create new Employee",
                value: "ADD_EMPLOYEE"
            },
            {
                name: "Update Employee information",
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
        case "UPDATE_EMPLOYEE":
            return updateEMPROLE();

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
    // const employees = await Db.viewEmployees();

    const employee = await prompt([
        {
            type:"input",
            message: "What is the employees First name?",
            name:"first_name"
        },
        {
          type: "input",
          message: "what is the employees Last name?",
          name: "last_name"  
        }
    ])

    const roleChoices = roles.map(({rol_id, title})=>({
        name: title,
        value: rol_id
    }))

    const {roleID} = await prompt({
        type: "list",
        message: "What is the employees role?",
        name: "roleID",
        choices: roleChoices
    })

    employee.rol_id = roleID;

    await Db.createEmployee(employee)
    loadPrompts();
}

async function addDepartment(){
 const department = await prompt([
     {
         name: "name",
         type: "input",
         message: "what is the name of the department?"
     }
 ])
 await Db.createDepartment(department);

 loadPrompts();
}

async function addRole(){
    const department = await Db.viewDepartment();
    const departmentChoices = department.map(({dep_id, name})=>({
        name: name,
        value: dep_id
    }))
    const role = await prompt([
        {
            name: "title",
            message: "what is the name of the role?",
            type: "input"
        },
        {
            name: "salary",
            message: "What is the salary?",
            type: "input"
        },
        {
            name: "dep_id",
            message: "What department does the role fall under?",
            type: "list",
            choices: departmentChoices
        }
    ])
    await Db.createRole(role);
    loadPrompts();
}

async function updateEMPROLE(){

    const employees = await Db.updateEmployee();

    const employeeChoices = employees.map(({emp_id, first_name, last_name})=>
        ({
        name: `${first_name} ${last_name}`,
        value: emp_id
        }));

    const {employeeID} = await prompt ([
        {
          type: "list",
          name: "emp_id",
          message: "Which employees' role would you like to update?",
          choices: employeeChoices  
        }
    ]);

    const roles = await Db.viewRoles();
    const roleChoices = roles.map(({rol_id, title})=>({
        name: title,
        value: rol_id
    }));

    const {roleID} = await prompt([
       {
           type: "list",
           name: "rol_id",
           message: "Which role do you want to assign to the selected employee?",
           choices: roleChoices
       } 
    ]);

    await Db.updateEmployee(employeeID, roleID); 
    
    loadPrompts();
}