document.addEventListener('DOMContentLoaded', () => {
  const newTaskInput = document.getElementById('new-task');
  const addTaskButton = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');
  
  let tasks = [];
  
  // Load tasks from localStorage when app starts
  function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
      renderTasks();
    }
  }
  
  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Add a new task
  function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
      tasks.push({
        text: taskText,
        completed: false
      });
      newTaskInput.value = '';
      saveTasks();
      renderTasks();
    }
  }
  
  // Toggle task completion status
  function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }
  
  // Delete a task
  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
  
  // Render all tasks to the DOM
  function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => toggleTaskCompletion(index));
      
      const taskText = document.createElement('span');
      taskText.className = `task-text ${task.completed ? 'completed' : ''}`;
      taskText.textContent = task.text;
      
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-btn';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteTask(index));
      
      taskItem.appendChild(checkbox);
      taskItem.appendChild(taskText);
      taskItem.appendChild(deleteButton);
      
      taskList.appendChild(taskItem);
    });
  }
  
  // Event listeners
  addTaskButton.addEventListener('click', addTask);
  
  newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });
  
  // Initialize
  loadTasks();
});
