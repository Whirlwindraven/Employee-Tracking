-- Insert sample data into department table
INSERT INTO department (name)
VALUES ('Sales'), ('Marketing'), ('Engineering'), ('HR');

-- Insert sample data into role table
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 70000, 1),
       ('Marketing Manager', 65000, 2),
       ('Software Engineer', 80000, 3),
       ('HR Manager', 60000, 4);

-- Insert sample data into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Jane', 'Smith', 2, NULL),
       ('Alice', 'Johnson', 3, 1),
       ('Bob', 'Brown', 4, 2);
