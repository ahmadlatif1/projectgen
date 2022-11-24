import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoxoverlayComponent } from './boxoverlay/boxoverlay.component';
import { SlotComponent } from './slot/slot.component';
import { SlotElementComponent } from './slot-element/slot-element.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxoverlayComponent,
    SlotComponent,
    SlotElementComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
