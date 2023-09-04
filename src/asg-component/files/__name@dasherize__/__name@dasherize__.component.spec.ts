import { axe, toHaveNoViolations } from "jasmine-axe";
import { TestBed } from "@angular/core/testing";
import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [<%= classify(name) %>Component],
    });
    TestBed.compileComponents();
    jasmine.addMatchers(toHaveNoViolations);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(<%= classify(name) %>Component);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should pass accessibility test", async () => {
    const fixture = TestBed.createComponent(<%= classify(name) %>Component);
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});

