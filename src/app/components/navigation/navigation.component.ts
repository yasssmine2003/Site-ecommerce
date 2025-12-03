import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  constructor (
    public appService: AppService,
    private renderer: Renderer2,
    ) {
      this.renderer.listen('window', 'click', (e: Event) => {
        if (e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement) {
          this.appService.isCartModalOpen = false;
        }
      })
    }
    
  navigationItems = [
    { url: '', name: 'Home' },
    { url: 'shop', name: 'Shop' },
  ];

  toggleMenu() {
    this.appService.isCartModalOpen = !this.appService.isCartModalOpen;
  }

  openCart() {
    this.appService.setIsCartModalOpen(!this.appService.isCartModalOpen);
  }
}
