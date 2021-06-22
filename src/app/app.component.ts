import { AfterViewChecked, ChangeDetectorRef,Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ToastComponent } from './toast/toast.component'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  title = 'chatroom';

  constructor(public auth: AuthService,
    private changeDetector: ChangeDetectorRef,
    public toast : ToastComponent,
    ){}
    
  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }
}
