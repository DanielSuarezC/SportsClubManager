import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeClubComponent } from './home-club.component';

describe('HomeClubComponent', () => {
  let component: HomeClubComponent;
  let fixture: ComponentFixture<HomeClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeClubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
