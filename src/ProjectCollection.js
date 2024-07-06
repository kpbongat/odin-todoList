export default new class ProjectCollection  {
    projects = {};

    addProject (project) {
        this.projects[project.name] = project;
    }

    removeProject (project) {
        delete this.projects[project.name];
    }

}