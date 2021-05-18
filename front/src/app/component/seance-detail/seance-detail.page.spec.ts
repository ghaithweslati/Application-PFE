/*import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Seance } from 'src/app/model/seance';
import { HttpClientTestingModule,
    HttpTestingController } from '@angular/common/http/testing';
import { SeanceDetailPage } from './seance-detail.page';
import { RouterTestingModule } from "@angular/router/testing";


describe('SeanceDetailPage', () => {
  let component: SeanceDetailPage;
  let fixture: ComponentFixture<SeanceDetailPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeanceDetailPage],
      imports: [IonicModule.forRoot(),HttpClientTestingModule,RouterTestingModule]
    
    }).compileComponents();

    fixture = TestBed.createComponent(SeanceDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Test de la fonction de clacule des frais pour une séance', () => {
    const seance={
        'periode_seance':{
            'id':2,
            'dateDeb':'2021-02-02 14:00',
            'dateFin':'2021-02-02 15:00'
       },
       'sujet':{
           'frais':[{
               'id':1,
               'duree':30,
               'prix':50,
           }]
       }
    }
    expect(component.fraisSeance(seance)).toBe(100)
  });
});*/