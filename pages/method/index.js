import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { courseData } from '../../lib/courseData';

const MethodPage = () => {
  return (
    <Layout>
      <h2>MÉTODO WORCURE</h2>
      <div className="module-grid">
        {courseData.METHOD_WORCURE.map((module) => (
          <Link href={`/method/${module.id}`} key={module.id}>
            <a className="card">
              <h3>{module.title}</h3>
            </a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .module-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
        }
        .card {
          border: 1px solid var(--primary-color);
          border-radius: 8px;
          padding: 1.5rem;
          text-align: center;
          transition: transform 0.2s;
        }
        .card:hover {
          transform: scale(1.05);
        }
        .card h3 {
          font-family: var(--font-display);
        }
      `}</style>
    </Layout>
  );
};

export default MethodPage;
