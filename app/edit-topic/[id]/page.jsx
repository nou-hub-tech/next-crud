// Imports
// Component imports
import EditTopicForm from '@/components/EditTopicForm';
import { headers } from 'next/headers';

const getBaseUrl = () => {
  const headerList = headers();
  const host = headerList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  return `${protocol}://${host}`;
};

const getTopicById = async (id) => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/topics/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to get the topic');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return { topic: null };
  }
};

export default async function EditTopic({ params }) {
  const { id } = params;
  const { topic } = (await getTopicById(id)) ?? {};

  if (!topic) {
    return null;
  }

  const { title, description } = topic;

  return <EditTopicForm id={id} title={title} description={description} />;
}
