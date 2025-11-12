import React from 'react';
import Layout from '../../../components/Layout';
import { useRouter } from 'next/router';
import { courseData } from '../../../lib/courseData';

const FlixModulePage = () => {
  const router = useRouter();
  const { divisionId, moduleId } = router.query;

  const division = courseData.WORCURE_FLIX.find((d) => d.id === parseInt(divisionId));
  if (!division) return <p>Divisão não encontrada.</p>;

  const module = division.modules.find((m) => m.id === parseInt(moduleId));
  if (!module) return <p>Módulo não encontrado.</p>;

  const contentTypes = [
    { icon: '🎥', name: 'Vídeo Aula' },
    { icon: '📄', name: 'E-book' },
    { icon: '🎧', name: 'Podcast' },
    { icon: '✍️', name: 'Diário de Cura' },
    { icon: '📅', name: 'Plano de 7 Dias' },
    { icon: '🙏', name: 'Oração Guiada' },
    { icon: '✅', name: 'Quiz Teste' },
  ];

  return (
    <Layout>
      <h2>{division.title}</h2>
      <h3>{module.title.split(':')[0]}</h3>
      <ul>
        {contentTypes.map((type, index) => (
          <li key={index}>
            {type.icon} {type.name} | {module.title.split(':')[0]}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default FlixModulePage;
