const express = require("express");
const session = require("express-session");
const path = require("path");
const Route = express();


Route.set('view engine', 'ejs');
Route.set('views', './views/lessons');



Route.use(express.static('public'));
Route.use(express.static(path.join(__dirname, 'views')));

const lessonController = require("../controllers/lessoncontroller");

Route.get('/lesson1', lessonController.lesson1);
Route.get('/lesson2', lessonController.lesson2);
Route.get('/lesson3', lessonController.lesson3);
Route.get('/lesson4', lessonController.lesson4);
Route.get('/lesson5', lessonController.lesson5);
Route.get('/lesson6', lessonController.lesson6);
Route.get('/lesson7', lessonController.lesson7);
Route.get('/lesson8', lessonController.lesson8);
Route.get('/lesson9', lessonController.lesson9);
Route.get('/lesson10', lessonController.lesson10);
Route.get('/lesson11', lessonController.lesson11);
Route.get('/lesson12', lessonController.lesson12);
Route.get('/lesson13', lessonController.lesson13);
Route.get('/lesson14', lessonController.lesson14);
Route.get('/lesson15', lessonController.lesson15);
Route.get('/lesson16', lessonController.lesson16);
Route.get('/lesson17', lessonController.lesson17);
Route.get('/lesson18', lessonController.lesson18);
Route.get('/lesson19', lessonController.lesson19);
Route.get('/lesson20', lessonController.lesson20);
Route.get('/lesson21', lessonController.lesson21);
Route.get('/lesson22', lessonController.lesson22);
Route.get('/lesson23', lessonController.lesson23);
Route.get('/lesson24', lessonController.lesson24);
Route.get('/lesson25', lessonController.lesson25);

module.exports = Route;