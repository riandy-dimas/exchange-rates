import axios from 'axios';
import { getCurrencyRates } from './CurrencyService';
jest.mock('axios');
const mockGet = axios.get as jest.Mock;
beforeEach(() => jest.clearAllMocks());
test('preserves the requested base and delivers mocked conversion rates', async () => {
  const onSucceed = jest.fn(), onFailed = jest.fn();
  mockGet.mockResolvedValueOnce({data:{rates:{IDR:16000}}});
  getCurrencyRates({baseCurrency:'USD',onSucceed,onFailed});
  await new Promise(resolve => setTimeout(resolve,0));
  expect(mockGet).toHaveBeenCalledWith(expect.stringContaining('base=USD'));
  expect(onSucceed).toHaveBeenCalledWith({IDR:16000});
  expect(onFailed).not.toHaveBeenCalled();
});
test('uses the failure callback without delivering stale rates', async () => {
  const onSucceed = jest.fn(), onFailed = jest.fn();
  const log=jest.spyOn(console,'error').mockImplementation(()=>{});
  mockGet.mockRejectedValueOnce(new Error('Fixture API unavailable'));
  getCurrencyRates({baseCurrency:'USD',onSucceed,onFailed});
  await new Promise(resolve => setTimeout(resolve,0));
  expect(onFailed).toHaveBeenCalledTimes(1);
  expect(onSucceed).not.toHaveBeenCalled();
  log.mockRestore();
});
