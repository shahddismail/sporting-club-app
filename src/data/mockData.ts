import { Sport, Member, Subscription } from '@/types';

export const initialSports: Sport[] = [
  { id: '1', name: 'Football', description: 'Team sport played with a spherical ball', category: 'Team Sports' },
  { id: '2', name: 'Tennis', description: 'Racket sport played individually or in doubles', category: 'Individual Sports' },
  { id: '3', name: 'Swimming', description: 'Water-based sport and exercise', category: 'Aquatic Sports' },
];

export const initialMembers: Member[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', joinDate: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', joinDate: '2024-02-20' },
];

export const initialSubscriptions: Subscription[] = [
  { memberId: '1', sportId: '1', subscriptionDate: '2024-01-20' },
  { memberId: '2', sportId: '2', subscriptionDate: '2024-02-25' },
];