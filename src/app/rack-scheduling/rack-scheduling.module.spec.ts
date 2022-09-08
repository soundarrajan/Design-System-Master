import { RackSchedulingModule } from './rack-scheduling.module';

describe('RackSchedulingModule', () => {
  let rackSchedulingModule: RackSchedulingModule;

  beforeEach(() => {
    rackSchedulingModule = new RackSchedulingModule();
  });

  it('should create an instance', () => {
    expect(rackSchedulingModule).toBeTruthy();
  });
});
