CREATE DATABASE planner;

CREATE TABLE toDos(
    id BIGINT PRIMARY KEY,
    list VARCHAR(300),
    todo VARCHAR(50),
    dueDate VARCHAR(50),
    imgRef VARCHAR(300),
    info VARCHAR(300)
);

CREATE TABLE bookcollection(
    id BIGINT PRIMARY KEY,
    volumeId VARCHAR(100)
);