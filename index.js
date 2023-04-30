const mysql = require("mysql2");
const inquirer = require("inquirer");
const dotenv = require('dotenv');

dotenv.config();

const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require("./dbFunctions");



const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

  
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
    mainMenu();
  });


const mainMenu = () => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Choose an action:",
          choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Exit",
          ],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          case "View all departments":
            viewAllDepartments(connection, mainMenu);
            break;
          case "View all roles":
            viewAllRoles(connection, mainMenu);
            break;
          case "View all employees":
            viewAllEmployees(connection, mainMenu);
            break;
          case "Add a department":
            addDepartment(connection, mainMenu);
            break;
          case "Add a role":
            addRole(connection, mainMenu);
            break;
          case "Add an employee":
            addEmployee(connection, mainMenu);
            break;
          case "Update an employee role":
            updateEmployeeRole(connection, mainMenu);
            break;
          case "Exit":
            connection.end();
            break;
        }
      });
  };