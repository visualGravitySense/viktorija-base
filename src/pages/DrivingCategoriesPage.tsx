import React from 'react';
import PainPoints, { PainPointItem } from '../components/marketing-page/components/PainPoints';

const drivingCategories: PainPointItem[] = [
  {
    id: 'category-a',
    title: '🏍️ Категория A',
    description: 'Мы предлагаем полный курс подготовки, включающий теоретические занятия, а также индивидуальные практические уроки на современных мотоциклах с опытными инструкторами.',
    imageUrl: 'https://placehold.co/320x180?text=Before',
    price: {
      theory: 120,
      lesson: 45,
      total: 570
    },
    buttonText: 'Register'
  },
  {
    id: 'category-b',
    title: '🚗 Категория B',
    description: 'Мы предлагаем полный курс подготовки, включающий теоретические занятия, а также индивидуальные практические уроки на современных автомобилях с опытными инструкторами.',
    imageUrl: 'https://placehold.co/320x180?text=After',
    price: {
      theory: 150,
      lesson: 50,
      total: 650
    },
    buttonText: 'Register'
  },
  {
    id: 'category-c',
    title: '🚚 Категория C',
    description: 'Мы предлагаем полный курс подготовки, включающий теоретические занятия, а также индивидуальные практические уроки на современных грузовиках с опытными инструкторами.',
    imageUrl: 'https://placehold.co/320x180?text=After',
    price: {
      theory: 180,
      lesson: 60,
      total: 780
    },
    buttonText: 'Register'
  }
];

export default function DrivingCategoriesPage() {
  return (
    <React.Fragment>
      <PainPoints
        title="Choose Your Driving Category"
        subtitle="Select the perfect course for your needs"
        items={drivingCategories}
      />
    </React.Fragment>
  );
} 