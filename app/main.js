(function($){
    const STORAGE_KEYS = {
        tasks: 'tasks',
        projects: 'projects',
        priorities: 'priorities'
    };

    function uuid() {
        return URL.createObjectURL(new Blob()).slice(-36);
    }

    function load(key, defaultValue) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    }

    function save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    let tasks = load(STORAGE_KEYS.tasks, []);
    let projects = load(STORAGE_KEYS.projects, []);
    let priorities = load(STORAGE_KEYS.priorities, [
        {id: uuid(), name: 'Low'},
        {id: uuid(), name: 'Medium'},
        {id: uuid(), name: 'High'}
    ]);

    function persist() {
        save(STORAGE_KEYS.tasks, tasks);
        save(STORAGE_KEYS.projects, projects);
        save(STORAGE_KEYS.priorities, priorities);
    }

    function refreshLists() {
        refreshTaskList();
        refreshProjectList();
        refreshPriorityList();
        fillSelectOptions($('#taskProject'), projects);
        fillSelectOptions($('#taskPriority'), priorities);
        fillSelectOptions($('#filterProject'), [{id:'', name:'Projekt'}, ...projects]);
        fillSelectOptions($('#filterPriority'), [{id:'', name:'Priorität'}, ...priorities]);
    }

    function fillSelectOptions(select, items) {
        select.empty();
        items.forEach(i => select.append(`<option value="${i.id}">${i.name}</option>`));
    }

    function refreshTaskList() {
        let list = $('#taskList').empty();
        let filtered = tasks.filter(t => {
            let prj = $('#filterProject').val();
            let prio = $('#filterPriority').val();
            return (!prj || t.projectId === prj) && (!prio || t.priorityId === prio);
        });

        let sort = $('#sort').val();
        if(sort === 'dueDateAsc') filtered.sort((a,b)=>(a.dueDate||'').localeCompare(b.dueDate||''));
        if(sort === 'dueDateDesc') filtered.sort((a,b)=>(b.dueDate||'').localeCompare(a.dueDate||''));
        if(sort === 'priorityAsc') filtered.sort((a,b)=>getPriorityName(a).localeCompare(getPriorityName(b)));
        if(sort === 'priorityDesc') filtered.sort((a,b)=>getPriorityName(b).localeCompare(getPriorityName(a)));

        filtered.forEach(t => {
            const prjName = getProjectName(t);
            const prioName = getPriorityName(t);
            const due = t.dueDate ? ` - ${t.dueDate}` : '';
            const checked = t.done ? 'checked' : '';
            let item = $(
                `<li class="list-group-item d-flex align-items-center justify-content-between">
                    <div>
                        <input class="form-check-input me-2" type="checkbox" data-id="${t.id}" ${checked}>
                        <span class="me-2 fw-bold">${t.title}</span>
                        <span class="badge bg-secondary me-1">${prioName}</span>
                        <span class="badge bg-info text-dark me-1">${prjName}</span>
                        <small class="text-muted">${due}</small>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-outline-secondary editTask" data-id="${t.id}">Bearbeiten</button>
                        <button class="btn btn-sm btn-outline-danger deleteTask" data-id="${t.id}">Löschen</button>
                    </div>
                </li>`);
            list.append(item);
        });
    }

    function refreshProjectList() {
        let list = $('#projectList').empty();
        projects.forEach(p => list.append(
            `<li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${p.name}</span>
                <div>
                    <button class="btn btn-sm btn-outline-secondary editProject" data-id="${p.id}">Bearbeiten</button>
                    <button class="btn btn-sm btn-outline-danger deleteProject" data-id="${p.id}">Löschen</button>
                </div>
            </li>`));
    }

    function refreshPriorityList() {
        let list = $('#priorityList').empty();
        priorities.forEach(p => list.append(
            `<li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${p.name}</span>
                <div>
                    <button class="btn btn-sm btn-outline-secondary editPriority" data-id="${p.id}">Bearbeiten</button>
                    <button class="btn btn-sm btn-outline-danger deletePriority" data-id="${p.id}">Löschen</button>
                </div>
            </li>`));
    }

    function getProjectName(t){
        return projects.find(p=>p.id===t.projectId)?.name || '';
    }
    function getPriorityName(t){
        return priorities.find(p=>p.id===t.priorityId)?.name || '';
    }

    function openModal(type, id){
        $('#itemForm')[0].reset();
        $('#taskFields, #nameField').addClass('d-none');
        // ensure required attributes are set only for the visible fields
        $('#taskTitle').prop('required', false);
        $('#itemName').prop('required', false);
        $('#itemId').val(id || '');
        $('#itemType').val(type);
        if(type==='task'){
            $('#taskFields').removeClass('d-none');
            $('#taskTitle').prop('required', true);
            if(id){
                const t = tasks.find(t=>t.id===id);
                $('#taskTitle').val(t.title);
                $('#taskDueDate').val(t.dueDate);
                $('#taskPriority').val(t.priorityId);
                $('#taskProject').val(t.projectId);
                $('#taskDone').prop('checked', t.done);
            }
            $('#itemModalLabel').text(id ? 'Aufgabe bearbeiten' : 'Neue Aufgabe');
        } else {
            $('#nameField').removeClass('d-none');
            $('#itemName').prop('required', true);
            let item;
            if(type==='project') item = projects.find(p=>p.id===id);
            if(type==='priority') item = priorities.find(p=>p.id===id);
            $('#itemName').val(item? item.name : '');
            $('#itemModalLabel').text(id ? 'Eintrag bearbeiten' : 'Neuer Eintrag');
        }
        const modal = new bootstrap.Modal(document.getElementById('itemModal'));
        modal.show();
    }

    $('#newTaskBtn').on('click', ()=>openModal('task'));
    $('#newProjectBtn').on('click', ()=>openModal('project'));
    $('#newPriorityBtn').on('click', ()=>openModal('priority'));

    $('#filterProject, #filterPriority, #sort').on('change', refreshTaskList);

    $('#taskList').on('change', 'input[type=checkbox]', function(){
        const id = $(this).data('id');
        const task = tasks.find(t=>t.id===id);
        task.done = this.checked;
        persist();
        refreshTaskList();
    });

    $('#taskList').on('click','.editTask',e=>openModal('task',$(e.currentTarget).data('id')));
    $('#taskList').on('click','.deleteTask',e=>{delItem('task',$(e.currentTarget).data('id'))});
    $('#projectList').on('click','.editProject',e=>openModal('project',$(e.currentTarget).data('id')));
    $('#projectList').on('click','.deleteProject',e=>{delItem('project',$(e.currentTarget).data('id'))});
    $('#priorityList').on('click','.editPriority',e=>openModal('priority',$(e.currentTarget).data('id')));
    $('#priorityList').on('click','.deletePriority',e=>{delItem('priority',$(e.currentTarget).data('id'))});

    function delItem(type,id){
        if(type==='task') tasks = tasks.filter(t=>t.id!==id);
        if(type==='project') projects = projects.filter(p=>p.id!==id);
        if(type==='priority') priorities = priorities.filter(p=>p.id!==id);
        persist();
        refreshLists();
    }

    $('#itemForm').on('submit', function(event){
        event.preventDefault();
        const type = $('#itemType').val();
        const id = $('#itemId').val() || uuid();
        if(type==='task'){
            const existing = tasks.find(t=>t.id===id);
            const data = {
                id,
                title: $('#taskTitle').val(),
                dueDate: $('#taskDueDate').val(),
                priorityId: $('#taskPriority').val(),
                projectId: $('#taskProject').val(),
                done: $('#taskDone').prop('checked')
            };
            if(existing){
                Object.assign(existing, data);
            } else {
                tasks.push(data);
            }
        } else if(type==='project'){
            const existing = projects.find(p=>p.id===id);
            if(existing){ existing.name = $('#itemName').val(); }
            else { projects.push({id, name: $('#itemName').val()}); }
        } else if(type==='priority'){
            const existing = priorities.find(p=>p.id===id);
            if(existing){ existing.name = $('#itemName').val(); }
            else { priorities.push({id, name: $('#itemName').val()}); }
        }
        persist();
        bootstrap.Modal.getInstance(document.getElementById('itemModal')).hide();
        refreshLists();
    });

    $(refreshLists);
})(jQuery);
