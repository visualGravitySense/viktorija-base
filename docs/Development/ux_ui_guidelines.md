# UX/UI руководство для разработки сайта автошколы "Виктория" в Cursor с MUI

## 1. Структура сайта

### Главная страница
- **Хедер**: логотип, навигация, переключатель языков (эстонский/русский), кнопка "Записаться"
- **Основной баннер**: привлекательное изображение с автомобилем/инструктором, заголовок с основным предложением, кнопка призыва к действию
- **Блок преимуществ**: 3-4 ключевых преимущества автошколы с иконками
- **Блок курсов**: карточки с кратким описанием доступных курсов
- **Отзывы учеников**: карусель с фото и отзывами
- **Блок с информацией об инструкторах**: фото, имена, опыт
- **Блок с контактной информацией**: адрес, телефон, карта
- **Футер**: контакты, навигация, социальные сети, копирайт

### Дополнительные страницы
- Страница курсов (подробное описание)
- Страница об автошколе
- Контакты
- Блог/Новости
- Цены
- FAQ

## 2. Цветовая схема

Основываясь на существующем сайте и стандартах для автошкол:

- **Основной цвет**: #0056b3 (глубокий синий) - ассоциируется с надежностью и профессионализмом
- **Акцентный цвет**: #e63946 (красный) - для кнопок и важных элементов
- **Нейтральные цвета**:
  - #ffffff (белый) - фон
  - #f8f9fa (светло-серый) - разделы
  - #343a40 (темно-серый) - текст
  - #6c757d (серый) - вторичный текст

## 3. Типография

MUI предоставляет свою типографическую систему, рекомендуется использовать:

- **Основной шрифт**: Roboto (стандартный для MUI)
- **Заголовки**:
  - h1: 2.5rem, bold
  - h2: 2rem, bold
  - h3: 1.75rem, medium
  - h4: 1.5rem, medium
- **Основной текст**: 1rem (16px)
- **Малый текст**: 0.875rem (14px)

## 4. Компоненты MUI для использования

### Навигация
- `AppBar` для верхнего меню
- `Drawer` для мобильной навигации
- `Tabs` для внутренней навигации

### Содержимое
- `Card` для блоков курсов и инструкторов
- `Grid` для разметки
- `Typography` для текстовых элементов
- `Box` и `Container` для структурирования контента

### Интерактивные элементы
- `Button` для кнопок (использовать варианты contained для основных и outlined для вторичных)
- `TextField` для полей ввода в формах
- `Select` для выпадающих списков
- `Modal` для всплывающих окон
- `Snackbar` для уведомлений

### Медиа-компоненты
- `Avatar` для фото инструкторов
- `ImageList` для галереи

## 5. Ключевые принципы UX/UI

### Адаптивность
- Использовать `useMediaQuery` и темы MUI для определения брейкпоинтов
- Основные брейкпоинты: xs (0px), sm (600px), md (960px), lg (1280px), xl (1920px)
- На мобильных устройствах: упрощенное меню, карточки в одну колонку

### Доступность
- Достаточный контраст между текстом и фоном (не менее 4.5:1)
- Использовать атрибуты aria для элементов взаимодействия
- Обеспечить навигацию с клавиатуры

### Формы
- Понятные метки для всех полей
- Валидация в реальном времени
- Четкие сообщения об ошибках
- Индикаторы загрузки при отправке

### Нагрузка и производительность
- Оптимизировать изображения (использовать форматы WebP)
- Ленивая загрузка изображений с помощью `react-lazyload` или нативного атрибута loading="lazy"
- Использовать мемоизацию для компонентов, загружающих данные

## 6. Конкретные рекомендации для главной страницы

### Хедер
```jsx
<AppBar position="sticky" color="default" elevation={1}>
  <Toolbar>
    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
      <img src="/logo.png" alt="Автошкола Виктория" height="40" />
    </Box>
    
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Button color="inherit">О нас</Button>
      <Button color="inherit">Курсы</Button>
      <Button color="inherit">Цены</Button>
      <Button color="inherit">Контакты</Button>
      <IconButton>
        <LanguageIcon />
      </IconButton>
    </Box>
    
    <Button 
      variant="contained" 
      color="secondary" 
      sx={{ ml: 2, display: { xs: 'none', sm: 'block' } }}
    >
      Записаться
    </Button>
    
    <IconButton sx={{ display: { md: 'none' } }}>
      <MenuIcon />
    </IconButton>
  </Toolbar>
</AppBar>
```

