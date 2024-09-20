/// Variables to store notes by date
let notesByDate = JSON.parse(localStorage.getItem('notes')) || {};

// Show the dashboard and hide the landing page
function enterDashboard() {
    document.querySelector('.landing-page').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    renderTasks();
    renderNotes();
}

// Show the task modal
function addTask() {
    document.getElementById('task-modal').style.display = 'flex';
}

// Close the task modal
function closeModal() {
    document.getElementById('task-modal').style.display = 'none';
}

// Save a new task
function saveTask() {
    const taskName = document.getElementById('task-name').value;
    const taskDetails = document.getElementById('task-details').value;

    if (taskName && taskDetails) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        const newTask = {
            id: new Date().getTime(), // Unique ID based on timestamp
            name: taskName,
            details: taskDetails,
            completed: false
        };

        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        renderTasks(); // Function to render the task list
        closeModal();
    } else {
        alert('Please fill out both fields.');
    }
}

// Render tasks
function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        if (task.completed) {
            taskCard.classList.add('completed');
        }

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.className = 'task-checkbox';
        taskCheckbox.checked = task.completed;
        taskCheckbox.onclick = function() {
            toggleTaskCompleted(task.id);
        };

        const taskLabel = document.createElement('label');
        const taskTitle = document.createElement('h3');
        taskTitle.textContent = task.name;

        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.details;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteTask(task.id);
        };

        taskLabel.appendChild(taskTitle);
        taskLabel.appendChild(taskDescription);

        taskCard.appendChild(taskCheckbox);
        taskCard.appendChild(taskLabel);
        taskCard.appendChild(deleteButton);

        taskList.appendChild(taskCard);
    });
}

// Toggle task completion
function toggleTaskCompleted(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    renderTasks();
}

// Delete a task
function deleteTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const updatedTasks = tasks.filter(task => task.id !== taskId);

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    renderTasks();
}

// Delete all tasks
function deleteAllTasks() {
    localStorage.removeItem('tasks');
    renderTasks();
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Show the notes section and hide tasks
function showNotesSection() {
    document.getElementById('tasks-section').style.display = 'none';
    document.getElementById('notes-section').style.display = 'block';
}

// Show the tasks section and hide notes
function showTasksSection() {
    document.getElementById('notes-section').style.display = 'none';
    document.getElementById('tasks-section').style.display = 'block';
}

// Show the note modal
function addNote() {
    document.getElementById('note-modal').style.display = 'flex';
}

// Close the note modal
function closeNoteModal() {
    document.getElementById('note-modal').style.display = 'none';
}

// Save a new note
function saveNote() {
    const noteDate = document.getElementById('note-date').value;
    const noteTitle = document.getElementById('note-title').value;
    const noteContent = document.getElementById('note-content').value;

    if (noteDate && noteContent && noteTitle) {
        notesByDate[noteDate] = { title: noteTitle, content: noteContent };
        localStorage.setItem('notes', JSON.stringify(notesByDate));
        renderNotes();
        closeNoteModal();
    } else {
        alert('Please fill out all fields.');
    }
}

// Render notes
function renderNotes() {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';

    for (const [date, note] of Object.entries(notesByDate)) {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';

        const noteTitle = document.createElement('h3');
        noteTitle.textContent = note.title;

        const noteContent = document.createElement('p');
        noteContent.textContent = note.content;

        const noteDate = document.createElement('small');
        noteDate.textContent = date;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteNote(date);
        };

        noteCard.appendChild(noteTitle);
        noteCard.appendChild(noteContent);
        noteCard.appendChild(noteDate);
        noteCard.appendChild(deleteButton);

        notesContainer.appendChild(noteCard);
    }
}

// Delete a note
function deleteNote(date) {
    delete notesByDate[date];
    localStorage.setItem('notes', JSON.stringify(notesByDate));
    renderNotes();
}
