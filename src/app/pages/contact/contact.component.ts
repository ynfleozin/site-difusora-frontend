import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule, 
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  constructor() { }

  public sendEmail(event: Event): void {
    event.preventDefault();

    console.log("Formulário enviado!");

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    console.log('Dados a serem enviados:');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    
    form.reset();
  }
}