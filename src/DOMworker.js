export default new class DOMworker {
    createProject (project) {
        const projectElement = document.createElement('div');
        projectElement.classList.toggle('project');

        const projectName = document.createElement('h2');
        projectName.textContent = project.name;
        projectElement.appendChild(projectName);

        document.querySelector('.project-container').appendChild(projectElement);
    }
}