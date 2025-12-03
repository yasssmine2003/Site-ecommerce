import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  name = 'E-commerce';
  person = {
    name: "Andrés",
    age: 5,
  };
  isDisabled = false;

  toggleButton() {
    this.isDisabled = !this.isDisabled;
  }

  onScroll(e: Event) {
    const element = e.target as HTMLElement;
    console.log(element.scrollTop)

  }

  changeName(e: Event) {
    const element = e.target as HTMLInputElement;
    this.person.name = element.value;
  }
}
