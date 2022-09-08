import { PlanningDashboardModule } from './planning-dashboard.module';

describe('PlanningDashboardModule', () => {
  let planningDashboardModule: PlanningDashboardModule;

  beforeEach(() => {
    planningDashboardModule = new PlanningDashboardModule();
  });

  it('should create an instance', () => {
    expect(planningDashboardModule).toBeTruthy();
  });
});
