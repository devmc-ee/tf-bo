import { Component } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule,MatListModule],
})
export class ToolbarComponent {

}
