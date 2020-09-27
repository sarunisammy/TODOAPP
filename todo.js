const incompleteTskHandler = document.getElementById("incomplete-tasks"); //ul of #incomplete-tasks
const completeTaskHandler = document.getElementById("completed-tasks"); //completed-tasks
const todoInput = document.getElementById("new-task"); //Add a new task.
const addButton = document.getElementsByTagName("button")[0]; //first button

//New task list item
function createNewTaskElement(task) {
    const listItem = document.createElement("li"); // creati g list element
    const checkBox = document.createElement("input"); // creating checkbox
    const label = document.createElement("label"); //creating label for the list
    const deleteButton = document.createElement("button"); //creating button
    label.innerText = task;
    checkBox.type = "checkbox"; //declaring the type of check box
    deleteButton.innerText = "Delete-"; // creating the button name for delete
    deleteButton.className = "delete"; //creating the class name for delete
    listItem.appendChild(checkBox); //appending chbox child to the parent list
    listItem.appendChild(label); // appenfing label to the parent list
    listItem.appendChild(deleteButton); //appending delete button to the parent list
    return listItem;
}

function addTask(e) {
    const listItem = createNewTaskElement(todoInput.value);
    //checking if the field is empty and returning a null value so no todo is added
    if (todoInput.value.trim() === "") {

        return;
    } else {
        incompleteTskHandler.appendChild(listItem);
        eventHandler(listItem, completedTask);
        todoInput.value = "";
    }
    e.preventDefault(); //cancels the event default behavior
}

//Delete task from the list either in the complete sect or non complete.
function deleteTask() {
    const listItem = this.parentNode;
    const ul = listItem;
    ul.parentNode.removeChild(listItem);
    if (incompleteTskHandler.children.length <= 0 || completeTaskHandler.children.length <= 0) {
        alert("no more  task,might consider adding some ");
    }

}
//function for creating a complete task hasndler
function completedTask() {
    const listItem = this.parentNode; //list items fro the parentNode
    completeTaskHandler.appendChild(listItem); //appending completed task
    eventHandler(listItem, pendingTask);

}
//function for creating an incomplete task
function pendingTask() {
    const listItem = this.parentNode;
    incompleteTskHandler.appendChild(listItem);
    eventHandler(listItem, completedTask);
}

function eventHandler(taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector("input[type=checkbox]");

    const deleteButton = taskListItem.querySelector("button.delete");

    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler; //chebox onchange of evet to switch to complete or incomplete
}

addButton.addEventListener("click", addTask); //adding eventlistener to listen to adding button when clicked

[...incompleteTskHandler.children].forEach((nums) => {
    eventHandler(nums, completedTask);

});



[...completeTaskHandler.children].forEach((nums) => {

    eventHandler(nums, pendingTask);

})