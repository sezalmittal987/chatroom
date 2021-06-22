import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() message = { body: '', type: '' };

  setMessage(body : string, type : string, time = 5000): void {
    this.message.body = body;
    this.message.type = type;
    setTimeout(() => this.message.body = '', time);
  }

}
