import { createMail } from '../src/mail';

describe('mail', () => {
  describe('createMail', () => {
    it('startOfYear', () => {
      const { subject } = createMail(new Date('2022-01-01'));
      expect(subject).toBe('【今年の残り日数】あと365日(100%)');
    });
    it('endOfYear', () => {
      const { subject } = createMail(new Date('2022-12-31'));
      expect(subject).toBe('【今年の残り日数】あと1日(0.2%)');
    });
    it('other', () => {
      const { subject } = createMail(new Date('2022-05-14'));
      expect(subject).toBe('【今年の残り日数】あと232日(63.5%)');
    });
  });
});
