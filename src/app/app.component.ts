import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { liveQuery } from 'dexie';
import { map } from 'rxjs';
import { db, TodoList } from 'src/db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'dixieJs';

  constructor() {}

  selectAttributesForm: FormGroup;

  tableProperties = [];

  //Secondary table headers
  temporaryViewTableProperties = [];


  combinedAttributes = [];

  combinedAndSelectedAttributes = [];

  // staticTempData = ['article', 'miau'];

  //We can listen to observable
  todoList$ = liveQuery(() => db.todoLists.toArray());
  dataSource$ = liveQuery(() => db.attributes.toArray());

  temporaryViewTableData$ = liveQuery(() => db.customAttributes.toArray());

  // selectedFirstColumnKeys$;
  // selectedSecondColumnKeys$;

  //new approach at starbucks
  getFirstColumnSelectedCollection;
  getSecondColumnSelectedCollection;

  listName = 'My new list';
  firstColumnSelected = '';
  secondColumnSelected = '';
  newNameSelected = '';
  secondOptions = ['article', 'apple'];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.selectAttributesForm = new FormGroup({
      first_attribute: new FormControl(null),
      second_attribute: new FormControl(null),
      new_name_attribute: new FormControl(''),
    });

    //Get headers for main table
    this.dataSource$.subscribe((data) => {

      data.forEach((element) => {
        console.log('data.forEach->element', element);
        for (const [key, value] of Object.entries(element)) {
          console.log('key', key);
          console.log('exist in this.tableProperties?',this.tableProperties.includes(key));
          if(!this.tableProperties.includes(key)){
            this.tableProperties.push(key);
            console.log('headers for tableProperties', this.tableProperties)
          }
        }

      })
    });

    //Get headers for temporary table
    this.temporaryViewTableData$.subscribe((data) => {
      // console.log('data', data);
      data.forEach((element) => {
        // console.log('data.forEach->element', element);
        for (const [key, value] of Object.entries(element)) {
          // console.log('key', key);
          if(!this.temporaryViewTableProperties.includes(key)){
            this.temporaryViewTableProperties.push(key);
            // console.log('headers for temporaryViewTablesProperties', this.temporaryViewTableProperties)
          }
        }
      })
    });
  }

  identifyList(index: number, list: TodoList) {
    return `${list.id}${list.title}`;
  }
  async addConcatenatedAttributes(combinedArray: any) {
    // console.log('CombinedArray', combinedArray);
    await db.customAttributes.bulkPut(combinedArray);
  }
  async insertSelectedColumns(selectedColumns){
    // console.log('selectedcolumns', selectedColumns);
    return await db.customAttributes.bulkPut(selectedColumns)
  }
  async getFirstColumnKeys() {
    return await db.attributes.orderBy(this.firstColumnSelected).keys();

  }
  async getSecondColumnKeys() {
    // return await db.attributes.get(9);
    return await db.attributes.orderBy(this.secondColumnSelected).keys();
  }

  // async getColumnsForAttributeTable(){
  //   return await db.customAttributes.orderBy('').keys();
  // }

  onConcatenate(
    first_column: SelectedColumn[],
    second_column: SelectedColumn[]
  ) {
    console.log('first_column', first_column);
    console.log('second_column', second_column);
    const transformFirstcolumn = first_column.map((item) => {
      return {
        articleId : item.articleId,
        first_column
      }
    })
    // const joinSelectedArrays = first_column.map((item, i) => {

    //   return {
    //     ...item,
    //   }
    // });
    // console.log("Step_1_join selected arrays", joinSelectedArrays);
    const combined = first_column.map((item, i) => {
      // console.log('item__?', item)
      return {

        article: item.articleId,
        [`${this.newNameSelected}`]: `${item.name}${' '}${second_column[i].name}`,
      };
    });

    this.combinedAttributes = combined;

    this.addConcatenatedAttributes(this.combinedAttributes);
  }
  onSubmit() {

    //Get first attribute selected. Eg. 'color'
    this.firstColumnSelected =
      this.selectAttributesForm.get('first_attribute').value;

    //Get second attribute selected. Eg. 'name'
    this.secondColumnSelected =
      this.selectAttributesForm.get('second_attribute').value;

    //Get new attribute name
    this.newNameSelected =
      this.selectAttributesForm.get('new_name_attribute').value;

    const columnsSelected = {
      first: this.firstColumnSelected,
      second: this.secondColumnSelected,
    };


    //Decided to switch to #newApproach
    // this.selectedFirstColumnKeys$ = liveQuery(() => this.getFirstColumnKeys());
    // this.selectedSecondColumnKeys$ = liveQuery(() =>this.getSecondColumnKeys());

    this.dataSource$.subscribe((datasource) => {

      //#newApproach
      this.getFirstColumnSelectedCollection = datasource.map((item) => {
        //Remove this if stops working - working 28:53
        // console.log('newItem', item);
        return {
          articleId: item.article,
          name: item[this.firstColumnSelected],
        };
        // return {
        //   articleId: item.article,
        //   [`${item.name}`] : item.name
        // }
      });

      console.log('Group_2[first_prop]🌶 ',this.getFirstColumnSelectedCollection);
      //'Fetch' second column properties
      this.getSecondColumnSelectedCollection = datasource.map((item) => {
        // return {article: item.arti}
        return {
          articleId: item.article,
          [`${this.secondColumnSelected}`]: item[this.secondColumnSelected],
        };
      });
      console.log('Group_2[second_prop]🍍', this.getSecondColumnSelectedCollection);

      // add two columns to attributes table



      //Move this to own button
      this.onConcatenate(
        this.getFirstColumnSelectedCollection,
        this.getSecondColumnSelectedCollection
      );
      // this.insertSelectedColumnsToTable()

    });
  }
insertSelectedColumnsToTable(){
  const joinSelectedArrays = this.getFirstColumnSelectedCollection.map((item, i) => {
    return {
      ...item,
      ...this.getSecondColumnSelectedCollection[i]
    }
  });

  // console.log('joinSelectedArrays', joinSelectedArrays);
  this.insertSelectedColumns(this.getFirstColumnSelectedCollection);
}

//Example
// async addConcatenatedAttributes(combinedArray: any) {
//   console.log('CombinedArray', combinedArray);
//   await db.customAttributes.bulkPut(combinedArray);
// }


}


export interface SelectedColumn {
  articleId: number;
  name: string;
}
