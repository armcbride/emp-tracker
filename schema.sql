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
