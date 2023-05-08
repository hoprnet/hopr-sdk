import nock from 'nock';
import { fundChannels } from './channels';

const BASE_PATH = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test api/channels', function () {
  describe('fundChannels', function () {
    beforeEach(function () {
      nock.cleanAll();
    });
    it('returns data when it is parsed successfully', async function () {
      nock(BASE_PATH).post('/api/v2/fundmulti').reply(201, {
        receipt:
          '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
      });

      const response = await fundChannels(BASE_PATH, API_TOKEN, {
        peerId: '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12',
        outgoingAmount: '1000000',
        incomingAmount: '1000000'
      });

      expect(response.receipt).toEqual(
        '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
      );
    });
  });
});
