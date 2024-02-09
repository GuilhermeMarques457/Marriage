import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared/modules/shared.module';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RouterModule, SharedModule, MatTabsModule, MatIconModule],
})
export class HomeComponent {
  menuItems = [
    {
      link: '/index',
      icon: 'home',
      label: 'Geral',
    },
    {
      link: '/casamento',
      icon: 'church',
      label: 'Casamento',
    },
    {
      link: '/presentes',
      icon: 'redeem',
      label: 'Presentes',
    },
    {
      link: '/convidados',
      icon: 'groups',
      label: 'Convidados',
    },
  ];

  activeLink = this.menuItems[0];
}
