import Dexie, { Table } from "dexie";

export interface TodoItem {
  id?: number;
  todoListId: number;
  title: string;
  done?: boolean;
}
export interface TodoList {
  id?: number;
  title: string;
}
export interface Article {
  article: number;
  color: string;
  size: string;
  name: string;
  shape: string;
}
export class AppDb extends Dexie{
  todoItems!: Table<TodoItem, number>;
  todoLists!: Table<TodoList, number>;
  attributes!: Table<Article, number>;
  customAttributes!: Table<{article: number, name: string}, number> | Table<any, number>;

  // attributes: 'article, color, size, name, shape'
  constructor(){
    //Argument on super will be database name
    super('ngdexieliveQuery');
    this.version(7).stores({
    attributes: 'article',
    customAttributes: 'article',
    });
    this.on('populate', () => this.populate());
  }
  async populate(){
    // await db.customAttributes.bulkAdd([
    //   {
    //     article: Math.floor(Math.random() * 10),
    //     name: 'first entry'
    //   }
    // ])
    await db.attributes.bulkAdd([
      {
        article: Math.floor(Math.random() * 10),
        color: 'blue',
        size: 'm',
        name: 'blazer',
        shape: 'square'
      },
      {
        article: Math.floor(Math.random() * 10),
        color: 'red',
        size: 's',
        name: 'hoodie',
        shape: 'circle'
      },
      {
        article: Math.floor(Math.random() * 10),
        color: 'green',
        size: 'm',
        name: 'pants',
        shape: 'rectangle'
      },
      {
        article: Math.floor(Math.random() * 10),
        color: 'black',
        size: 'xl',
        name: 'shirt',
        shape: 'triangle'
      },
      {
        article: Math.floor(Math.random() * 10),
        color: 'pink',
        size: 'xs',
        name: 'shirt',
        shape: 'circle'
      },

    ])
  }
}

export const db = new AppDb();



// export interface TodoList {
//   id?: number;
//   title: string;
// }
// export interface TodoItem {
//   id?: number;
//   todoListId: number;
//   title: string;
//   done?: boolean;
// }

// export class AppDB extends Dexie {
//   todoItems!: Table<TodoItem, number>;
//   todoLists!: Table<TodoList, number>;

//   constructor() {
//     super('ngdexieliveQuery');
//     this.version(1).stores({
//       todoLists: '++id',
//       todoItems: '++id, todoListId',
//     });
//     this.on('populate', () => this.populate());
//   }

//   async populate() {
//     const todoListId = await db.todoLists.add({
//       title: 'To Do Today',
//     });
//     await db.todoItems.bulkAdd([
//       {
//         todoListId,
//         title: 'Feed the birds',
//       },
//       {
//         todoListId,
//         title: 'Watch a movie',
//       },
//       {
//         todoListId,
//         title: 'Have some sleep',
//       },
//     ]);
//   }
// }

// export const db = new AppDB();

/*
Change the concatenated array
[
  {
    article: numberId,
    nameOfNewAttribute: string; value -> (blazer black) Eg. newNames : 'blazer black'
  }
  {
    name: 'jeyson',
    [`${property}`] : 'jeyson'
  }
]


*/



//Copy of whole file

// import Dexie, { Table } from "dexie";

// export interface TodoItem {
//   id?: number;
//   todoListId: number;
//   title: string;
//   done?: boolean;
// }
// export interface TodoList {
//   id?: number;
//   title: string;
// }
// export interface Article {
//   article: number;
//   color: string;
//   size: string;
//   name: string;
//   shape: string;
// }
// export class AppDb extends Dexie{
//   todoItems!: Table<TodoItem, number>;
//   todoLists!: Table<TodoList, number>;
//   attributes!: Table<Article, number>;

//   // attributes: 'article, color, size, name, shape'
//   constructor(){
//     //Argument on super will be database name
//     super('ngdexieliveQuery');
//     this.version(7).stores({
//     todoLists: '++id',
//     todoItems: '++id, todoListId',
//     attributes: 'article, color, size, name, shape'
//     });
//     this.on('populate', () => this.populate());
//   }
//   async populate(){
//     const todoListId = await db.todoLists.add({
//       title: 'Todo today'
//     });

//     await db.todoItems.bulkAdd([
//       {
//         todoListId,
//         title: 'Feed the birds',
//       },
//       {
//         todoListId,
//         title: 'Watch a movie',
//       },
//       {
//         todoListId,
//         title: 'Pet the cat',
//       }
//     ]);
//     await db.attributes.bulkAdd([
//       {
//         article: Math.floor(Math.random() * 10),
//         color: 'blue',
//         size: 'm',
//         name: 'blazer',
//         shape: 'square'
//       },
//       {
//         article: Math.floor(Math.random() * 10),
//         color: 'red',
//         size: 's',
//         name: 'hoodie',
//         shape: 'circle'
//       },
//       {
//         article: Math.floor(Math.random() * 10),
//         color: 'green',
//         size: 'm',
//         name: 'pants',
//         shape: 'rectangle'
//       },
//       {
//         article: Math.floor(Math.random() * 10),
//         color: 'black',
//         size: 'xl',
//         name: 'shirt',
//         shape: 'triangle'
//       },
//       {
//         article: Math.floor(Math.random() * 10),
//         color: 'pink',
//         size: 'xs',
//         name: 'shirt',
//         shape: 'circle'
//       },

//     ])
//   }
// }

// export const db = new AppDb();



// export interface TodoList {
//   id?: number;
//   title: string;
// }
// export interface TodoItem {
//   id?: number;
//   todoListId: number;
//   title: string;
//   done?: boolean;
// }

// export class AppDB extends Dexie {
//   todoItems!: Table<TodoItem, number>;
//   todoLists!: Table<TodoList, number>;

//   constructor() {
//     super('ngdexieliveQuery');
//     this.version(1).stores({
//       todoLists: '++id',
//       todoItems: '++id, todoListId',
//     });
//     this.on('populate', () => this.populate());
//   }

//   async populate() {
//     const todoListId = await db.todoLists.add({
//       title: 'To Do Today',
//     });
//     await db.todoItems.bulkAdd([
//       {
//         todoListId,
//         title: 'Feed the birds',
//       },
//       {
//         todoListId,
//         title: 'Watch a movie',
//       },
//       {
//         todoListId,
//         title: 'Have some sleep',
//       },
//     ]);
//   }
// }

// export const db = new AppDB();

/*
Change the concatenated array
[
  {
    article: numberId,
    nameOfNewAttribute: string; value -> (blazer black) Eg. newNames : 'blazer black'
  }
  {
    name: 'jeyson',
    [`${property}`] : 'jeyson'
  }
]


*/
