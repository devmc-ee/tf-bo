import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkingTimeComponent } from './working-time.component';
import { WorkingTimeProvider } from './working-time.provider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [WorkingTimeComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [WorkingTimeProvider]
})
export class WorkingTimeModule {}
