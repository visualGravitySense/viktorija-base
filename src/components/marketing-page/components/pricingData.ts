import { PricingTier } from './Pricing';

export const pricingData = {
  title: "Выберите свой план",
  subtitle: "Комплексное обучение с нашими самыми дзен-инструкторами, которые сохраняют спокойствие, даже когда вы путаете газ с тормозом.",
  tiers: [
    {
      title: '🏍️ Категория А',
      price: '570',
      description: [
        'Полный курс подготовки',
        'Практика с комфортом',
        'Гибкий график',
        'Полная поддержка',
      ],
      buttonText: 'Зелёный свет правам — жми!',
      buttonVariant: 'outlined' as const,
      buttonColor: 'primary' as const,
    },
    {
      title: '🚗 Категория Б',
      subheader: 'Самая популярна',
      price: '700',
      description: [
        '28 академических часов теории',
        '28 академических часов вождения',
        '16 часов курсов первой медецинской помощи',
        'Курсы тёмного и скользкого вождения',
        'Индивидуальный подход',
        'Полная поддержка',
      ],
      buttonText: 'Пристегнись к успеху — начни!',
      buttonVariant: 'contained' as const,
      buttonColor: 'secondary' as const,
    },
    {
      title: '🎓 Заключительный курс',
      price: '150',
      description: [
        'Гибкое расписание занятий',
        'Учебные материалы',
        'Практика экстремальных ситуаций',
        'Гарантия готовности к вождению',
        
      ],
      buttonText: 'Выжми максимум — запишись!',
      buttonVariant: 'outlined' as const,
      buttonColor: 'primary' as const,
    },
  ] as PricingTier[],
}; 