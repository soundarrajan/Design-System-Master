import { RackMarketingModule } from './rack-marketing.module';

describe('RackMarketingModule', () => {
  let rackMarketingModule: RackMarketingModule;

  beforeEach(() => {
    rackMarketingModule = new RackMarketingModule();
  });

  it('should create an instance', () => {
    expect(rackMarketingModule).toBeTruthy();
  });
});
