import { Category } from '../entity/Category';

export const categoryData: Pick<Category, 'title' | 'description'>[] = [
  { title: 'House', description: 'Family house' },
  { title: 'Hotel', description: 'Single bed room' },
  { title: 'Land', description: 'Open plot' },
  { title: 'Apartment', description: 'Small house' },
  { title: 'Commercial Building', description: 'Business' },
  { title: 'Studio', description: 'Single room house' },
];
