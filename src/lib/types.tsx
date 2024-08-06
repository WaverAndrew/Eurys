export type Person = {
  id: string;
  name: string;
  img?: string;
  link?: string;
};

export type ReqProperty = { q: string };

export type AIResponseObject = {
  users: Person[];
  description: string;
};

export interface Notification {
  name: string;
  reason: string;
}

export interface NotificationsObject {
  profiles: {
    profiles: Notification[];
  };
}
