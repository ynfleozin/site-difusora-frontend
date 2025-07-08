import { Component } from '@angular/core';
import { CurrenciesComponent } from "../../components/currencies/currencies.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrenciesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
