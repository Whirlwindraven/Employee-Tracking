const mysql = require("mysql2");
const inquirer = require("inquirer");
const dotenv = require("dotenv");
const {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require("./dbFunctions");

dotenv.config();