import { Component, OnInit } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  todo = '';
  addTodo() {
    console.log('adding   ....');

    const task = this.todo.trim();
    this.todo = '';
    if (task) {
      this.tasks.push({
        task,
        status: 'active',
      });
      this.#tasks.push({
        task,
        status: 'active',
      });
    }
  }
  currentStatus: string = 'all';
  #tasks: Task[] = [
    {
      task: 'Complete online JavaScript course',
      status: 'complete',
    },

    {
      task: 'Jog around the park 3x',
      status: 'active',
    },
    {
      task: '10 minutes meditation',
      status: 'active',
    },
    {
      task: 'Read for 1 hour',
      status: 'active',
    },
    {
      task: 'Pick up groceries',
      status: 'active',
    },
    {
      task: 'Complete Todo App on Frontend Mentor',
      status: 'active',
    },
  ];
  mode: 'dark' | 'light' = 'light';
  tasks: Task[] = [];
  ngOnInit() {
    this.tasks = [...this.#tasks];
  }
  swithModes() {
    this.mode = this.mode === 'light' ? 'dark' : 'light';
  }
  filterTasks(key: string) {
    this.currentStatus = key;
    if (key === 'all') {
      this.tasks = [...this.#tasks];
    } else {
      this.tasks = this.#tasks.filter((task) => task.status === key);
    }
  }
  completeTask(index: number) {
    console.log('index', index);
    const task = this.tasks[index];
    const i = this.#tasks.findIndex((e) => e.task === task.task);
    if (task.status !== 'complete') {
      task.status = 'complete';
    } else {
      task.status = 'active';
    }
    this.tasks[index] = task;
    this.#tasks[i] = task;
  }
  onDrop(event: DndDropEvent, tasks: Task[]) {
    console.log('on drop ==>', event);
    let index = event.index;

    if (typeof index === 'undefined') {
      index = tasks.length;
    }

    tasks.splice(index, 0, event.data);
    this.#tasks = [...this.tasks];
  }
  onDragged(task: Task, tasks: Task[], effect: DropEffect, ind: number) {
    console.log('ON DRAGGED ==>', effect, ind);
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
  }
  clearCompleted() {
    this.tasks = this.tasks.filter((task) => task.status === 'active');
    this.#tasks = [...this.tasks];
  }
}
interface Task {
  task: string;
  status: 'complete' | 'active';
}
