CREATE DATABASE planner;

CREATE TABLE toDos(
    id BIGSERIAL PRIMARY KEY,
    list VARCHAR(300),
    todo VARCHAR(50),
    dueDate VARCHAR(50),
    imgRef VARCHAR(300),
    info VARCHAR(300)
);