### Главный баннер
```jsx
<Box
  sx={{
    height: { xs: '50vh', md: '70vh' },
    position: 'relative',
    backgroundImage: 'url(/banner.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
  }}
>
  <Container>
    <Box sx={{ maxWidth: '600px', p: 3, bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 2 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Научим водить уверенно и безопасно
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
        Профессиональное обучение вождению в Таллинне с 2005 года
      </Typography>
      <Button variant="contained" color="primary" size="large">
        Выбрать курс
      </Button>
    </Box>
  </Container>
</Box>
```

### Блок преимуществ
```jsx
<Container sx={{ my: 8 }}>
  <Typography variant="h3" textAlign="center" gutterBottom>
    Почему выбирают нас
  </Typography>
  
  <Grid container spacing={4} sx={{ mt: 4 }}>
    <Grid item xs={12} sm={6} md={3}>
      <Box sx={{ textAlign: 'center' }}>
        <Avatar sx={{ width: 80, height: 80, mx: 'auto', bgcolor: 'primary.main' }}>
          <SchoolIcon fontSize="large" />
        </Avatar>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Опытные инструкторы
        </Typography>
        <Typography color="textSecondary">
          Преподаватели с многолетним стажем
        </Typography>
      </Box>
    </Grid>
    
    {/* Повторить для других преимуществ */}
  </Grid>
</Container>
```

## 7. Рекомендации по контенту

### Что должно быть представлено на сайте:
- Категории водительских прав, по которым проводится обучение (B, C, и т.д.)
- Стоимость обучения с прозрачной структурой цен
- Расписание занятий и формат обучения
- Документы, необходимые для поступления
- Информация о процессе получения прав (этапы)
- Фотографии учебных классов и автомобилей
- Контактная информация с картой

### SEO-рекомендации:
- Использовать ключевые слова: "автошкола Таллинн", "обучение вождению", "курсы вождения", "получить права"
- Добавить мета-теги для всех страниц
- Обеспечить правильную структуру заголовков h1-h6
- Добавить alt-атрибуты ко всем изображениям

## 8. Рекомендации по анимации и интерактивности

- Использовать компонент `Fade` или `Slide` из MUI для анимации появления элементов
- Добавить hover-эффекты для интерактивных элементов
- Анимировать переходы между разделами
- Для форм использовать плавные transition эффекты

## 9. Прогрессивное улучшение

### Первый этап (MVP):
- Главная страница с основной информацией
- Страница с описанием курсов
- Контактная форма

### Второй этап:
- Личный кабинет ученика
- Онлайн-запись на занятия
- Блог с полезными статьями

### Третий этап:
- Онлайн-тестирование
- Интеграция с платежными системами
- Мобильное приложение

## 10. Инструкция по интеграции с Cursor

1. Создайте новый проект React: `npx create-react-app viktoria-autokool`
2. Установите MUI: `npm install @mui/material @emotion/react @emotion/styled @mui/icons-material`
3. Настройте тему в файле `theme.js`:

```jsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0056b3',
    },
    secondary: {
      main: '#e63946',
    },
    text: {
      primary: '#343a40',
      secondary: '#6c757d',
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    // Другие настройки типографики
  },
  // Настройки компонентов можно переопределить здесь
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
```

4. Примените тему в корневом компоненте:

```jsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Ваши компоненты */}
    </ThemeProvider>
  );
}
```

5. Структурируйте проект по компонентам:
   - `/components/Header.jsx`
   - `/components/Hero.jsx`
   - `/components/Features.jsx`
   - `/components/Courses.jsx`
   - `/components/Testimonials.jsx`
   - `/components/Instructors.jsx`
   - `/components/Contact.jsx`
   - `/components/Footer.jsx`

Следуя этим рекомендациям, вы сможете создать современный, удобный и эффективный сайт для автошколы "Виктория" с использованием MUI в среде разработки Cursor.