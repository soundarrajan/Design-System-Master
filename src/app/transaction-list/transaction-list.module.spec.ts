import { TransactionListModule } from './transaction-list.module';

describe('TransactionListModule', () => {
  let transactionListModule: TransactionListModule;

  beforeEach(() => {
    transactionListModule = new TransactionListModule();
  });

  it('should create an instance', () => {
    expect(transactionListModule).toBeTruthy();
  });
});
