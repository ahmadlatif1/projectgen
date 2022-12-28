import { Component, ChangeDetectorRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs';
import * as globals from '../globals';
import { SlotElementComponent } from '../slot-element/slot-element.component';
import { SlotComponent } from '../slot/slot.component';


@Component({
  selector: 'app-boxoverlay',
  template: `
  
    <div class="border">
    <div class="border2">

    <div class="boxbody">
    
      <div class="boxtop"> 
        <p class="boxtoptitle">PROJECT IDEA GENERATOR</p>

      </div>
      
      <div class="boxmid">

      <div class="fillerheightless"></div>


        <div class="slotbox" *ngFor="let stack of splitten_stacks, index as j; trackBy: trackByFn">
          
        <div class="filler" *ngIf="j>0&&stack.length"></div>


          <div class="slotrowrow">
            <div class="filler"  *ngIf="stack.length>0" ></div>
              <div class="slotrow" *ngFor="let substack of stack; index as i; trackBy: trackByFn">
                
                <div class="slotcolumn">{{substack[0][1]}}</div>

                <app-slot [id]="i+(j*3)" [spinstatus]="spinstatus" [words]="substack[1]"></app-slot>


              </div>

              <div class="slotcolumn" *ngIf="stack.length>0" ></div>


              <div class="filler"  *ngIf="stack.length>0"></div>

          </div>

        </div>

        <div class="fillerheightless"></div>

      </div>
      
      <div class="boxbottom">

        <div class="boxbottomcontainer" >

          
          <div *ngIf="!editmode; then thenBlock else elseBlock"></div>


          <ng-template #thenBlock>


          <button type="button" class="boxbutton" (click)="spinclick()">press me</button>    

          </ng-template>

          
          <ng-template #elseBlock>

            <div class="togglecontainer">
              <button class="edittogglebutton"  *ngFor="let slot of slotselectors; index as i" (click)="toggleslot(i)" [style.background-color]="selected_slots[i][0]? 'rgb(100, 100, 100)':'rgb(192, 192, 192)'" [style.border-style]="selected_slots[i][0]? 'inset' :'outset'">{{slot[0]}}</button>
            </div>


          </ng-template>



          
        </div>

        
        <button type="button" class="editbutton" (click)="toggleedit()">edit</button>    



        </div>

      
  </div>
  </div>
  </div>
`,

  styleUrls: ['./boxoverlay.component.css']

})

export class BoxoverlayComponent implements OnInit {


  //supposed to be the combining component for all pieces

  // on spin button click:
  // -changes spinstatus by +1
  //   -slots detect binded propery change, spawn their element arrays in position-dependant sizes, making animations finish one by one
  //
  // on edit button click:
  //    -toggles an ngif to display a box containing all settings to toggle
  //
  //    on toggle click:
  //      -disables the one slot, and remakes the main stack to acount for the change
  //








  // +----+ need to move what can be moved to independant component

  spinstatus:number=0;

  editmode=false;

    //slots that are toggled
  selected_slots=globals.generator_data.map(x=>[false,x])

    //array of the titles that represent slots
  slotselectors=globals.generator_data.map(x=>x[0]);

  
  splitten_stacks=this.splitstacks(this.selected_slots.filter(x=>x[0]==true).map(x=>x[1]));

  // +----+

  
  constructor() { 
  }





  
  trackByFn(index: any, item: any) {
    return index; // or item.id
  }

  // +----+ many of these should be moved
  
  // splits one stack into two to be used for each line in display
  //
  // keeps a balance between top and bottom arrays between 3,2 lengths
  splitstacks(inputarray:any){
    

    const stacka:string[][][]=function(){if(inputarray.length<=3)return inputarray; else if(inputarray.length==4){return inputarray.slice(0,2)}else return inputarray.slice(0,3)}()

    const stackb:string[][][]=function(){if(inputarray.length<=3)return []; else if(inputarray.length==4)return inputarray.slice(2,4);else return inputarray.slice(3,6)}()

     return [stacka, stackb]

  }


  // the generate button
  //spinstatus is a number as to update the spin variable every time it clicks, workaround for avoiding event emitters
  spinclick(){
    this.spinstatus++;

  }
  
  //edit button
  toggleedit(){

    this.editmode=!this.editmode
  }


  //toggles what slot boxes to be shown
  toggleslot(index:number){

    this.spinstatus=0

    this.selected_slots[index][0]=!this.selected_slots[index][0];

    
    this.splitten_stacks=this.splitstacks(this.selected_slots.filter(x=>x[0]==true).map(x=>x[1]));
  

  }

  toggleslots(index_array:number[]){

    for(let index of index_array){

      this.toggleslot(index)
    }
  }



  //+----+

  
  ngOnInit(): void {

    

    //default slots enabled 
    this.toggleslots([0,1,2,3,5])


  }

}
