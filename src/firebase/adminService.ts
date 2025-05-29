import { collection, getDocs, query, orderBy, limit, startAfter, DocumentSnapshot } from 'firebase/firestore';
import { db } from './config';
import { NewsletterSubscriber } from './newsletterService';

const NEWSLETTER_COLLECTION = 'newsletter_subscribers';

export interface SubscriberWithId extends NewsletterSubscriber {
  id: string;
  subscribedAt: any; // Firestore timestamp
}

/**
 * Получает всех подписчиков с пагинацией
 * @param pageSize - количество записей на странице
 * @param lastDoc - последний документ для пагинации
 * @returns Promise с массивом подписчиков и данными для пагинации
 */
export const getNewsletterSubscribers = async (
  pageSize: number = 50,
  lastDoc?: DocumentSnapshot
): Promise<{
  subscribers: SubscriberWithId[];
  hasMore: boolean;
  lastDocument?: DocumentSnapshot;
}> => {
  try {
    let q = query(
      collection(db, NEWSLETTER_COLLECTION),
      orderBy('subscribedAt', 'desc'),
      limit(pageSize + 1) // +1 чтобы проверить есть ли еще записи
    );

    if (lastDoc) {
      q = query(
        collection(db, NEWSLETTER_COLLECTION),
        orderBy('subscribedAt', 'desc'),
        startAfter(lastDoc),
        limit(pageSize + 1)
      );
    }

    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs;
    
    const hasMore = docs.length > pageSize;
    const subscribers = docs.slice(0, pageSize).map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as SubscriberWithId[];

    const lastDocument = hasMore ? docs[pageSize - 1] : undefined;

    return {
      subscribers,
      hasMore,
      lastDocument
    };
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    throw error;
  }
};

/**
 * Получает общую статистику подписчиков
 * @returns Promise с количеством подписчиков по источникам
 */
export const getSubscribersStats = async (): Promise<{
  total: number;
  bySource: { [key: string]: number };
  byLanguage: { [key: string]: number };
}> => {
  try {
    const querySnapshot = await getDocs(collection(db, NEWSLETTER_COLLECTION));
    const docs = querySnapshot.docs;
    
    const stats = {
      total: docs.length,
      bySource: {} as { [key: string]: number },
      byLanguage: {} as { [key: string]: number }
    };

    docs.forEach(doc => {
      const data = doc.data();
      const source = data.source || 'unknown';
      const language = data.language || 'unknown';
      
      stats.bySource[source] = (stats.bySource[source] || 0) + 1;
      stats.byLanguage[language] = (stats.byLanguage[language] || 0) + 1;
    });

    return stats;
  } catch (error) {
    console.error('Error fetching subscribers stats:', error);
    throw error;
  }
}; 