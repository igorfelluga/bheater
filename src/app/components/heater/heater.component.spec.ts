import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaterComponent } from './heater.component';

describe('HeaterComponent', () => {
  let component: HeaterComponent;
  let fixture: ComponentFixture<HeaterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaterComponent]
    });
    fixture = TestBed.createComponent(HeaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setComponentInputs(minTemp: number, maxTemp: number, targetTemp: number) {
    fixture.componentRef.setInput('minTemp', minTemp);
    fixture.componentRef.setInput('maxTemp', maxTemp);
    fixture.componentRef.setInput('targetTemp', targetTemp);
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show temperature', () => {
    const targetTemp = 10;
    setComponentInputs(-10, 350, targetTemp);

    expect(fixture.debugElement.query(By.css('.temp-container')).nativeElement.textContent).toContain(targetTemp);
    expect(component.errors.length).toEqual(0);
  });

  it('should show error', () => {
    const targetTemp = 100;
    setComponentInputs(0, 30, targetTemp);

    expect(fixture.debugElement.query(By.css('.temp-container')).nativeElement.textContent).toContain(targetTemp);
    expect(component.errors.length).toEqual(1);
    expect(component.errors.at(0)).toEqual('Temperature is outside the valid range.')
  });

  it('should show error and reverse min/max', () => {
    const targetTemp = 35;
    setComponentInputs(40, 30, targetTemp);

    expect(fixture.debugElement.query(By.css('.temp-container')).nativeElement.textContent).toContain(targetTemp);
    expect(component.errors.length).toEqual(1);
    expect(component.errors.at(0)).toEqual('Temperature bounds are reversed. We corrected them.')
  });

  it('should show 2 errors', () => {
    const targetTemp = 45;
    setComponentInputs(40, 30, targetTemp);

    expect(fixture.debugElement.query(By.css('.temp-container')).nativeElement.textContent).toContain(targetTemp);
    expect(component.errors.length).toEqual(2);
  });
});
