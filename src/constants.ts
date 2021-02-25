export const TO_EMAIL_ADDRESS = (PropertiesService.getScriptProperties().getProperty('toEmailAddress') ?? '').split(
  ',',
);
export const MESSAGE_TEMPLATE = `
本日は {today} です。
今年は既に {daysPassedThisYear}日 が過ぎて、
あと残り {daysLeftThisYear}日 です。
`;
