'use strict';

var TASKER = TASKER || {};

TASKER.app = function(){
  var listContainer = "listContainer";
  /**
   * [Lists description]
   */
   var Lists = function(){
    this.lists = [];
    var dragFrom, dragTo, dragTaskName, drakTaskDesc;

    document.getElementById(listContainer).addEventListener("dragend", function(e){
      console.log(e.target.parentNode.attributes[0].nodeValue);
      console.dir(e.dataTransfer);
      console.dir(e);
    }, false);
    document.getElementById(listContainer).addEventListener("drop", function(e){
      console.log("droppppppppp");
      console.dir(e);
      console.log(e.dataTransfer.getData("Text"));
    }, false);
  };
  Lists.prototype.addList = function(name) {
    var newList = new List(name)
    this.lists.push(newList);
  };
  Lists.prototype.removeList = function(index) {
    this.lists = this.lists.slice(index,1);
  };
  Lists.prototype.moveTask = function(from, to, TaskName, TaskDesc) {
    console.log(from, to, TaskName, TaskDesc);
  };
  Lists.prototype.drawLists = function() {
    var newList, newHeading, newTaskList, newTaskAddButton;
    document.getElementById(listContainer).innerHTML = '';
    for(var i in this.lists){
      newList = document.createElement("div");
      newHeading = document.createElement("h1");

      newList.className = "list";

      newHeading.innerText = this.lists[i].listName;
      newTaskList = this.lists[i].drawTasks(i);

      newList.appendChild(newHeading);
      newList.appendChild(newTaskList);

      document.getElementById(listContainer).appendChild(newList);
    }
  };

  /**
   * [List description]
   * @param {[type]} name [description]
   */
   var List = function(name){
    this.listName = name;
    this.tasks = [];
  };
  List.prototype.addTask = function(name, description) {
    var newTask = new Task(name, description);
    this.tasks.push(newTask);
  };
  List.prototype.removeTask = function(index) {
    this.tasks = this.tasks.slice(index,1);
  };
  List.prototype.editTask = function(index, name, description) {
    this.tasks[index].edit(name, description);
  };
  List.prototype.drawTasks = function(index) {
    var newlist, newTask, newTitle, newDesc, newDelete, newEdit,
    newTaskAddButton, container, _this = this;

    container = document.createElement("div");
    newTaskAddButton = document.createElement("div");
    newTaskAddButton.className = "add btn";
    newTaskAddButton.innerText="add new task";

    newTaskAddButton.onclick= function(){
      var newTask_form = document.createElement("form");
      var newTask_name = document.createElement("input");
      var newTask_desc = document.createElement("input");
      var newTask_button = document.createElement("button");

      newTask_name.type="text";
      newTask_desc.type="text";
      newTask_name.placeholder="Task name";
      newTask_desc.placeholder="Task description";
      newTask_button.innerText="Add";
      newTask_button.className = "btn";

      newTask_form.onsubmit = function(e){
        e.preventDefault();
        _this.addTask(newTask_name.value, newTask_desc.value );
        newTask_form.parentNode.removeChild(newTask_form);
      };

      newTask_form.appendChild(newTask_name);
      newTask_form.appendChild(newTask_desc);
      newTask_form.appendChild(newTask_button);

      container.appendChild(newTask_form);
    };

    newlist = document.createElement("ul");
    for(var i in this.tasks){
      newTask = document.createElement("li");
      newTitle = document.createElement("h2");
      newDesc = document.createElement("p");
      newDelete = document.createElement("a");
      newEdit = document.createElement("a");

      newDelete.className = "delete";
      newEdit.className = "edit";

      newTask.setAttribute("data-index",i);
      newTask.draggable="true";
      newTask.setAttribute("data-name", this.tasks[i].name);
      newTask.setAttribute("data-desc", this.tasks[i].description);
      newTitle.innerText = this.tasks[i].name;
      newDesc.innerText = this.tasks[i].description;
      newDelete.innerText = "x";
      newEdit.innerText = "e";

      newDelete.onclick = function(){
        _this.removeTask(this.parentNode.getAttribute("data-index"));
        this.parentNode.style.display = "none";
      };
      newEdit.onclick = function(){
        alert("TODO");
      };

      newTask.appendChild(newTitle);
      newTask.appendChild(newDesc);
      newTask.appendChild(newEdit);
      newTask.appendChild(newDelete);
      newlist.appendChild(newTask);
    }
    newlist.setAttribute("data-listIndex", index);
    container.appendChild(newlist);
    container.appendChild(newTaskAddButton);
    return container;
  };

  /**
   * [Task description]
   * @param {[type]} name        [description]
   * @param {[type]} description [description]
   */
   var Task = function(name, description){
    this.name = name;
    this.description = description;
  };
  Task.prototype.edit = function(name, description) {
    this.name = name;
    this.description = description;
  };

  /**
   * [init description]
   * @return {[type]} [description]
   */
   var init = function(){
    var lists = new Lists();
    /**
     * [onclick description]
     * @return {[type]} [description]
     */
     document.getElementById("addNewList").onclick = function(){
      document.getElementById("addNewListForm").style.display = "block";
      document.getElementById("addNewListForm").onsubmit = function(e){
        e.preventDefault();
        lists.addList(document.getElementById("input_listName").value);
        document.getElementById("addNewListForm").style.display = "none";
        document.getElementById("input_listName").value ="";
        lists.drawLists();
      };
    };// add new list


  }();
}();