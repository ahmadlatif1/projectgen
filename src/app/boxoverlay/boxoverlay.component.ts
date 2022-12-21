import { Component, ChangeDetectorRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs';
import * as globals from '../globals';
import { SlotElementComponent } from '../slot-element/slot-element.component';
import { SlotComponent } from '../slot/slot.component';


@Component({
  selector: 'app-boxoverlay',
  template: `
  
    <div class="border">
    <div class="boxbody">
    
      <div class="boxtop"> 
        <p>THE PROJECT IDEA MACHINE</p>


      </div>
      
      <div class="boxmid">

      <div class="fillerheightless"></div>


        <div class="slotbox" *ngFor="let stack of genstack, index as j; trackBy: trackByFn">
          
        <div class="filler" *ngIf="j>0&&stack.length"></div>


          <div class="slotrowrow">
            <div class="filler"  *ngIf="stack.length>0" ></div>
              <div class="slotrow" *ngFor="let substack of stack; index as i; trackBy: trackByFn">
                
                <div class="slotcolumn">{{substack[0][0]}}</div>

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

          <div class="resultdisplay"></div>

          <button type="button" class="boxbutton" (click)="spinclick()">GENERATE!</button>    

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
`,

  styleUrls: ['./boxoverlay.component.css']

})

export class BoxoverlayComponent implements OnInit {


  



  spinstatus:number=0;

  editmode=false;

  
  machinedata=globals.machinedata;

  selected_slots=this.machinedata.map(x=>[true,x])






  slotselectors=this.machinedata.map(x=>x[0]);


  
  constructor() { 
  }





  trackByFn(index: any, item: any) {
    return index; // or item.id
  }
  


  genstack=this.splitstacks(this.selected_slots.filter(x=>x[0]==true).map(x=>x[1]));
  
  splitstacks(md:any){

    

    const stacka:string[][][]=function(){if(md.length<=3)return md; else if(md.length==4){return md.slice(0,2)}else return md.slice(0,3)}()

    const stackb:string[][][]=function(){if(md.length<=3)return []; else if(md.length==4)return md.slice(2,4);else return md.slice(3,6)}()

     return [stacka, stackb]

  }


  spinclick(){
    this.spinstatus++;

  }
  
  toggleedit(){

    this.editmode=!this.editmode
    this.spinstatus=0
  }

  toggleslot(index:number){

    this.selected_slots[index][0]=!this.selected_slots[index][0];

    
    this.genstack=this.splitstacks(this.selected_slots.filter(x=>x[0]==true).map(x=>x[1]));
  

  }
  
  ngOnInit(): void {
   console.log()

    



  }

}
