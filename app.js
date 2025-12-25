/**
 * ToDo App - Main Application Logic
 * Uses jQuery for DOM manipulation and localStorage for data persistence
 */

(function ($) {
    'use strict';

    // Data Storage Keys
    const STORAGE_KEYS = {
        TASKS: 'todoapp_tasks',
        PROJECTS: 'todoapp_projects',
        PRIORITIES: 'todoapp_priorities'
    };

    // Application State
    let tasks = [];
    let projects = [];
    let priorities = [];
    let currentView = 'tasks';

    // Modal instances
    let taskModal, projectModal, priorityModal;

    /**
     * Generate UUID for unique identifiers
     */
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * LocalStorage Functions
     */
    const Storage = {
        save: function (key, data) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
                return true;
            } catch (e) {
                console.error('Error saving to localStorage:', e);
                return false;
            }
        },

        load: function (key) {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : null;
            } catch (e) {
                console.error('Error loading from localStorage:', e);
                return null;
            }
        },

        clear: function (key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('Error clearing localStorage:', e);
                return false;
            }
        }
    };

    /**
     * Initialize default data
     */
    function initializeDefaultData() {
        // Initialize default priorities
        const defaultPriorities = [
            { id: generateUUID(), name: 'Low' },
            { id: generateUUID(), name: 'Medium' },
            { id: generateUUID(), name: 'High' }
        ];

        priorities = Storage.load(STORAGE_KEYS.PRIORITIES) || defaultPriorities;
        if (!Storage.load(STORAGE_KEYS.PRIORITIES)) {
            Storage.save(STORAGE_KEYS.PRIORITIES, priorities);
        }

        // Load projects
        projects = Storage.load(STORAGE_KEYS.PROJECTS) || [];

        // Load tasks
        tasks = Storage.load(STORAGE_KEYS.TASKS) || [];
    }

    /**
     * Task CRUD Operations
     */
    const TaskManager = {
        getAll: function () {
            return tasks;
        },

        getById: function (id) {
            return tasks.find(task => task.id === id);
        },

        add: function (task) {
            task.id = generateUUID();
            task.done = false;
            tasks.push(task);
            Storage.save(STORAGE_KEYS.TASKS, tasks);
            return task;
        },

        update: function (id, updatedTask) {
            const index = tasks.findIndex(task => task.id === id);
            if (index !== -1) {
                tasks[index] = { ...tasks[index], ...updatedTask };
                Storage.save(STORAGE_KEYS.TASKS, tasks);
                return tasks[index];
            }
            return null;
        },

        delete: function (id) {
            tasks = tasks.filter(task => task.id !== id);
            Storage.save(STORAGE_KEYS.TASKS, tasks);
        },

        toggleDone: function (id) {
            const task = this.getById(id);
            if (task) {
                task.done = !task.done;
                Storage.save(STORAGE_KEYS.TASKS, tasks);
                return task;
            }
            return null;
        }
    };

    /**
     * Project CRUD Operations
     */
    const ProjectManager = {
        getAll: function () {
            return projects;
        },

        getById: function (id) {
            return projects.find(project => project.id === id);
        },

        add: function (project) {
            project.id = generateUUID();
            projects.push(project);
            Storage.save(STORAGE_KEYS.PROJECTS, projects);
            return project;
        },

        update: function (id, updatedProject) {
            const index = projects.findIndex(project => project.id === id);
            if (index !== -1) {
                projects[index] = { ...projects[index], ...updatedProject };
                Storage.save(STORAGE_KEYS.PROJECTS, projects);
                return projects[index];
            }
            return null;
        },

        delete: function (id) {
            projects = projects.filter(project => project.id !== id);
            // Remove project reference from tasks
            tasks.forEach(task => {
                if (task.projectId === id) {
                    task.projectId = '';
                }
            });
            Storage.save(STORAGE_KEYS.PROJECTS, projects);
            Storage.save(STORAGE_KEYS.TASKS, tasks);
        }
    };

    /**
     * Priority CRUD Operations
     */
    const PriorityManager = {
        getAll: function () {
            return priorities;
        },

        getById: function (id) {
            return priorities.find(priority => priority.id === id);
        },

        add: function (priority) {
            priority.id = generateUUID();
            priorities.push(priority);
            Storage.save(STORAGE_KEYS.PRIORITIES, priorities);
            return priority;
        },

        update: function (id, updatedPriority) {
            const index = priorities.findIndex(priority => priority.id === id);
            if (index !== -1) {
                priorities[index] = { ...priorities[index], ...updatedPriority };
                Storage.save(STORAGE_KEYS.PRIORITIES, priorities);
                return priorities[index];
            }
            return null;
        },

        delete: function (id) {
            priorities = priorities.filter(priority => priority.id !== id);
            // Remove priority reference from tasks
            tasks.forEach(task => {
                if (task.priorityId === id) {
                    task.priorityId = '';
                }
            });
            Storage.save(STORAGE_KEYS.PRIORITIES, priorities);
            Storage.save(STORAGE_KEYS.TASKS, tasks);
        }
    };

    /**
     * Filter and Sort Functions
     */
    function filterTasks(searchTerm, projectFilter, priorityFilter) {
        let filtered = tasks;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by project
        if (projectFilter) {
            filtered = filtered.filter(task => task.projectId === projectFilter);
        }

        // Filter by priority
        if (priorityFilter) {
            filtered = filtered.filter(task => task.priorityId === priorityFilter);
        }

        return filtered;
    }

    function sortTasks(tasksToSort, sortBy, sortOrder) {
        const sorted = [...tasksToSort];

        sorted.sort((a, b) => {
            let comparison = 0;

            if (sortBy === 'dueDate') {
                const dateA = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31');
                const dateB = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31');
                comparison = dateA - dateB;
            } else if (sortBy === 'priority') {
                const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
                const priorityA = PriorityManager.getById(a.priorityId);
                const priorityB = PriorityManager.getById(b.priorityId);
                const valueA = priorityA ? (priorityOrder[priorityA.name] || 0) : 0;
                const valueB = priorityB ? (priorityOrder[priorityB.name] || 0) : 0;
                comparison = valueB - valueA;
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return sorted;
    }

    /**
     * UI Rendering Functions
     */
    function renderTasks() {
        const searchTerm = $('#searchTask').val();
        const projectFilter = $('#filterProject').val();
        const priorityFilter = $('#filterPriority').val();
        const sortBy = $('#sortBy').val();
        const sortOrder = $('#sortOrder').val();

        let filteredTasks = filterTasks(searchTerm, projectFilter, priorityFilter);
        filteredTasks = sortTasks(filteredTasks, sortBy, sortOrder);

        const $tasksList = $('#tasksList');
        $tasksList.empty();

        if (filteredTasks.length === 0) {
            $tasksList.html(`
                <div class="empty-state">
                    <i class="bi bi-inbox"></i>
                    <h4>Keine Aufgaben gefunden</h4>
                    <p>Erstellen Sie eine neue Aufgabe oder passen Sie Ihre Filter an.</p>
                </div>
            `);
            return;
        }

        filteredTasks.forEach(task => {
            const priority = PriorityManager.getById(task.priorityId);
            const project = ProjectManager.getById(task.projectId);
            const priorityClass = priority ? priority.name.toLowerCase() : 'low';
            const priorityBadgeClass = priority ? `badge-${priority.name.toLowerCase()}` : 'badge-low';

            let dueDateClass = '';
            let dueDateText = task.dueDate || 'Kein Datum';
            
            if (task.dueDate) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const dueDate = new Date(task.dueDate);
                dueDate.setHours(0, 0, 0, 0);

                if (dueDate < today) {
                    dueDateClass = 'due-date-overdue';
                    dueDateText += ' (Überfällig)';
                } else if (dueDate.getTime() === today.getTime()) {
                    dueDateClass = 'due-date-today';
                    dueDateText += ' (Heute)';
                } else {
                    dueDateClass = 'due-date-upcoming';
                }
            }

            const taskCard = `
                <div class="card task-card priority-${priorityClass} ${task.done ? 'done' : ''} mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="flex-grow-1">
                                <h5 class="task-title">${escapeHtml(task.title)}</h5>
                                <div class="task-meta">
                                    ${priority ? `<span class="badge badge-priority ${priorityBadgeClass} me-2">
                                        <i class="bi bi-flag-fill"></i> ${escapeHtml(priority.name)}
                                    </span>` : ''}
                                    ${project ? `<span class="badge bg-secondary me-2">
                                        <i class="bi bi-folder-fill"></i> ${escapeHtml(project.name)}
                                    </span>` : ''}
                                    <span class="${dueDateClass}">
                                        <i class="bi bi-calendar"></i> ${dueDateText}
                                    </span>
                                </div>
                            </div>
                            <div class="task-actions">
                                <button class="btn btn-sm ${task.done ? 'btn-warning' : 'btn-success'}" 
                                        onclick="toggleTaskDone('${task.id}')">
                                    <i class="bi bi-${task.done ? 'arrow-counterclockwise' : 'check-circle'}"></i>
                                    ${task.done ? 'Wiederherstellen' : 'Erledigt'}
                                </button>
                                <button class="btn btn-sm btn-primary" onclick="editTask('${task.id}')">
                                    <i class="bi bi-pencil"></i> Bearbeiten
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="deleteTask('${task.id}')">
                                    <i class="bi bi-trash"></i> Löschen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $tasksList.append(taskCard);
        });
    }

    function renderProjects() {
        const $projectsList = $('#projectsList');
        $projectsList.empty();

        if (projects.length === 0) {
            $projectsList.html(`
                <div class="empty-state">
                    <i class="bi bi-folder"></i>
                    <h4>Keine Projekte vorhanden</h4>
                    <p>Erstellen Sie Ihr erstes Projekt.</p>
                </div>
            `);
            return;
        }

        projects.forEach(project => {
            const taskCount = tasks.filter(task => task.projectId === project.id).length;
            const projectCard = `
                <div class="card list-item-card mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="mb-1"><i class="bi bi-folder-fill"></i> ${escapeHtml(project.name)}</h5>
                                <small class="text-muted">${taskCount} Aufgabe(n)</small>
                            </div>
                            <div class="list-item-actions">
                                <button class="btn btn-sm btn-primary" onclick="editProject('${project.id}')">
                                    <i class="bi bi-pencil"></i> Bearbeiten
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="deleteProject('${project.id}')">
                                    <i class="bi bi-trash"></i> Löschen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $projectsList.append(projectCard);
        });
    }

    function renderPriorities() {
        const $prioritiesList = $('#prioritiesList');
        $prioritiesList.empty();

        if (priorities.length === 0) {
            $prioritiesList.html(`
                <div class="empty-state">
                    <i class="bi bi-flag"></i>
                    <h4>Keine Prioritäten vorhanden</h4>
                    <p>Erstellen Sie Ihre erste Priorität.</p>
                </div>
            `);
            return;
        }

        priorities.forEach(priority => {
            const taskCount = tasks.filter(task => task.priorityId === priority.id).length;
            const priorityBadgeClass = `badge-${priority.name.toLowerCase()}`;
            const priorityCard = `
                <div class="card list-item-card mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="mb-1">
                                    <span class="badge badge-priority ${priorityBadgeClass}">
                                        <i class="bi bi-flag-fill"></i> ${escapeHtml(priority.name)}
                                    </span>
                                </h5>
                                <small class="text-muted">${taskCount} Aufgabe(n)</small>
                            </div>
                            <div class="list-item-actions">
                                <button class="btn btn-sm btn-primary" onclick="editPriority('${priority.id}')">
                                    <i class="bi bi-pencil"></i> Bearbeiten
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="deletePriority('${priority.id}')">
                                    <i class="bi bi-trash"></i> Löschen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $prioritiesList.append(priorityCard);
        });
    }

    function updateFilterOptions() {
        // Update project filter options
        const $filterProject = $('#filterProject');
        const currentProjectFilter = $filterProject.val();
        $filterProject.html('<option value="">Alle Projekte</option>');
        projects.forEach(project => {
            $filterProject.append(`<option value="${project.id}">${escapeHtml(project.name)}</option>`);
        });
        $filterProject.val(currentProjectFilter);

        // Update priority filter options
        const $filterPriority = $('#filterPriority');
        const currentPriorityFilter = $filterPriority.val();
        $filterPriority.html('<option value="">Alle Prioritäten</option>');
        priorities.forEach(priority => {
            $filterPriority.append(`<option value="${priority.id}">${escapeHtml(priority.name)}</option>`);
        });
        $filterPriority.val(currentPriorityFilter);
    }

    function updateTaskFormOptions() {
        // Update priority options in task form
        const $taskPriority = $('#taskPriority');
        const currentPriority = $taskPriority.val();
        $taskPriority.empty();
        priorities.forEach(priority => {
            $taskPriority.append(`<option value="${priority.id}">${escapeHtml(priority.name)}</option>`);
        });
        if (currentPriority) {
            $taskPriority.val(currentPriority);
        } else if (priorities.length > 0) {
            $taskPriority.val(priorities[0].id);
        }

        // Update project options in task form
        const $taskProject = $('#taskProject');
        const currentProject = $taskProject.val();
        $taskProject.html('<option value="">Kein Projekt</option>');
        projects.forEach(project => {
            $taskProject.append(`<option value="${project.id}">${escapeHtml(project.name)}</option>`);
        });
        if (currentProject) {
            $taskProject.val(currentProject);
        }
    }

    /**
     * Utility Functions
     */
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

    /**
     * View Management
     */
    function switchView(view) {
        currentView = view;
        $('.view-container').hide();
        $('#' + view + 'View').show();

        // Update nav active state
        $('.nav-link').removeClass('active');
        $(`.nav-link[data-view="${view}"]`).addClass('active');

        // Render the appropriate view
        if (view === 'tasks') {
            renderTasks();
        } else if (view === 'projects') {
            renderProjects();
        } else if (view === 'priorities') {
            renderPriorities();
        }
    }

    /**
     * Global Functions (accessible from HTML onclick attributes)
     */
    window.toggleTaskDone = function (id) {
        TaskManager.toggleDone(id);
        renderTasks();
    };

    window.editTask = function (id) {
        const task = TaskManager.getById(id);
        if (!task) return;

        $('#taskId').val(task.id);
        $('#taskTitle').val(task.title);
        $('#taskDueDate').val(task.dueDate || '');
        $('#taskPriority').val(task.priorityId || '');
        $('#taskProject').val(task.projectId || '');
        $('#taskModalLabel').text('Aufgabe bearbeiten');

        taskModal.show();
    };

    window.deleteTask = function (id) {
        if (confirm('Möchten Sie diese Aufgabe wirklich löschen?')) {
            TaskManager.delete(id);
            renderTasks();
        }
    };

    window.editProject = function (id) {
        const project = ProjectManager.getById(id);
        if (!project) return;

        $('#projectId').val(project.id);
        $('#projectName').val(project.name);
        $('#projectModalLabel').text('Projekt bearbeiten');

        projectModal.show();
    };

    window.deleteProject = function (id) {
        if (confirm('Möchten Sie dieses Projekt wirklich löschen? Die Projektzuordnung wird von allen Aufgaben entfernt.')) {
            ProjectManager.delete(id);
            renderProjects();
            updateFilterOptions();
            updateTaskFormOptions();
            if (currentView === 'tasks') {
                renderTasks();
            }
        }
    };

    window.editPriority = function (id) {
        const priority = PriorityManager.getById(id);
        if (!priority) return;

        $('#priorityId').val(priority.id);
        $('#priorityName').val(priority.name);
        $('#priorityModalLabel').text('Priorität bearbeiten');

        priorityModal.show();
    };

    window.deletePriority = function (id) {
        if (confirm('Möchten Sie diese Priorität wirklich löschen? Die Priorität wird von allen Aufgaben entfernt.')) {
            PriorityManager.delete(id);
            renderPriorities();
            updateFilterOptions();
            updateTaskFormOptions();
            if (currentView === 'tasks') {
                renderTasks();
            }
        }
    };

    /**
     * Event Handlers
     */
    function initializeEventHandlers() {
        // Navigation
        $('.nav-link[data-view]').on('click', function (e) {
            e.preventDefault();
            const view = $(this).data('view');
            switchView(view);
        });

        // Task Modal
        $('#addTaskBtn').on('click', function () {
            $('#taskForm')[0].reset();
            $('#taskId').val('');
            $('#taskModalLabel').text('Neue Aufgabe');
            updateTaskFormOptions();
            taskModal.show();
        });

        $('#saveTaskBtn').on('click', function () {
            const form = $('#taskForm')[0];
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const taskData = {
                title: $('#taskTitle').val(),
                dueDate: $('#taskDueDate').val(),
                priorityId: $('#taskPriority').val(),
                projectId: $('#taskProject').val()
            };

            const taskId = $('#taskId').val();
            if (taskId) {
                TaskManager.update(taskId, taskData);
            } else {
                TaskManager.add(taskData);
            }

            taskModal.hide();
            renderTasks();
        });

        // Project Modal
        $('#addProjectBtn').on('click', function () {
            $('#projectForm')[0].reset();
            $('#projectId').val('');
            $('#projectModalLabel').text('Neues Projekt');
            projectModal.show();
        });

        $('#saveProjectBtn').on('click', function () {
            const form = $('#projectForm')[0];
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const projectData = {
                name: $('#projectName').val()
            };

            const projectId = $('#projectId').val();
            if (projectId) {
                ProjectManager.update(projectId, projectData);
            } else {
                ProjectManager.add(projectData);
            }

            projectModal.hide();
            renderProjects();
            updateFilterOptions();
            updateTaskFormOptions();
        });

        // Priority Modal
        $('#addPriorityBtn').on('click', function () {
            $('#priorityForm')[0].reset();
            $('#priorityId').val('');
            $('#priorityModalLabel').text('Neue Priorität');
            priorityModal.show();
        });

        $('#savePriorityBtn').on('click', function () {
            const form = $('#priorityForm')[0];
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const priorityData = {
                name: $('#priorityName').val()
            };

            const priorityId = $('#priorityId').val();
            if (priorityId) {
                PriorityManager.update(priorityId, priorityData);
            } else {
                PriorityManager.add(priorityData);
            }

            priorityModal.hide();
            renderPriorities();
            updateFilterOptions();
            updateTaskFormOptions();
        });

        // Filter and Sort
        $('#filterProject, #filterPriority, #sortBy, #sortOrder').on('change', function () {
            renderTasks();
        });

        $('#searchTask').on('input', function () {
            renderTasks();
        });
    }

    /**
     * Application Initialization
     */
    $(function () {
        // Initialize Bootstrap modals
        taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
        projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
        priorityModal = new bootstrap.Modal(document.getElementById('priorityModal'));

        // Initialize data
        initializeDefaultData();

        // Initialize event handlers
        initializeEventHandlers();

        // Update filter options
        updateFilterOptions();
        updateTaskFormOptions();

        // Show initial view
        switchView('tasks');
    });

})(jQuery);
