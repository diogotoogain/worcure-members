import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { courseData } from '../../lib/courseData';

const DivisionPage = () => {
  const router = useRouter();
  const { divisionId } = router.query;
  const division = courseData.WORCURE_FLIX.find((d) => d.id === parseInt(divisionId));

  if (!division) {
    return <p>Divisão não encontrada.</p>;
  }

  return (
    <Layout>
      <h2>{division.title}</h2>
      <div className="module-carousel">
        {division.modules.map((module) => (
          <Link href={`/flix/${division.id}/${module.id}`} key={module.id}>
            <a className="card">
              <div className="card-image">
                <img src={`https://picsum.photos/seed/${module.id}/400/600`} alt={module.title.split(':')[0]} />
              </div>
              <div className="card-title">
                <h4>{module.title.split(':')[0]}</h4>
              </div>
              <div className="card-footer">
                <span>WORCURE FLIX</span>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .module-carousel {
          display: flex;
          overflow-x: auto;
          padding-bottom: 1rem;
        }
        .card {
          flex: 0 0 200px;
          margin-right: 1rem;
          border: 1px solid var(--primary-color);
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }
        .card-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }
        .card-title {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          color: white;
          font-family: var(--font-display);
          font-size: 1.2rem;
          text-shadow: 1px 1px 2px black;
        }
        .card-footer {
          position: absolute;
          bottom: 10px;
          left: 10px;
          color: white;
          font-size: 0.8rem;
          text-shadow: 1px 1px 2px black;
        }
      `}</style>
    </Layout>
  );
};

export default DivisionPage;
