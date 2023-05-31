import { Component, OnInit } from '@angular/core';
import { LoggingService } from './logging.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { AutoLogin } from './auth/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(    
    private loggingService: LoggingService,
    private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.dispatch(new AutoLogin());
    this.loggingService.printLog('hello from AppComponent ngOnInit');
  }

  title = 'my-recipe';

}
