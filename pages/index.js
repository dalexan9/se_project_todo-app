import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import TodoCounter from "../components/TodoCounter.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    const name = values.name;
    const dateInput = values.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const todoData = { name, date, id };
    const todoElement = generateTodo(todoData);
    section.addItem(todoElement);
    addTodoForm.reset();
    todoCounter.updateTotal(true);

    newTodoValidator.resetValidation();

    addTodoPopup.close();
  },
});

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

const handleDelete = (completed) => {
  todoCounter.updateTotal(false);
  if (completed) {
    todoCounter.updateCompleted(false);
  }
};

addTodoPopup.setEventListeners();

const generateTodo = (data) => {
  try {
    if (!data) {
      throw new Error("Todo data is required");
    }

    const todoData = {
      id: data.id || uuidv4(),
      name: data.name || "",
      completed: Boolean(data.completed),
      date: data.date instanceof Date ? data.date : new Date(data.date) || null,
    };

    if (!todoData.name) {
      throw new Error("Todo name is required");
    }

    const todo = new Todo(todoData, "#todo-template", handleCheck, () =>
      handleDelete(todoData.completed),
    );
    const todoElement = todo.getView();

    if (!todoElement) {
      throw new Error("Failed to generate todo element");
    }

    return todoElement;
  } catch (error) {
    console.error("Error generating todo:", error);
    console.log("Problematic data:", data);
    return null;
  }
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    if (todoElement) {
      section.addItem(todoElement);
    }
  },
  containerSelector: ".todo__list",
});

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
