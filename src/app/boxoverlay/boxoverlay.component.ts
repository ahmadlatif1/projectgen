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

        <button type="button" class="boxtopbuttonadd" (click)="addclick(1)">+</button>    
        <button type="button" class="boxtopbuttonsub" (click)="addclick(-1)">-</button>    


      </div>
      
      <div class="boxmid">

      <div class="fillerheightless"></div>


        <div class="slotbox" *ngFor="let stack of genstack, index as j; trackBy: trackByFn">
          
        <div class="filler" *ngIf="j>0&&stack.length"></div>


          <div class="slotrowrow">
            <div class="filler"  *ngIf="stack.length>0" ></div>
              <div class="slotrow" *ngFor="let substack of stack; index as i; trackBy: trackByFn">
                
                <div class="slotcolumn">{{substack[0]}}</div>

                <div class="slotborder">
                <app-slot [id]="i+(j*3)" [spinstatus]="spinstatus" [words]="substack[1]"></app-slot>
                </div>


              </div>

              <div class="slotcolumn" *ngIf="stack.length>0" ></div>


              <div class="filler"  *ngIf="stack.length>0"></div>

          </div>

        </div>

        <div class="fillerheightless"></div>

      </div>
      
      <div class="boxbottom">
        <button type="button" class="boxbutton" (click)="spinclick()">GENERATE!</button>    

      </div>
      
      
  </div>
  </div>
`,

  styleUrls: ['./boxoverlay.component.css']

})

export class BoxoverlayComponent implements OnInit {


  



  spinstatus:number=0;

  @Input() slotcount=3;

  
  machinedata=globals.machinedata.slice(0,this.slotcount);



  
  constructor() { 
  }


  trackByFn(index: any, item: any) {
    return index; // or item.id
  }
  


  genstack=this.splitstacks(this.machinedata);
  
  splitstacks(md:string[][][]){

    

    const stacka:string[][][]=function(){if(md.length<=3)return md; else if(md.length==4){return md.slice(0,2)}else return md.slice(0,3)}()

    const stackb:string[][][]=function(){if(md.length<=3)return []; else if(md.length==4)return md.slice(2,4);else return md.slice(3,6)}()

     return [stacka, stackb]

  }


  changeslotcount(num:number){

    const newnum=this.slotcount+num;
    
    if(newnum<=6&&newnum>0){

    this.slotcount=newnum;
    return true;
    }
    else return false;
    

  }

  spinclick(){
    this.spinstatus++;

    // console.log("\nSPINCLICK")

  }
  
  addclick(count:number=0){

    if(this.changeslotcount(count)){

      this.machinedata=globals.machinedata.slice(0,this.slotcount);
      this.genstack=this.splitstacks(this.machinedata);
      this.spinstatus=0

      console.log("\nADDCLICK "+this.spinstatus+"s")

    }
  }

  ngOnInit(): void {
   console.log()
  }

}
