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

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the role title:",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the role salary:",
    },
    {
      type: "list",
      name: "department_id",
      message: "Select the department:",
      choices: departmentChoices,
    },
  ]);

  connection.query("INSERT INTO role SET ?", answers, (err) => {
    if (err) throw err;
    console.log("Role added successfully!");
    mainMenu();
  });
};

const addEmployee = async (connection, mainMenu) => {
  const roles = await connection.promise().query("SELECT * FROM role");
  const roleChoices = roles[0].map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const managers = await connection.promise().query("SELECT * FROM employee");
  const managerChoices = managers[0].map((manager) => ({
    name: `${manager.first_name} ${manager.last_name}`,
    value: manager.id,
  }));
  managerChoices.unshift({ name: "None", value: null });

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the employee's first name:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the employee's last name:",
    },
    { type: "list",
    name: "role_id",
    message: "Select the employee's role:",
    choices: roleChoices,
  },
  {
    type: "list",
    name: "manager_id",
    message: "Select the employee's manager:",
    choices: managerChoices,
  },
]);

connection.query("INSERT INTO employee SET ?", answers, (err) => {
  if (err) throw err;
  console.log("Employee added successfully!");
  mainMenu();
});
};

const updateEmployeeRole = async (connection, mainMenu) => {
const employees = await connection.promise().query("SELECT * FROM employee");
const employeeChoices = employees[0].map((employee) => ({
  name: `${employee.first_name} ${employee.last_name}`,
  value: employee.id,
}));

const roles = await connection.promise().query("SELECT * FROM role");
const roleChoices = roles[0].map((role) => ({
  name: role.title,
  value: role.id,
}));

const answers = await inquirer.prompt([
  {
    type: "list",
    name: "employee_id",
    message: "Select the employee to update:",
    choices: employeeChoices,
  },
  {
    type: "list",
    name: "role_id",
    message: "Select the new role for the employee:",
    choices: roleChoices,
  },
]);

connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [answers.role_id, answers.employee_id], (err) => {
  if (err) throw err;
  console.log("Employee role updated successfully!");
  mainMenu();
});
};

module.exports = {
viewAllDepartments,
viewAllRoles,
viewAllEmployees,
addDepartment,
addRole,
addEmployee,
updateEmployeeRole,
};