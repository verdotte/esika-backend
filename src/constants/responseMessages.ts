const general = (resource: string, action: string) =>
  `${resource} has been ${action} successfully`;

export const deleted = (resource: string) => general(resource, 'deleted');
export const created = (resource: string) => general(resource, 'created');
export const updated = (resource: string) => general(resource, 'updated');

export const exist = (resource: string) => `${resource} already exists`;
export const notExist = (resource: string) => `${resource} does not exist`;

export const unauthorized = () => 'Unauthorized access';
export const loginSuccess = () => 'Login success';
export const incorrectPassword = () => 'Incorrect password';