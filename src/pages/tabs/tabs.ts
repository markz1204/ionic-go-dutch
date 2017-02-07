import { Component } from '@angular/core';

import { SchedulePage } from '../schedule/schedule';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  scheduleRoot: any = SchedulePage;

  constructor() {

  }
}
