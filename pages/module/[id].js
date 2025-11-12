import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';

const modules = [
  { id: 0, title: 'MÓDULO 0: BEM-VINDO AO WORCURE', lessons: [
    { id: 1, title: 'Aula 1: O Que É o WORCURE e Por Que Funciona' },
    { id: 2, title: 'Aula 2: Como Navegar no Portal WORCURE Members' },
    { id: 3, title: 'Aula 3: A Diferença Entre MÉTODO WORCURE e WORCURE FLIX' },
    { id: 4, title: 'Aula 4: O Segredo do Poder da Palavra' },
    { id: 5, title: 'Aula 5: Como Funcionam os Próximos Doze Módulos' },
  ]},
  { id: 1, title: 'MÓDULO 1: PAZ INABALÁVEL', lessons: [
    { id: 1, title: 'Aula 1: REVELAR A RAIZ DA ANSIEDADE' },
    { id: 2, title: 'Aula 2: REPROGRAMAR COM A PALAVRA' },
    { id: 3, title: 'Aula 3: RECRIAR SUA ROTINA DE PAZ' },
  ]},
  { id: 2, title: 'MÓDULO 2: LIBERDADE FINANCEIRA', lessons: [
    { id: 1, title: 'Aula 1: REVELAR A RAIZ DA ESCASSEZ' },
    { id: 2, title: 'Aula 2: REPROGRAMAR COM A PALAVRA' },
    { id: 3, title: 'Aula 3: RECRIAR SUA ROTINA FINANCEIRA' },
  ]},
  { id: 3, title: 'MÓDULO 3: LAR RESTAURADO', lessons: [
    { id: 1, title: 'Aula 1: REVELAR A RAIZ DO CONFLITO' },
    { id: 2, title: 'Aula 2: REPROGRAMAR COM A PALAVRA' },
    { id: 3, title: 'Aula 3: RECRIAR SUA ROTINA NO LAR' },
  ]},
  { id: 4, title: 'MÓDULO 4: CURA PROFUNDA', lessons: [
    { id: 1, title: 'Aula 1: REVELAR A RAIZ DAS FERIDAS' },
    { id: 2, title: 'Aula 2: REPROGRAMAR COM A PALAVRA' },
    { id: 3, title: 'Aula 3: RECRIAR SUA ROTINA DE CURA' },
  ]},
  { id: 5, title: 'MÓDULO 5: ESPERANÇA REVIVIDA', lessons: [
    { id: 1, title: 'Aula 1: REVELAR A RAIZ DO DESÂNIMO' },
    { id: 2, title: 'Aula 2: REPROGRAMAR COM A PALAVRA' },
    { id: 3, title: 'Aula 3: RECRIAR SUA ROTINA DE ESPERANÇA' },
  ]},
  { id: 6, title: 'MÓDULO 6: VIDA VIBRANTE', lessons: [
    { id: 1, title: 'Aula 1: REVELAR A RAIZ DA EXAUSTÃO' },
    { id: 2, title: 'Aula 2: REPROGRAMAR COM A PALAVRA' },
    { id: 3, title: 'Aula 3: RECRIAR SUA ROTINA VIBRANTE' },
  ]},
  { id: 7, title: 'MÓDULO 7: LIBERDADE CONQUISTADA', lessons: [
    { id: 1, title: 'Aula 1: REVELAR A RAIZ DOS VÍCIOS' },
    { id: 2, title: 'Aula 2: REPROGRAMAR COM A PALAVRA' },
    { id: 3, title: 'Aula 3: RECRIAR SUA ROTINA DE LIBERDADE' },
  ]},
  { id: 8, title: 'MÓDULO 8: BLINDAGEM ESPIRITUAL', lessons: [
    { id: 1, title: 'Aula 1: REVELAR A RAIZ DA VULNERABILIDADE' },
    { id: 2, title: 'Aula 2: REPROGRAMAR COM A PALAVRA' },
    { id: 3, title: 'Aula 3: RECRIAR SUA ROTINA DE PROTEÇÃO' },
  ]},
  { id: 9, title: 'MÓDULO 9: PROPÓSITO REVELADO', lessons: [
    { id: 1, title: 'Aula 1: REVELAR A RAIZ DA DESORIENTAÇÃO' },
    { id: 2, title: 'Aula 2: REPROGRAMAR COM A PALAVRA' },
    { id: 3, title: 'Aula 3: RECRIAR SUA ROTINA DE CHAMADO' },
  ]},
  { id: 10, title: 'MÓDULO 10: CONEXÃO VITAL', lessons: [
    { id: 1, title: 'Aula 1: REVELAR A RAIZ DA DISTÂNCIA' },
    { id: 2, title: 'Aula 2: REPROGRAMAR COM A PALAVRA' },
    { id: 3, title: 'Aula 3: RECRIAR SUA ROTINA DE CONEXÃO' },
  ]},
  { id: 11, title: 'MÓDULO 11: DESVENDANDO A PALAVRA', lessons: [
    { id: 1, title: 'Aula 1: REVELAR A RAIZ DA CONFUSÃO' },
    { id: 2, title: 'Aula 2: REPROGRAMAR COM A PALAVRA' },
    { id: 3, title: 'Aula 3: RECRIAR SUA ROTINA DE ESTUDO' },
  ]},
  { id: 12, title: 'MÓDULO 12: FÉ PRÁTICA E IMPACTO', lessons: [
    { id: 1, title: 'Aula 1: REVELAR A RAIZ DA INÉRCIA' },
    { id: 2, title: 'Aula 2: REPROGRAMAR COM A PALAVRA' },
    { id: 3, title: 'Aula 3: RECRIAR SUA ROTINA DE IMPACTO' },
  ]},
];

const ModulePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const module = modules.find((m) => m.id === parseInt(id));

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
