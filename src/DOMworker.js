import ProjectCollection from "./ProjectCollection";
import Todo from "./Todo";

export default new class DOMworker {
    createProject (project) {
        const projectElement = document.createElement('div');
        projectElement.classList.toggle('project');

        const projectHeader = document.createElement('div');
        projectHeader.classList.toggle('flex');

        const projectName = document.createElement('h2');
        projectName.textContent = project.name;
        projectHeader.appendChild(projectName);

        const removeButton = document.createElement('button')
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', ()=>{
            ProjectCollection.removeProject(project);
            this.removeElement(projectElement);
        } );
        projectHeader.appendChild(removeButton);
        projectElement.appendChild(projectHeader);

        const todoListElement = document.createElement('div');
        projectElement.appendChild(todoListElement);

        const todoButton = document.createElement('button')
        todoButton.setAttribute('type','button');
        todoButton.textContent = '+';
        todoButton.addEventListener('click', ()=>{
            this.createTodoElement(project, todoButton);
        } );
        todoListElement.appendChild(todoButton);


        document.querySelector('.new-button').before(projectElement);
    }
    removeElement (element) {
        element.remove();        
    }

    createTodoElement (project, todoButton) {
        const createTodo = () => {
            const newTodo = new Todo(todoInput.value);
            project.addTodo(newTodo);
            const todoText = document.createElement('button');
            todoText.setAttribute('type','button');
            todoText.textContent = newTodo.name;
            todoText.addEventListener('click', ()=>{
                this.setTodoDialog(newTodo);
                document.querySelector('dialog').showModal();
            })
            
            todoInput.replaceWith(todoText);
            this.removeElement(todoSubmit);
        }
        const todoElement = document.createElement('div');
        todoElement.classList.toggle('flex');
        const todoInput = document.createElement('input');
        todoInput.addEventListener('keypress',(e)=>{
            if (e.code==='Enter') {
                createTodo();
            }
        })
        todoElement.appendChild(todoInput);
        const todoSubmit = document.createElement('button');
        todoSubmit.textContent = '✓';
        todoElement.appendChild(todoSubmit)
        todoSubmit.addEventListener('click', createTodo);

        const removeButton = document.createElement('button')
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', ()=>{
            project.removeTodo(project);
            this.removeElement(todoElement);
        } );

        todoElement.appendChild(removeButton);
        
        todoButton.before(todoElement);




    }

    setTodoDialog (todo) {
        const nameInput = document.querySelector('#name');
        nameInput.value = todo.name;
        const descInput = document.querySelector('#desc');
        descInput.textContent = todo.desc;
        const dueDateInput = document.querySelector('#dueDate');     }




}