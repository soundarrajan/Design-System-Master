import { FreightContractsModule } from './freight-contracts.module';

describe('FreightContractsModule', () => {
  let freightContractsModule: FreightContractsModule;

  beforeEach(() => {
    freightContractsModule = new FreightContractsModule();
  });

  it('should create an instance', () => {
    expect(freightContractsModule).toBeTruthy();
  });
});
