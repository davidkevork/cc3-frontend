export interface BaseObject {
  isError: boolean;
  error?: ErrorObject;
  requestId: string;
  resource: string;
  status: number;
  execution: number;
}

export interface ErrorObject {
  code: string;
  date: string;
  message: string;
}

export interface AuthObject extends BaseObject {
  token?: string;
}

export interface UserItemsObject {
  created: string;
  id: string;
  email: string;
}

export interface UserObject extends BaseObject {
  items?: UserItemsObject[];
}
