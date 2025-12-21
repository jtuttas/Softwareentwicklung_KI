/**
 * ToDo App - Main Application Logic
 * Uses jQuery for DOM manipulation and localStorage for data persistence
 */

$(document).ready(function() {
    // Initialize the application
    initApp();

    /**
     * Initialize application and load data
     */
    function initApp() {
        // Initialize default priorities if not exist
        if (!localStorage.getItem('priorities')) {
            const defaultPriorities = [
                { id: generateUUID(), name: 'Low' },
                { id: generateUUID(), name: 'Medium' },
                { id: generateUUID(), name: 'High' }
            ];
            saveToLocalStorage('priorities', defaultPriorities);
        }

        // Initialize empty arrays if not exist
        if (!localStorage.getItem('tasks')) {
            saveToLocalStorage('tasks', []);
        }
        if (!localStorage.getItem('projects')) {
            saveToLocalStorage('projects', []);
        }

        // Load and display data
        loadPriorities();
        loadProjects();
        loadTasks();
        
        // Populate filter dropdowns
        populateFilterDropdowns();
        
        // Setup event handlers
        setupEventHandlers();
    }

    /**
     * Generate UUID for unique IDs
     */
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Save data to localStorage
     */
    function saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Load data from localStorage
     */
    function loadFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    /**
     * Setup all event handlers
     */
    function setupEventHandlers() {
        // Task events
        $('#addTaskBtn').click(() => openTaskModal());
        $('#saveTaskBtn').click(() => saveTask());
        
        // Project events
        $('#addProjectBtn').click(() => openProjectModal());
        $('#saveProjectBtn').click(() => saveProject());
        
        // Priority events
        $('#addPriorityBtn').click(() => openPriorityModal());
        $('#savePriorityBtn').click(() => savePriority());
        
        // Filter and search events
        $('#searchTask').on('input', () => loadTasks());
        $('#filterPriority').change(() => loadTasks());
        $('#filterProject').change(() => loadTasks());
        $('#sortBy').change(() => loadTasks());
        
        // Task list events (using event delegation)
        $('#tasksList').on('click', '.edit-task-btn', function() {
            const taskId = $(this).data('id');
            openTaskModal(taskId);
        });
        
        $('#tasksList').on('click', '.delete-task-btn', function() {
            const taskId = $(this).data('id');
            deleteTask(taskId);
        });
        
        $('#tasksList').on('click', '.toggle-done-btn', function() {
            const taskId = $(this).data('id');
            toggleTaskDone(taskId);
        });
        
        // Project list events
        $('#projectsList').on('click', '.edit-project-btn', function() {
            const projectId = $(this).data('id');
            openProjectModal(projectId);
        });
        
        $('#projectsList').on('click', '.delete-project-btn', function() {
            const projectId = $(this).data('id');
            deleteProject(projectId);
        });
        
        // Priority list events
        $('#prioritiesList').on('click', '.edit-priority-btn', function() {
            const priorityId = $(this).data('id');
            openPriorityModal(priorityId);
        });
        
        $('#prioritiesList').on('click', '.delete-priority-btn', function() {
            const priorityId = $(this).data('id');
            deletePriority(priorityId);
        });
    }

    /**
     * TASK MANAGEMENT
     */
    
    function loadTasks() {
        let tasks = loadFromLocalStorage('tasks') || [];
        const priorities = loadFromLocalStorage('priorities') || [];
        const projects = loadFromLocalStorage('projects') || [];
        
        // Apply search filter
        const searchTerm = $('#searchTask').val().toLowerCase();
        if (searchTerm) {
            tasks = tasks.filter(task => 
                task.title.toLowerCase().includes(searchTerm)
            );
        }
        
        // Apply priority filter
        const priorityFilter = $('#filterPriority').val();
        if (priorityFilter) {
            tasks = tasks.filter(task => task.priorityId === priorityFilter);
        }
        
        // Apply project filter
        const projectFilter = $('#filterProject').val();
        if (projectFilter) {
            tasks = tasks.filter(task => task.projectId === projectFilter);
        }
        
        // Apply sorting
        const sortBy = $('#sortBy').val();
        if (sortBy) {
            const [field, order] = sortBy.split('-');
            tasks.sort((a, b) => {
                let aVal, bVal;
                
                if (field === 'dueDate') {
                    aVal = a.dueDate || '9999-12-31';
                    bVal = b.dueDate || '9999-12-31';
                } else if (field === 'priority') {
                    const aPriority = priorities.find(p => p.id === a.priorityId);
                    const bPriority = priorities.find(p => p.id === b.priorityId);
                    aVal = aPriority ? aPriority.name : '';
                    bVal = bPriority ? bPriority.name : '';
                }
                
                if (order === 'asc') {
                    return aVal > bVal ? 1 : -1;
                } else {
                    return aVal < bVal ? 1 : -1;
                }
            });
        }
        
        // Display tasks
        const $tasksList = $('#tasksList');
        $tasksList.empty();
        
        if (tasks.length === 0) {
            $tasksList.html('<div class="no-data-alert"><i class="bi bi-inbox"></i><p>Keine Aufgaben gefunden</p></div>');
            return;
        }
        
        tasks.forEach(task => {
            const priority = priorities.find(p => p.id === task.priorityId);
            const project = projects.find(p => p.id === task.projectId);
            
            // Determine if task is overdue or due soon
            let cardClass = 'task-card card';
            if (task.done) {
                cardClass += ' done';
            } else if (task.dueDate) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const dueDate = new Date(task.dueDate);
                const diffTime = dueDate - today;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays < 0) {
                    cardClass += ' overdue';
                } else if (diffDays <= 3) {
                    cardClass += ' due-soon';
                }
            }
            
            let priorityBadgeClass = 'badge priority-badge';
            if (priority) {
                if (priority.name.toLowerCase() === 'low') {
                    priorityBadgeClass += ' priority-low';
                } else if (priority.name.toLowerCase() === 'medium') {
                    priorityBadgeClass += ' priority-medium';
                } else if (priority.name.toLowerCase() === 'high') {
                    priorityBadgeClass += ' priority-high';
                } else {
                    priorityBadgeClass += ' bg-secondary';
                }
            } else {
                priorityBadgeClass += ' bg-secondary';
            }
            
            const taskHtml = `
                <div class="${cardClass}">
                    <div class="card-body">
                        <h5 class="task-title">${escapeHtml(task.title)}</h5>
                        <div class="task-meta mb-2">
                            ${task.dueDate ? `<span><i class="bi bi-calendar-event"></i>${formatDate(task.dueDate)}</span> ` : ''}
                            ${priority ? `<span class="${priorityBadgeClass}">${escapeHtml(priority.name)}</span> ` : ''}
                            ${project ? `<span><i class="bi bi-folder"></i>${escapeHtml(project.name)}</span>` : ''}
                        </div>
                        <div class="task-actions">
                            <button class="btn btn-sm ${task.done ? 'btn-warning' : 'btn-success'} toggle-done-btn" data-id="${task.id}">
                                <i class="bi ${task.done ? 'bi-arrow-counterclockwise' : 'bi-check-circle'}"></i>
                                ${task.done ? 'Wiederherstellen' : 'Erledigt'}
                            </button>
                            <button class="btn btn-sm btn-primary edit-task-btn" data-id="${task.id}">
                                <i class="bi bi-pencil"></i> Bearbeiten
                            </button>
                            <button class="btn btn-sm btn-danger delete-task-btn" data-id="${task.id}">
                                <i class="bi bi-trash"></i> Löschen
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            $tasksList.append(taskHtml);
        });
    }
    
    function openTaskModal(taskId = null) {
        const priorities = loadFromLocalStorage('priorities') || [];
        const projects = loadFromLocalStorage('projects') || [];
        
        // Populate priority dropdown
        const $prioritySelect = $('#taskPriority');
        $prioritySelect.empty();
        priorities.forEach(priority => {
            $prioritySelect.append(`<option value="${priority.id}">${escapeHtml(priority.name)}</option>`);
        });
        
        // Populate project dropdown
        const $projectSelect = $('#taskProject');
        $projectSelect.find('option:not(:first)').remove();
        projects.forEach(project => {
            $projectSelect.append(`<option value="${project.id}">${escapeHtml(project.name)}</option>`);
        });
        
        if (taskId) {
            // Edit mode
            const tasks = loadFromLocalStorage('tasks') || [];
            const task = tasks.find(t => t.id === taskId);
            
            if (task) {
                $('#taskModalTitle').text('Aufgabe bearbeiten');
                $('#taskId').val(task.id);
                $('#taskTitle').val(task.title);
                $('#taskDueDate').val(task.dueDate || '');
                $('#taskPriority').val(task.priorityId || '');
                $('#taskProject').val(task.projectId || '');
            }
        } else {
            // Add mode
            $('#taskModalTitle').text('Aufgabe hinzufügen');
            $('#taskId').val('');
            $('#taskTitle').val('');
            $('#taskDueDate').val('');
            $('#taskPriority').val(priorities.length > 0 ? priorities[0].id : '');
            $('#taskProject').val('');
        }
        
        const taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
        taskModal.show();
    }
    
    function saveTask() {
        const title = $('#taskTitle').val().trim();
        
        if (!title) {
            alert('Bitte geben Sie einen Titel ein.');
            return;
        }
        
        const taskId = $('#taskId').val();
        const dueDate = $('#taskDueDate').val();
        const priorityId = $('#taskPriority').val();
        const projectId = $('#taskProject').val();
        
        let tasks = loadFromLocalStorage('tasks') || [];
        
        if (taskId) {
            // Update existing task
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                tasks[taskIndex].title = title;
                tasks[taskIndex].dueDate = dueDate;
                tasks[taskIndex].priorityId = priorityId;
                tasks[taskIndex].projectId = projectId;
            }
        } else {
            // Create new task
            const newTask = {
                id: generateUUID(),
                title: title,
                dueDate: dueDate,
                priorityId: priorityId,
                projectId: projectId,
                done: false
            };
            tasks.push(newTask);
        }
        
        saveToLocalStorage('tasks', tasks);
        loadTasks();
        
        const taskModal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
        taskModal.hide();
    }
    
    function deleteTask(taskId) {
        if (!confirm('Möchten Sie diese Aufgabe wirklich löschen?')) {
            return;
        }
        
        let tasks = loadFromLocalStorage('tasks') || [];
        tasks = tasks.filter(t => t.id !== taskId);
        saveToLocalStorage('tasks', tasks);
        loadTasks();
    }
    
    function toggleTaskDone(taskId) {
        let tasks = loadFromLocalStorage('tasks') || [];
        const task = tasks.find(t => t.id === taskId);
        
        if (task) {
            task.done = !task.done;
            saveToLocalStorage('tasks', tasks);
            loadTasks();
        }
    }

    /**
     * PROJECT MANAGEMENT
     */
    
    function loadProjects() {
        const projects = loadFromLocalStorage('projects') || [];
        const $projectsList = $('#projectsList');
        $projectsList.empty();
        
        if (projects.length === 0) {
            $projectsList.html('<div class="no-data-alert"><i class="bi bi-folder"></i><p>Keine Projekte vorhanden</p></div>');
            return;
        }
        
        projects.forEach(project => {
            const projectHtml = `
                <div class="card list-item-card mb-2">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <h6 class="mb-0">${escapeHtml(project.name)}</h6>
                        <div>
                            <button class="btn btn-sm btn-primary edit-project-btn" data-id="${project.id}">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-danger delete-project-btn" data-id="${project.id}">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            $projectsList.append(projectHtml);
        });
    }
    
    function openProjectModal(projectId = null) {
        if (projectId) {
            // Edit mode
            const projects = loadFromLocalStorage('projects') || [];
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
                $('#projectModalTitle').text('Projekt bearbeiten');
                $('#projectId').val(project.id);
                $('#projectName').val(project.name);
            }
        } else {
            // Add mode
            $('#projectModalTitle').text('Projekt hinzufügen');
            $('#projectId').val('');
            $('#projectName').val('');
        }
        
        const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
        projectModal.show();
    }
    
    function saveProject() {
        const name = $('#projectName').val().trim();
        
        if (!name) {
            alert('Bitte geben Sie einen Namen ein.');
            return;
        }
        
        const projectId = $('#projectId').val();
        let projects = loadFromLocalStorage('projects') || [];
        
        if (projectId) {
            // Update existing project
            const projectIndex = projects.findIndex(p => p.id === projectId);
            if (projectIndex !== -1) {
                projects[projectIndex].name = name;
            }
        } else {
            // Create new project
            const newProject = {
                id: generateUUID(),
                name: name
            };
            projects.push(newProject);
        }
        
        saveToLocalStorage('projects', projects);
        loadProjects();
        populateFilterDropdowns();
        
        const projectModal = bootstrap.Modal.getInstance(document.getElementById('projectModal'));
        projectModal.hide();
    }
    
    function deleteProject(projectId) {
        if (!confirm('Möchten Sie dieses Projekt wirklich löschen?')) {
            return;
        }
        
        let projects = loadFromLocalStorage('projects') || [];
        projects = projects.filter(p => p.id !== projectId);
        saveToLocalStorage('projects', projects);
        
        // Update tasks that referenced this project
        let tasks = loadFromLocalStorage('tasks') || [];
        tasks.forEach(task => {
            if (task.projectId === projectId) {
                task.projectId = '';
            }
        });
        saveToLocalStorage('tasks', tasks);
        
        loadProjects();
        loadTasks();
        populateFilterDropdowns();
    }

    /**
     * PRIORITY MANAGEMENT
     */
    
    function loadPriorities() {
        const priorities = loadFromLocalStorage('priorities') || [];
        const $prioritiesList = $('#prioritiesList');
        $prioritiesList.empty();
        
        if (priorities.length === 0) {
            $prioritiesList.html('<div class="no-data-alert"><i class="bi bi-exclamation-triangle"></i><p>Keine Prioritäten vorhanden</p></div>');
            return;
        }
        
        priorities.forEach(priority => {
            let badgeClass = 'badge';
            if (priority.name.toLowerCase() === 'low') {
                badgeClass += ' priority-low';
            } else if (priority.name.toLowerCase() === 'medium') {
                badgeClass += ' priority-medium';
            } else if (priority.name.toLowerCase() === 'high') {
                badgeClass += ' priority-high';
            } else {
                badgeClass += ' bg-secondary';
            }
            
            const priorityHtml = `
                <div class="card list-item-card mb-2">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <span class="${badgeClass}">${escapeHtml(priority.name)}</span>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-primary edit-priority-btn" data-id="${priority.id}">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-danger delete-priority-btn" data-id="${priority.id}">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            $prioritiesList.append(priorityHtml);
        });
    }
    
    function openPriorityModal(priorityId = null) {
        if (priorityId) {
            // Edit mode
            const priorities = loadFromLocalStorage('priorities') || [];
            const priority = priorities.find(p => p.id === priorityId);
            
            if (priority) {
                $('#priorityModalTitle').text('Priorität bearbeiten');
                $('#priorityId').val(priority.id);
                $('#priorityName').val(priority.name);
            }
        } else {
            // Add mode
            $('#priorityModalTitle').text('Priorität hinzufügen');
            $('#priorityId').val('');
            $('#priorityName').val('');
        }
        
        const priorityModal = new bootstrap.Modal(document.getElementById('priorityModal'));
        priorityModal.show();
    }
    
    function savePriority() {
        const name = $('#priorityName').val().trim();
        
        if (!name) {
            alert('Bitte geben Sie einen Namen ein.');
            return;
        }
        
        const priorityId = $('#priorityId').val();
        let priorities = loadFromLocalStorage('priorities') || [];
        
        if (priorityId) {
            // Update existing priority
            const priorityIndex = priorities.findIndex(p => p.id === priorityId);
            if (priorityIndex !== -1) {
                priorities[priorityIndex].name = name;
            }
        } else {
            // Create new priority
            const newPriority = {
                id: generateUUID(),
                name: name
            };
            priorities.push(newPriority);
        }
        
        saveToLocalStorage('priorities', priorities);
        loadPriorities();
        populateFilterDropdowns();
        
        const priorityModal = bootstrap.Modal.getInstance(document.getElementById('priorityModal'));
        priorityModal.hide();
    }
    
    function deletePriority(priorityId) {
        if (!confirm('Möchten Sie diese Priorität wirklich löschen?')) {
            return;
        }
        
        let priorities = loadFromLocalStorage('priorities') || [];
        priorities = priorities.filter(p => p.id !== priorityId);
        saveToLocalStorage('priorities', priorities);
        
        // Update tasks that referenced this priority
        let tasks = loadFromLocalStorage('tasks') || [];
        tasks.forEach(task => {
            if (task.priorityId === priorityId) {
                task.priorityId = '';
            }
        });
        saveToLocalStorage('tasks', tasks);
        
        loadPriorities();
        loadTasks();
        populateFilterDropdowns();
    }

    /**
     * UTILITY FUNCTIONS
     */
    
    function populateFilterDropdowns() {
        const priorities = loadFromLocalStorage('priorities') || [];
        const projects = loadFromLocalStorage('projects') || [];
        
        // Populate priority filter
        const $priorityFilter = $('#filterPriority');
        const currentPriorityFilter = $priorityFilter.val();
        $priorityFilter.find('option:not(:first)').remove();
        priorities.forEach(priority => {
            $priorityFilter.append(`<option value="${priority.id}">${escapeHtml(priority.name)}</option>`);
        });
        $priorityFilter.val(currentPriorityFilter);
        
        // Populate project filter
        const $projectFilter = $('#filterProject');
        const currentProjectFilter = $projectFilter.val();
        $projectFilter.find('option:not(:first)').remove();
        projects.forEach(project => {
            $projectFilter.append(`<option value="${project.id}">${escapeHtml(project.name)}</option>`);
        });
        $projectFilter.val(currentProjectFilter);
    }
    
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        });
    }
    
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
});
