export interface Sport {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
}

export interface Subscription {
  memberId: string;
  sportId: string;
  subscriptionDate: string;
}