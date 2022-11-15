import { defaultValues } from './constants';

export const getFields = (state: { [key: string]: string }) => {
  return {
    to: state.to || defaultValues.to,
    from: state.from || defaultValues.from,
    subject: state.subject || defaultValues.subject,
    body: state.body || defaultValues.body,
    attachment: state.attachment || defaultValues.attachment
  };
};
