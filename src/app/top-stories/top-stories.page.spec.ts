import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStoriesPage } from './top-stories.page';

describe('TopStoriesPage', () => {
  let component: TopStoriesPage;
  let fixture: ComponentFixture<TopStoriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopStoriesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopStoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
