import ProjectCollection from "./ProjectCollection";
import Todo from "./Todo";

export default new class DOMworker {
    createProject (project) {
        const projectElement = document.createElement('div');
        projectElement.classList.toggle('project');

        const projectName = document.createElement('h2');
        projectName.textContent = project.name;
        projectElement.appendChild(projectName);

        const removeButton = document.createElement('button')
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', ()=>{
            ProjectCollection.removeProject(project);
            this.removeElement(projectElement);
        } );
        projectElement.appendChild(removeButton);

        const todoListElement = document.createElement('div');
        todoListElement.classList.toggle('flex');
        projectElement.appendChild(todoListElement);

        const todoButton = document.createElement('button')
        todoButton.textContent = '+';
        todoButton.addEventListener('click', ()=>{
            this.createTodo(project, todoButton);
        } );
        todoListElement.appendChild(todoButton);


        document.querySelector('.new-button').before(projectElement);
    }
    removeElement (element) {
        element.remove();        
    }

    createTodo (project, todoButton) {
        const newTodo = new Todo();
        project.addTodo(newTodo);
        const todoElement = document.createElement('li');
        todoElement.textContent = newTodo.name;
        const removeButton = document.createElement('button')
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', ()=>{
            project.removeTodo(project);
            this.removeElement(todoElement);
        } );
        todoElement.appendChild(removeButton);
        todoButton.before(todoElement);
    }

}