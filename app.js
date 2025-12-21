/**
 * ToDo App - Main Application Logic
 * Uses vanilla JavaScript and localStorage for data persistence
 */

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

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
    document.getElementById('addTaskBtn').addEventListener('click', () => openTaskModal());
    document.getElementById('saveTaskBtn').addEventListener('click', () => saveTask());
    
    // Project events
    document.getElementById('addProjectBtn').addEventListener('click', () => openProjectModal());
    document.getElementById('saveProjectBtn').addEventListener('click', () => saveProject());
    
    // Priority events
    document.getElementById('addPriorityBtn').addEventListener('click', () => openPriorityModal());
    document.getElementById('savePriorityBtn').addEventListener('click', () => savePriority());
    
    // Filter and search events
    document.getElementById('searchTask').addEventListener('input', () => loadTasks());
    document.getElementById('filterPriority').addEventListener('change', () => loadTasks());
    document.getElementById('filterProject').addEventListener('change', () => loadTasks());
    document.getElementById('sortBy').addEventListener('change', () => loadTasks());
}

/**
 * Tab switching
 */
function switchTab(tabName) {
    // Remove active class from all tabs and panes
    document.querySelectorAll('.nav-tabs button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    
    // Add active class to selected tab and pane
    document.getElementById(tabName + '-tab').classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

/**
 * Modal functions
 */
function showModal(modalId) {
    document.getElementById(modalId).classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

/**
 * TASK MANAGEMENT
 */

function loadTasks() {
    let tasks = loadFromLocalStorage('tasks') || [];
    const priorities = loadFromLocalStorage('priorities') || [];
    const projects = loadFromLocalStorage('projects') || [];
    
    // Apply search filter
    const searchTerm = document.getElementById('searchTask').value.toLowerCase();
    if (searchTerm) {
        tasks = tasks.filter(task => 
            task.title.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply priority filter
    const priorityFilter = document.getElementById('filterPriority').value;
    if (priorityFilter) {
        tasks = tasks.filter(task => task.priorityId === priorityFilter);
    }
    
    // Apply project filter
    const projectFilter = document.getElementById('filterProject').value;
    if (projectFilter) {
        tasks = tasks.filter(task => task.projectId === projectFilter);
    }
    
    // Apply sorting
    const sortBy = document.getElementById('sortBy').value;
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
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';
    
    if (tasks.length === 0) {
        tasksList.innerHTML = '<div class="no-data-alert">📭 Keine Aufgaben gefunden</div>';
        return;
    }
    
    tasks.forEach(task => {
        const priority = priorities.find(p => p.id === task.priorityId);
        const project = projects.find(p => p.id === task.projectId);
        
        // Determine if task is overdue or due soon
        let cardClass = 'card';
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
        
        let priorityBadgeClass = 'badge';
        if (priority) {
            if (priority.name.toLowerCase() === 'low') {
                priorityBadgeClass += ' priority-low';
            } else if (priority.name.toLowerCase() === 'medium') {
                priorityBadgeClass += ' priority-medium';
            } else if (priority.name.toLowerCase() === 'high') {
                priorityBadgeClass += ' priority-high';
            }
        }
        
        const taskCard = document.createElement('div');
        taskCard.className = cardClass;
        taskCard.innerHTML = `
            <h5 class="task-title">${escapeHtml(task.title)}</h5>
            <div class="task-meta">
                ${task.dueDate ? `<span>📅 ${formatDate(task.dueDate)}</span> ` : ''}
                ${priority ? `<span class="${priorityBadgeClass}">${escapeHtml(priority.name)}</span> ` : ''}
                ${project ? `<span>📁 ${escapeHtml(project.name)}</span>` : ''}
            </div>
            <div class="task-actions">
                <button class="btn btn-sm ${task.done ? 'btn-warning' : 'btn-success'}" onclick="toggleTaskDone('${task.id}')">
                    ${task.done ? '🔄 Wiederherstellen' : '✓ Erledigt'}
                </button>
                <button class="btn btn-sm btn-primary" onclick="openTaskModal('${task.id}')">
                    ✏️ Bearbeiten
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask('${task.id}')">
                    🗑️ Löschen
                </button>
            </div>
        `;
        
        tasksList.appendChild(taskCard);
    });
}

function openTaskModal(taskId = null) {
    const priorities = loadFromLocalStorage('priorities') || [];
    const projects = loadFromLocalStorage('projects') || [];
    
    // Populate priority dropdown
    const prioritySelect = document.getElementById('taskPriority');
    prioritySelect.innerHTML = '';
    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority.id;
        option.textContent = priority.name;
        prioritySelect.appendChild(option);
    });
    
    // Populate project dropdown
    const projectSelect = document.getElementById('taskProject');
    projectSelect.innerHTML = '<option value="">Kein Projekt</option>';
    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.name;
        projectSelect.appendChild(option);
    });
    
    if (taskId) {
        // Edit mode
        const tasks = loadFromLocalStorage('tasks') || [];
        const task = tasks.find(t => t.id === taskId);
        
        if (task) {
            document.getElementById('taskModalTitle').textContent = 'Aufgabe bearbeiten';
            document.getElementById('taskId').value = task.id;
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDueDate').value = task.dueDate || '';
            document.getElementById('taskPriority').value = task.priorityId || '';
            document.getElementById('taskProject').value = task.projectId || '';
        }
    } else {
        // Add mode
        document.getElementById('taskModalTitle').textContent = 'Aufgabe hinzufügen';
        document.getElementById('taskId').value = '';
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDueDate').value = '';
        document.getElementById('taskPriority').value = priorities.length > 0 ? priorities[0].id : '';
        document.getElementById('taskProject').value = '';
    }
    
    showModal('taskModal');
}

function saveTask() {
    const title = document.getElementById('taskTitle').value.trim();
    
    if (!title) {
        alert('Bitte geben Sie einen Titel ein.');
        return;
    }
    
    const taskId = document.getElementById('taskId').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const priorityId = document.getElementById('taskPriority').value;
    const projectId = document.getElementById('taskProject').value;
    
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
    closeModal('taskModal');
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
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = '';
    
    if (projects.length === 0) {
        projectsList.innerHTML = '<div class="no-data-alert">📁 Keine Projekte vorhanden</div>';
        return;
    }
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'card list-item-card';
        projectCard.innerHTML = `
            <h6>${escapeHtml(project.name)}</h6>
            <div class="list-item-actions">
                <button class="btn btn-sm btn-primary" onclick="openProjectModal('${project.id}')">✏️</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProject('${project.id}')">🗑️</button>
            </div>
        `;
        projectsList.appendChild(projectCard);
    });
}

