import { state, trigger,style,transition,animate } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slot-element',
  template:`
    <div [ngClass]="getclass()" [style.animation]="getwinner()+' '+duration+'s'+' linear forwards'" [style.animation-delay]="delay+'s'" >{{word}}</div>
  `,
  styles: [`

    div {
      background-color:rgb(47, 47, 48);




      color:rgb(100,100,100, 0.5);

      width:100px;
      height:40px;
      position: relative;
     
      z-index:-3;

      border:black solid;
      border-width:2px 0px 2px 0px;
      margin-top:-2px;
      
      display:flex;
      flex-direction:column;
      justify-content:center;
      padding-left:5px;
      
      opacity:0;

    }
    .winbox{
      color:seashell;
      opacity:0;
    }
    .fillbox{

      opacity: 0;

    }
    .placeholder{

      z-index:-3;
      opacity:1;
      
    }

    @keyframes fillerflip {
      0%   {       
        opacity: 1;
        z-index:-1;
        top: -40px;

      color:rgb(255,255,255, 0.2);

      }
      100% {      

        z-index:-1;
        top: 40px;
        opacity: 1;
        color:rgb(255,255,255, 0.2);

      }
    }
      @keyframes winnerflip {
      0%   {       
        z-index:-1;
        top: -40px;
        opacity: 1;

      }
      100% {      
        color:seashell;

        z-index:-1;
        top: 0px;
        opacity: 1;

      }
    }
    
      
  `]
  
})
export class SlotElementComponent implements OnInit {

  // on spawn, activates keyframe animation 



  @Input() word:string="";

  @Input() order:number=0;
  
  @Input() winner:boolean=false;

  // second value for how long it takes one element to finish
  //
  duration=0.15

  // how long an element has to wait for its turn to animate
  delay=0

  getwinner(){

    if(this.word=="")return ""
    if(this.winner)
    return"winnerflip"; else return"fillerflip"

  }

  getclass(){

    if(this.word=="")return "placeholder"
    if(this.winner)
    return"winbox"; else return "fillbox"


  }


  constructor() { }

  ngOnInit(): void {

  //  should be controlled from somewhere else, to adjust speeds


   this.delay=this.order*(this.duration/2)
   this.duration=this.duration-this.duration*Number(this.winner)*(0.5)


  }

}
