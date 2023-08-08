import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule],
  exports: [LoginComponent],
})
export class AuthModule { }
