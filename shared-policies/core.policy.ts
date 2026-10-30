import { site } from '../src/content/site.mjs';

export const GET_COMPANY_NAME = (fullName = false) => fullName ? site.name : 'AC';
export const GET_CONTACT_EMAIL_ADDRESS = (): string => site.email;
