import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const HomePage = () => {
  return (
    <Layout>
      <div className="dashboard">
        <Link href="/method">
          <a className="card">
            <h2>MÉTODO WORCURE</h2>
            <p>A base da sua transformação. Comece aqui.</p>
          </a>
        </Link>
        <Link href="/flix">
          <a className="card">
            <h2>WORCURE FLIX</h2>
            <p>A biblioteca infinita para a sua jornada.</p>
          </a>
        </Link>
      </div>
      <style jsx>{`
        .dashboard {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 80vh;
        }
        .card {
          border: 1px solid var(--primary-color);
          border-radius: 8px;
          padding: 2rem;
          margin: 1rem;
          width: 300px;
          text-align: center;
          transition: transform 0.2s;
        }
        .card:hover {
          transform: scale(1.05);
        }
        .card h2 {
          font-family: var(--font-display);
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default HomePage;
