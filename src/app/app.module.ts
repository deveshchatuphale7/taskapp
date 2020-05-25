import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { NbThemeModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { NbUserModule,NbDialogModule,NbCalendarModule,NbToggleModule,NbIconModule,NbDatepickerModule,NbToastrModule,NbActionsModule,NbSidebarModule,NbAccordionModule,NbProgressBarModule,NbTooltipModule,NbRadioModule,NbButtonModule,NbContextMenuModule,NbCheckboxModule,NbStepperModule,NbMenuModule,NbLayoutModule,NbPopoverModule,NbSelectModule,NbWindowModule,NbCardModule,NbListModule,NbInputModule,NbTabsetModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { ViewnoteComponent } from './viewnote/viewnote.component';
import { AddnoteComponent } from './addnote/addnote.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomeComponent,
    ViewComponent,
    ViewnoteComponent,
    AddnoteComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    NbThemeModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbUserModule,
    NbWindowModule.forRoot(),
    NbCardModule,
    NbToggleModule,
    NbCalendarModule,
    NbListModule,
    NbSelectModule,
    NbCheckboxModule,
    NbContextMenuModule,
    NbTooltipModule,
    NbMenuModule.forRoot(),
    NbPopoverModule,
    NbButtonModule,
    NbInputModule,
    NbDialogModule.forRoot(),
    NbStepperModule,
    NbRadioModule,
    NbAccordionModule,
    NbEvaIconsModule,
    NbIconModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
