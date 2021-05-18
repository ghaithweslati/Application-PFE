import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Seance } from 'src/app/model/seance';
import { HttpClientTestingModule,
    HttpTestingController } from '@angular/common/http/testing';
import { GainPage } from './gain.page';
import { RouterTestingModule } from "@angular/router/testing";



describe('GainPage', () => {
  let component: GainPage;
  let fixture: ComponentFixture<GainPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GainPage],
      imports: [IonicModule.forRoot(),HttpClientTestingModule,RouterTestingModule]
    
    }).compileComponents();

    fixture = TestBed.createComponent(GainPage);



    component = fixture.componentInstance;
    component.consultations.length=6;
    component.conferences.length=4;
    fixture.detectChanges();
  }));

  it('Test du component de nombre des séances', () => {    
      const data=fixture.nativeElement;
      expect(data.querySelector('#nbSeance').textContent).toContain("5 Séances");
  })
});


