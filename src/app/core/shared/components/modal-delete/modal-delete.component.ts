import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss'],
})
export class ModalDeleteComponent implements OnInit {
  @Input() item: any;

  @Output() sendId = new EventEmitter<string>();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log('ok');
  }

  delete(item: any) {
    this.sendId.emit(item);
  }
}
