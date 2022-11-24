import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { map } from 'rxjs';
import * as globals from '../globals';
import { SlotElementComponent } from '../slot-element/slot-element.component';
import { SlotComponent } from '../slot/slot.component';


@Component({
  selector: 'app-boxoverlay',
  template: `
  
    <div class="border">
    <div class="boxbody">
    
      <div class="boxtop"> THE PROJECT IDEA MACHINE</div>
      

      <div *ngFor="let stack of genstack, index as j">
        
         <div class="slotrowrow">
           <div class="filler"></div>
            <div class="slotrow" *ngFor="let substack of stack; index as i">
              
              <div class="slotcolumn">{{substack[0]}}</div>

              <div class="slotborder">
              <app-slot [id]="i+(j*3)" [spinstatus]="spinstatus" [words]="substack[1]"></app-slot>
              </div>

              <div class="slotcolumn" *ngIf="i==substack.length"></div>

            </div>
            <div class="filler"></div>

        </div>
        <div class="filler"></div>

      </div>
      <div class="boxbottom">
        <button type="button" class="boxbutton" (click)="onclick()">GENERATE!</button>    

      </div>
      
      
      </div>
      
  </div>
`,

  styleUrls: ['./boxoverlay.component.css']

})

export class BoxoverlayComponent implements OnInit {

  spinstatus:number=0;


  slots:string[][]=globals.machinedata.map(x=>x[1]);
  

  onclick(){
    this.spinstatus++
  }

  machinedata=globals.machinedata.slice(0,6);

  


  genstack:string[][][][]=function(md:string[][][]){

    

    const stacka:string[][][]=function(){if(md.length<=3)return md; else if(md.length==4){return md.slice(0,2)}else return md.slice(0,3)}()

    const stackb:string[][][]=function(){if(md.length<=3)return []; else if(md.length==4)return md.slice(2,4);else return md.slice(3,6)}()

     return [stacka, stackb]

  }(this.machinedata)


  constructor() { }

  ngOnInit(): void {
   console.log()
  }

}
