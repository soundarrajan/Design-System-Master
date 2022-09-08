import { BlreconModule } from './blrecon.module';

describe('BlreconModule', () => {
  let blreconModule: BlreconModule;

  beforeEach(() => {
    blreconModule = new BlreconModule();
  });

  it('should create an instance', () => {
    expect(blreconModule).toBeTruthy();
  });
});
