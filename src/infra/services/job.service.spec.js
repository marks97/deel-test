const JobService = require('./job.service');
const BaseError = require('../errors/base.error');

jest.mock('sequelize');
jest.mock('../../domain/constants');

describe('JobService', () => {
  let jobService;
  let mockSequelize;
  let mockJobModel;
  let mockContractModel;
  let mockProfileModel;

  beforeEach(() => {
    mockSequelize = { transaction: jest.fn() };
    mockJobModel = {
      findAll: jest.fn(),
      sum: jest.fn(),
      findOne: jest.fn(),
    };
    mockContractModel = {};
    mockProfileModel = {};

    jobService = new JobService({
      sequelize: mockSequelize,
      jobModel: mockJobModel,
      contractModel: mockContractModel,
      profileModel: mockProfileModel,
    });
  });

  it('should return unpaid jobs for active contracts', async () => {
    const mockData = [{ id: 1, name: 'Test Job' }];
    mockJobModel.findAll.mockResolvedValueOnce(mockData);

    const result = await jobService.getUnpaidJobsForActiveContracts({
      profileId: 123,
    });
    expect(result).toEqual(mockData);
  });

  it('should return unpaid job sum', async () => {
    mockJobModel.sum.mockResolvedValueOnce(500);

    const sum = await jobService.getUnpaidJobSum({ profileId: 123 });
    expect(sum).toEqual(500);
  });

  it('should throw error if job is already paid', async () => {
    const mockJob = {
      id: 1,
      price: 100,
      paid: true,
      Contract: {
        Contractor: {},
        Client: {},
      },
    };

    mockJobModel.findOne.mockResolvedValueOnce(mockJob);

    await expect(jobService.payJob({ jobId: 1 })).rejects.toThrow(
      new BaseError(400, 'Job already paid'),
    );
  });

  it('should throw error if client has insufficient funds', async () => {
    const mockJob = {
      id: 1,
      price: 150,
      paid: false,
      Contract: {
        Contractor: {},
        Client: { balance: 100 },
      },
    };

    mockJobModel.findOne.mockResolvedValueOnce(mockJob);

    await expect(jobService.payJob({ jobId: 1 })).rejects.toThrow(
      new BaseError(400, 'Client has insufficient funds'),
    );
  });

  it('should process payment successfully', async () => {
    const mockJob = {
      id: 1,
      price: 50,
      paid: false,
      update: jest.fn(),
      Contract: {
        Contractor: { increment: jest.fn() },
        Client: { balance: 100, decrement: jest.fn() },
      },
    };

    mockJobModel.findOne.mockResolvedValueOnce(mockJob);
    mockSequelize.transaction.mockImplementationOnce(callback => callback());

    await jobService.payJob({ jobId: 1 });

    expect(mockJob.Contract.Client.decrement).toHaveBeenCalledWith(
      { balance: 50 },
      expect.anything(),
    );

    expect(mockJob.Contract.Contractor.increment).toHaveBeenCalledWith(
      { balance: 50 },
      expect.anything(),
    );
  });
});
