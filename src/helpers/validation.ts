import { ValidationError } from 'class-validator';

export function extractErrorMessages(errors: ValidationError[]) {
  return errors.reduce((errorList: string[], curr) => {
    const messages = Object.values(curr.constraints || {});
    return [...errorList, ...messages];
  }, []);
}
