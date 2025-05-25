import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from './config';

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: Timestamp;
  source?: string;
  language?: string;
}

// Коллекция для подписчиков рассылки
const NEWSLETTER_COLLECTION = 'newsletter_subscribers';

/**
 * Добавляет новый email в базу подписчиков
 * @param email - email адрес подписчика
 * @param source - источник подписки (например, 'footer', 'popup')
 * @param language - язык интерфейса при подписке
 * @returns Promise с результатом операции
 */
export const subscribeToNewsletter = async (
  email: string, 
  source: string = 'footer',
  language: string = 'ru'
): Promise<{ success: boolean; message: string; id?: string }> => {
  try {
    // Проверяем, есть ли уже такой email
    const emailExists = await checkEmailExists(email);
    
    if (emailExists) {
      return {
        success: false,
        message: 'Этот email уже подписан на рассылку'
      };
    }

    // Добавляем нового подписчика
    const subscriberData: NewsletterSubscriber = {
      email: email.toLowerCase().trim(),
      subscribedAt: Timestamp.now(),
      source,
      language
    };

    const docRef = await addDoc(collection(db, NEWSLETTER_COLLECTION), subscriberData);
    
    return {
      success: true,
      message: 'Спасибо за подписку! Мы будем отправлять вам полезные материалы.',
      id: docRef.id
    };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return {
      success: false,
      message: 'Произошла ошибка при подписке. Попробуйте еще раз.'
    };
  }
};

/**
 * Проверяет, существует ли email в базе подписчиков
 * @param email - email для проверки
 * @returns Promise<boolean>
 */
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const q = query(
      collection(db, NEWSLETTER_COLLECTION),
      where('email', '==', email.toLowerCase().trim())
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
}; 