import React from 'react';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import { courseData } from '../../../lib/courseData';

const LessonPage = () => {
  const router = useRouter();
  const { moduleId, lessonId } = router.query;
  const module = courseData.METHOD_WORCURE.find((m) => m.id === parseInt(moduleId));

  if (!module) {
    return <p>Módulo não encontrado.</p>;
  }

  const lesson = module.lessons.find((l) => l.id === parseInt(lessonId));

  if (!lesson) {
    return <p>Aula não encontrada.</p>;
  }

  return (
    <Layout>
      <h2>{module.title}</h2>
      <h3>{lesson.title}</h3>
      <p>{lesson.content}</p>
    </Layout>
  );
};

export default LessonPage;
