class Todo {
  constructor(data, selector, onCheck, onDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = onCheck;
    this._handleDelete = onDelete;
  }
  _setEventListeners() {
    this._checkboxEl.addEventListener("change", () => {
      this._data.completed = this._checkboxEl.checked;
      this._handleCheck(this._data);
    });

    this._deleteBtn.addEventListener("click", () => {
      this._handleDelete(this._data.completed);
    });
  }

  _generateCheckboxEl() {
    this._checkboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._checkboxEl.checked = this._data.completed;
    this._checkboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateDateEl() {
    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      )}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._DeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._setEventListeners();
    this._generateDateEl();

    return this._todoElement;
  }
}

export default Todo;
