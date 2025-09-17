import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  constructor() {}

  public sendEmail(event: Event): void {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const serviceID = environment.emailJsServiceId;
    const templateID = environment.emailJsTemplateId;
    const publicKey = environment.emailJsPublicKey;

    emailjs.sendForm(serviceID, templateID, form, publicKey).then(
      (result) => {
        console.log('E-mail enviado com sucesso!', result.text);
        alert('Mensagem enviada com sucesso!');
        form.reset();
      },
      (error) => {
        console.error('Erro ao enviar e-mail:', error.text);
        alert('Ocorreu um erro ao enviar a mensagem.');
      }
    );
  }
}
