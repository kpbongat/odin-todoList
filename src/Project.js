export default class Project {
    todoCollection = {};
    constructor(name='Default Project') {
        this.name = name;
    }

    addTodo (todo) {
        this.todoCollection[todo.name] = todo;
    }

    removeTodo (todo) {
        delete this.todoCollection[todo.name];
    }

    getTodo(todoName) {
        return this.todoCollection[todoName];
    }
}