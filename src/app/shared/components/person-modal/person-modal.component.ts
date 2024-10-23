import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Person } from 'src/app/core/models/person.model';

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.scss'],
})
export class PersonModalComponent  implements OnInit {
   @Input() person:Person | undefined
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

}
