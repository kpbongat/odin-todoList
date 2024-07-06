import ProjectCollection from "./ProjectCollection";

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
            this.removeProject(projectElement);
        } );
        projectElement.appendChild(removeButton);

        document.querySelector('.remove').before(projectElement);
    }
    removeProject (projectElement) {
        projectElement.remove();        
    }
}