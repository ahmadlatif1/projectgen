import { ApplicationRef, ChangeDetectorRef, Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import * as globals from '../globals';



@Component({
  selector: 'app-slot',
  template: `
      <div *ngIf="spun">
          <app-slot-element [ngStyle]="{'position':'absolute'}" [winner]="i+1==spinlist.length" *ngFor="let s of spinlist; index as i" [word]="s" [order]="i"></app-slot-element>
      </div>
      <app-slot-element [ngStyle]="{'position':'absolute'}" ></app-slot-element>
     

    `
})
export class SlotComponent implements OnInit {


  // this component represents a slot, it spawns a bunch of slot elements on spin click

  // position of slot in the stack (id), decides how many elements it spawns, making a sequential display of spin animations




  @Input() id: number=0;
  @Input() words: string[]=[""];

  @Input() spinstatus: number=0;

  spun:boolean=false;

  spinlist:string[]=[""]

  constructor(private cdr: ChangeDetectorRef) { 
  }


  ngOnInit(): void {

  
  }



  ngOnChanges(changes: SimpleChanges) {

    // workaround for event detection, subsequent spins disable first spin, 
    //   spins worked weirdly with booleans and change detection after multiple spins so switched to this

    for (const propName in changes) {

      if(propName=="spinstatus"){
        this.spun=false
        this.spinlist=[""]
        this.cdr.detectChanges();

        if (this.spinstatus>0){

          this.spinlist=this.randomizewords(this.words,this.id)
          this.spun=true

        }

        
      }

    }



  }



  

  // makes an array of words to the specific size that is needed to animate on sequence
  randomizewords(words:string[]=[""], order:number=0){
      let x:string[]=[]
      for(let i=0;i<60+order*5;i++)x.push(words[ Math.floor(Math.random() * words.length) ]); 
      return x;
  }



}
