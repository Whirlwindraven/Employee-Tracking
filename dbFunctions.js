const inquirer = require("inquirer");

const viewAllDepartments = (connection, mainMenu) => {
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.table(results);
    mainMenu();
  });
};

const viewAllRoles = (connection, mainMenu) => {
  const query = `
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    INNER JOIN department ON role.department_id = department.id
  `;
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    mainMenu();
  });
};

const viewAllEmployees = (connection, mainMenu) => {
  const query = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
  `;
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    mainMenu();
  });
};

const addDepartment = async (connection, mainMenu) => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: "Enter the department name:",
    },
  ]);

  connection.query("INSERT INTO department SET ?", { name: answers.departmentName }, (err) => {
    if (err) throw err;
    console.log("Department added successfully!");
    mainMenu();
  });
};

const addRole = async (connection, mainMenu) => {
  const departments = await connection.promise().query("SELECT * FROM department");
  const departmentChoices = departments[0].map((department) => ({
    name: department.name,
    value: department.id,
  }));
