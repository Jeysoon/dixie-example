import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, TodoList } from 'src/db';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  itemName = 'My new item';
  @Input() todoList: TodoList;
  // Observe an arbritary query:
  todoItems$ = liveQuery(
    () => this.listTodoItems()
  );
  constructor() { }

  ngOnInit(): void {
  }


  async listTodoItems(){
    return await db.todoItems.where({
      todoListId: this.todoList.id
    })
    .toArray()
  }


  async addItem(){
    await db.todoItems.add({
      title: this.itemName,
      todoListId:  this.todoList.id
    })
  }

  async deleteItem(primaryKey){
  console.log('deleteItem', primaryKey);
  // await db.todoItems.delete({
  //   todoListId:
  // })
  }
}

