import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SharedModule } from '../core/shared/shared.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    SiteComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    SharedModule

  ],

})
export class SiteModule { }
