import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cdev-histories-element',
  imports: [RouterOutlet, NgFor ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'histories';

  histories = [
    { id: 1, date: '2025-10-01', description: 'Routine check-up' },
    { id: 2, date: '2025-09-15', description: 'Follow-up visit' },
    { id: 3, date: '2025-08-20', description: 'Initial consultation' }
  ];
}
