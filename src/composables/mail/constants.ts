export const API_MAIL = `${import.meta.env.VITE_API_PREFIX}/api/mail`;

export const defaultBody = '\n\nSent from iPortfolio';

export const defaultValues = {
  to: 'hello@webguyian.com',
  from: '',
  subject: '',
  body: defaultBody,
  attachment: ''
};
