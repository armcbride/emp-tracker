DROP DATABASE IF EXISTS emp_tracker;
CREATE database emp_tracker;

USE emp_tracker;

CREATE TABLE department ( 
dep_id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (dep_id)
);

CREATE TABLE role ( 
rol_id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,4),
dep_id INT,
PRIMARY KEY (rol_id),
FOREIGN KEY(dep_id) REFERENCES department(dep_id)
);

CREATE TABLE employee ( 
emp_id INT AUTO_INCREMENT NOT NULL,
first_name varchar(30),
last_name varchar(30),
rol_id INT,
PRIMARY KEY (emp_id),
FOREIGN KEY (rol_id) REFERENCES role(rol_id)
);


INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Human Resources'),
    ('Labor');

INSERT INTO role
    (title, salary, dep_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4),
    ('HR Coordinator', 56000, 5),
    ('Maitenance Lead', 47000, 6);
    
INSERT INTO employee
    (first_name, last_name, rol_id)
VALUES
    ('Justin', 'Case', 1),
    ('Mike', 'Check', 2, 1),
    ('Hugh', 'Balloons', 3),
    ('Rachel', 'Egress', 4),
    ('Crystal', 'Waters', 5),
    ('Fade', 'Sunset', 6),
    ('Garry', 'Gengurch', 7),
    ('Jazz', 'Hanz', 8),
    ('Brock', 'Hampton', 9),
    ('Trenton', 'Spend', 10);