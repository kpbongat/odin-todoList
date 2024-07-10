import DOMworker from './DOMworker';
import Project from './Project'
import ProjectCollection from './ProjectCollection';
import './style.css'

const defaultProject = new Project();
ProjectCollection.addProject(defaultProject);
DOMworker.createProject(defaultProject);

document.querySelector('.new-button').addEventListener('click', ()=>{
    const newProject = new Project();
    ProjectCollection.addProject(newProject);
    DOMworker.createProject(newProject);
})