import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { courseData } from '../../lib/courseData';

const ModulePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const module = courseData.METHOD_WORCURE.find((m) => m.id === parseInt(id));

  if (!module) {
    return <p>Módulo não encontrado.</p>;
  }

  return (
    <Layout>
      <h2>{module.title}</h2>
      <ul>
        {module.lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link href={`/lesson/${module.id}/${lesson.id}`}>
              <a>{lesson.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default ModulePage;
