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
                this.setTodoDialog(project.getTodo(todoText.textContent), project);
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

    setTodoDialog (todo, project) {
        const modalForm = document.createElement('form')
        modalForm.setAttribute('method','dialog');  
        modalForm.classList.toggle('grid');
        modalForm.classList.toggle('grid-form');

        const nameLabel = document.createElement('label');
        nameLabel.setAttribute('id','name');
        nameLabel.textContent = todo.name;
        modalForm.appendChild(nameLabel);

        const descLabel = document.createElement('label');
        descLabel.setAttribute('for','desc');
        descLabel.textContent = 'Description'
        modalForm.appendChild(descLabel);

        const descInput = document.createElement('textarea');
        descInput.setAttribute('id','desc');
        descInput.value = todo.desc;
        modalForm.appendChild(descInput);

        const dueDateLabel = document.createElement('label');
        dueDateLabel.setAttribute('for','dueDate');
        dueDateLabel.textContent = 'Due Date'
        modalForm.appendChild(dueDateLabel);

        const dueDateInput = document.createElement('input');  
        dueDateInput.setAttribute('type','date');  
        dueDateInput.setAttribute('id','dueDate');
        dueDateInput.value = todo.dueDate;
        modalForm.appendChild(dueDateInput);

        const priorityLabel = document.createElement('label');
        priorityLabel.setAttribute('for','priority');
        priorityLabel.textContent = 'Priority'
        modalForm.appendChild(priorityLabel);

        const priorityInput = document.createElement('input');
        priorityInput.setAttribute('type','number');  
        priorityInput.setAttribute('id','priority');
        priorityInput.value = todo.priority; 
        modalForm.appendChild(priorityInput);


        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save'
        saveButton.setAttribute('type','button');
        saveButton.setAttribute('id','save');

        saveButton.addEventListener('click', ()=>{
            const newTodo = new Todo(todo.name, descInput.value, dueDateInput.value, priorityInput.value);
            project.addTodo(newTodo);
        })

        modalForm.appendChild(saveButton);
        document.querySelector('dialog').appendChild(modalForm);
    }


}