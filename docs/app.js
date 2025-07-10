$(document).ready(function() {

    // --- DATA STORAGE & HELPERS ---

    // Function to generate a simple UUID
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Generic function to get data from localStorage
    function getData(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    // Generic function to save data to localStorage
    function saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // --- INITIALIZATION ---

    function initializeData() {
        // Initialize default priorities if they don't exist
        if (getData('priorities').length === 0) {
            const defaultPriorities = [
                { id: generateUUID(), name: 'Niedrig' },
                { id: generateUUID(), name: 'Mittel' },
                { id: generateUUID(), name: 'Hoch' }
            ];
            saveData('priorities', defaultPriorities);
        }
        // Initialize with an example project if none exist
        if (getData('projects').length === 0) {
            const exampleProject = [{ id: generateUUID(), name: 'Erste Schritte' }];
            saveData('projects', exampleProject);
        }
    }

    // --- RENDER FUNCTIONS ---

    function renderPriorities() {
        const priorities = getData('priorities');
        const priorityList = $('#priority-list');
        const taskPriorityDropdown = $('#task-priority');
        const editTaskPriorityDropdown = $('#edit-task-priority');
        const filterPriorityDropdown = $('#filter-priority');

        priorityList.empty();
        taskPriorityDropdown.empty();
        editTaskPriorityDropdown.empty();
        filterPriorityDropdown.html('<option value="all">Alle Prioritäten</option>');

        priorities.forEach(p => {
            // Render list for management tab
            priorityList.append(`
                <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${p.id}">
                    <span>${p.name}</span>
                    <div>
                        <button class="btn btn-sm btn-outline-secondary btn-edit-item" data-type="priority"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-outline-danger btn-delete-item" data-type="priority"><i class="bi bi-trash"></i></button>
                    </div>
                </li>
            `);
            // Populate dropdowns
            taskPriorityDropdown.append(`<option value="${p.id}">${p.name}</option>`);
            editTaskPriorityDropdown.append(`<option value="${p.id}">${p.name}</option>`);
            filterPriorityDropdown.append(`<option value="${p.id}">${p.name}</option>`);
        });
    }

    function renderProjects() {
        const projects = getData('projects');
        const projectList = $('#project-list');
        const taskProjectDropdown = $('#task-project');
        const editTaskProjectDropdown = $('#edit-task-project');
        const filterProjectDropdown = $('#filter-project');

        projectList.empty();
        taskProjectDropdown.empty().append('<option value="">Kein Projekt</option>');
        editTaskProjectDropdown.empty().append('<option value="">Kein Projekt</option>');
        filterProjectDropdown.html('<option value="all">Alle Projekte</option>');

        projects.forEach(p => {
            projectList.append(`
                <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${p.id}">
                    <span>${p.name}</span>
                    <div>
                        <button class="btn btn-sm btn-outline-secondary btn-edit-item" data-type="project"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-outline-danger btn-delete-item" data-type="project"><i class="bi bi-trash"></i></button>
                    </div>
                </li>
            `);
            taskProjectDropdown.append(`<option value="${p.id}">${p.name}</option>`);
            editTaskProjectDropdown.append(`<option value="${p.id}">${p.name}</option>`);
            filterProjectDropdown.append(`<option value="${p.id}">${p.name}</option>`);
        });
    }

    function renderTasks() {
        const tasks = getData('tasks');
        const projects = getData('projects');
        const priorities = getData('priorities');
        const taskList = $('#task-list');

        const filterProjectId = $('#filter-project').val();
        const filterPriorityId = $('#filter-priority').val();
        const sortOrder = $('#sort-tasks').val();

        taskList.empty();

        let filteredTasks = tasks;

        // Filtering
        if (filterProjectId !== 'all') {
            filteredTasks = filteredTasks.filter(t => t.projectId === filterProjectId);
        }
        if (filterPriorityId !== 'all') {
            filteredTasks = filteredTasks.filter(t => t.priorityId === filterPriorityId);
        }

        // Sorting
        const priorityMap = priorities.reduce((map, p, index) => {
            map[p.id] = index; // Lower index = lower priority
            return map;
        }, {});

        filteredTasks.sort((a, b) => {
            switch (sortOrder) {
                case 'due-date-asc':
                    return new Date(a.dueDate) - new Date(b.dueDate);
                case 'due-date-desc':
                    return new Date(b.dueDate) - new Date(a.dueDate);
                case 'priority-asc':
                    return (priorityMap[a.priorityId] || 0) - (priorityMap[b.priorityId] || 0);
                case 'priority-desc':
                    return (priorityMap[b.priorityId] || 0) - (priorityMap[a.priorityId] || 0);
                default:
                    return 0;
            }
        });


        filteredTasks.forEach(task => {
            const project = projects.find(p => p.id === task.projectId);
            const priority = priorities.find(p => p.id === task.priorityId);

            const doneClass = task.done ? 'done' : '';
            const checkedAttribute = task.done ? 'checked' : '';

            taskList.append(`
                <li class="list-group-item task-item ${doneClass}" data-id="${task.id}">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="form-check">
                            <input class="form-check-input btn-toggle-done" type="checkbox" ${checkedAttribute}>
                            <label class="form-check-label task-title">${task.title}</label>
                        </div>
                        <div class="task-actions">
                            <button class="btn btn-sm btn-outline-secondary btn-edit-task"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-sm btn-outline-danger btn-delete-task"><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                    <div class="mt-1 text-muted">
                        ${task.dueDate ? `<span class="due-date me-3"><i class="bi bi-calendar-event"></i> ${new Date(task.dueDate).toLocaleDateString()}</span>` : ''}
                        ${priority ? `<span class="priority-badge badge bg-info me-3">${priority.name}</span>` : ''}
                        ${project ? `<span class="project-badge badge bg-secondary">${project.name}</span>` : ''}
                    </div>
                </li>
            `);
        });
    }

    // --- EVENT HANDLERS ---

    // Add Task
    $('#form-add-task').on('submit', function(e) {
        e.preventDefault();
        const tasks = getData('tasks');
        const newTask = {
            id: generateUUID(),
            title: $('#task-title').val(),
            dueDate: $('#task-due-date').val(),
            priorityId: $('#task-priority').val(),
            projectId: $('#task-project').val(),
            done: false
        };
        tasks.push(newTask);
        saveData('tasks', tasks);
        this.reset();
        renderTasks();
    });

    // Add Project/Priority
    $('#form-add-project, #form-add-priority').on('submit', function(e) {
        e.preventDefault();
        const isProject = this.id === 'form-add-project';
        const type = isProject ? 'project' : 'priority';
        const key = isProject ? 'projects' : 'priorities';
        const input = $(`#${type}-name`);
        
        const data = getData(key);
        data.push({ id: generateUUID(), name: input.val() });
        saveData(key, data);
        
        input.val('');
        if (isProject) {
            renderProjects();
        } else {
            renderPriorities();
        }
    });

    // Delete Item (Project/Priority)
    $('#project-list, #priority-list').on('click', '.btn-delete-item', function() {
        const type = $(this).data('type');
        const key = type === 'project' ? 'projects' : 'priorities';
        const id = $(this).closest('li').data('id');
        
        let data = getData(key);
        data = data.filter(item => item.id !== id);
        saveData(key, data);

        if (type === 'project') {
            renderProjects();
        } else {
            renderPriorities();
        }
        renderTasks(); // Update tasks in case a deleted item was assigned
    });

    // Edit Item (Project/Priority) - Show Modal
    $('#project-list, #priority-list').on('click', '.btn-edit-item', function() {
        const type = $(this).data('type');
        const key = type === 'project' ? 'projects' : 'priorities';
        const id = $(this).closest('li').data('id');
        const item = getData(key).find(i => i.id === id);

        $('#edit-item-id').val(item.id);
        $('#edit-item-type').val(type);
        $('#edit-item-name').val(item.name);
        $('#editItemModalLabel').text(type === 'project' ? 'Projekt bearbeiten' : 'Priorität bearbeiten');
        
        new bootstrap.Modal($('#editItemModal')).show();
    });

    // Save Item Changes (Project/Priority)
    $('#btn-save-item-changes').on('click', function() {
        const id = $('#edit-item-id').val();
        const type = $('#edit-item-type').val();
        const name = $('#edit-item-name').val();
        const key = type === 'project' ? 'projects' : 'priorities';

        let data = getData(key);
        const itemIndex = data.findIndex(i => i.id === id);
        if (itemIndex > -1) {
            data[itemIndex].name = name;
            saveData(key, data);
        }

        if (type === 'project') {
            renderProjects();
        } else {
            renderPriorities();
        }
        renderTasks();
        bootstrap.Modal.getInstance($('#editItemModal')).hide();
    });

    // Toggle Task Done
    $('#task-list').on('click', '.btn-toggle-done', function() {
        const id = $(this).closest('li').data('id');
        const tasks = getData('tasks');
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.done = !task.done;
            saveData('tasks', tasks);
            renderTasks();
        }
    });

    // Delete Task
    $('#task-list').on('click', '.btn-delete-task', function() {
        const id = $(this).closest('li').data('id');
        let tasks = getData('tasks');
        tasks = tasks.filter(t => t.id !== id);
        saveData('tasks', tasks);
        renderTasks();
    });

    // Edit Task - Show Modal
    $('#task-list').on('click', '.btn-edit-task', function() {
        const id = $(this).closest('li').data('id');
        const task = getData('tasks').find(t => t.id === id);

        $('#edit-task-id').val(task.id);
        $('#edit-task-title').val(task.title);
        $('#edit-task-due-date').val(task.dueDate);
        $('#edit-task-priority').val(task.priorityId);
        $('#edit-task-project').val(task.projectId);

        new bootstrap.Modal($('#editTaskModal')).show();
    });

    // Save Task Changes
    $('#btn-save-task-changes').on('click', function() {
        const id = $('#edit-task-id').val();
        let tasks = getData('tasks');
        const taskIndex = tasks.findIndex(t => t.id === id);

        if (taskIndex > -1) {
            tasks[taskIndex].title = $('#edit-task-title').val();
            tasks[taskIndex].dueDate = $('#edit-task-due-date').val();
            tasks[taskIndex].priorityId = $('#edit-task-priority').val();
            tasks[taskIndex].projectId = $('#edit-task-project').val();
            saveData('tasks', tasks);
            renderTasks();
        }
        bootstrap.Modal.getInstance($('#editTaskModal')).hide();
    });

    // Filtering and Sorting
    $('#filter-project, #filter-priority, #sort-tasks').on('change', renderTasks);


    // --- APP INITIALIZATION ---
    initializeData();
    renderPriorities();
    renderProjects();
    renderTasks();
});
