import { replaceMessage } from '../src/utils';

describe('utils', () => {
  describe('replaceMessage', () => {
    it('should return message filled with parameter', () => {
      const param = { min: 500, max: '1000' };
      const message = '{min} < x < {max}';
      expect(replaceMessage(message, param)).toBe(`${param.min} < x < ${param.max}`);
    });
  });
});
