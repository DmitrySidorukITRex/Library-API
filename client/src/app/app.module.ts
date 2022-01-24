import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksModule } from './pages/books/books.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './pages/users/users.module';
import { ContactsModule } from './pages/contacts/contacts.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    BooksModule,
    UsersModule,
    ContactsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