function openProjectModal(projectId = null) {
    if (projectId) {
        // Edit mode
        const projects = loadFromLocalStorage('projects') || [];
        const project = projects.find(p => p.id === projectId);
        
        if (project) {
            document.getElementById('projectModalTitle').textContent = 'Projekt bearbeiten';
            document.getElementById('projectId').value = project.id;
            document.getElementById('projectName').value = project.name;
        }
    } else {
        // Add mode
        document.getElementById('projectModalTitle').textContent = 'Projekt hinzufügen';
        document.getElementById('projectId').value = '';
        document.getElementById('projectName').value = '';
    }
    
    showModal('projectModal');
}

function saveProject() {
    const name = document.getElementById('projectName').value.trim();
    
    if (!name) {
        alert('Bitte geben Sie einen Namen ein.');
        return;
    }
    
    const projectId = document.getElementById('projectId').value;
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
    closeModal('projectModal');
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
    const prioritiesList = document.getElementById('prioritiesList');
    prioritiesList.innerHTML = '';
    
    if (priorities.length === 0) {
        prioritiesList.innerHTML = '<div class="no-data-alert">⚠️ Keine Prioritäten vorhanden</div>';
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
        }
        
        const priorityCard = document.createElement('div');
        priorityCard.className = 'card list-item-card';
        priorityCard.innerHTML = `
            <div>
                <span class="${badgeClass}">${escapeHtml(priority.name)}</span>
            </div>
            <div class="list-item-actions">
                <button class="btn btn-sm btn-primary" onclick="openPriorityModal('${priority.id}')">✏️</button>
                <button class="btn btn-sm btn-danger" onclick="deletePriority('${priority.id}')">🗑️</button>
            </div>
        `;
        prioritiesList.appendChild(priorityCard);
    });
}

function openPriorityModal(priorityId = null) {
    if (priorityId) {
        // Edit mode
        const priorities = loadFromLocalStorage('priorities') || [];
        const priority = priorities.find(p => p.id === priorityId);
        
        if (priority) {
            document.getElementById('priorityModalTitle').textContent = 'Priorität bearbeiten';
            document.getElementById('priorityId').value = priority.id;
            document.getElementById('priorityName').value = priority.name;
        }
    } else {
        // Add mode
        document.getElementById('priorityModalTitle').textContent = 'Priorität hinzufügen';
        document.getElementById('priorityId').value = '';
        document.getElementById('priorityName').value = '';
    }
    
    showModal('priorityModal');
}

function savePriority() {
    const name = document.getElementById('priorityName').value.trim();
    
    if (!name) {
        alert('Bitte geben Sie einen Namen ein.');
        return;
    }
    
    const priorityId = document.getElementById('priorityId').value;
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
    closeModal('priorityModal');
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
    const priorityFilter = document.getElementById('filterPriority');
    const currentPriorityFilter = priorityFilter.value;
    priorityFilter.innerHTML = '<option value="">Alle Prioritäten</option>';
    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority.id;
        option.textContent = priority.name;
        priorityFilter.appendChild(option);
    });
    priorityFilter.value = currentPriorityFilter;
    
    // Populate project filter
    const projectFilter = document.getElementById('filterProject');
    const currentProjectFilter = projectFilter.value;
    projectFilter.innerHTML = '<option value="">Alle Projekte</option>';
    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.name;
        projectFilter.appendChild(option);
    });
    projectFilter.value = currentProjectFilter;
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
