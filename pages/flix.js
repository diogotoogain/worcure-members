import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { courseData } from '../../lib/courseData';

const FlixPage = () => {
  const [filter, setFilter] = useState('');

  const filteredDivisions = courseData.WORCURE_FLIX.filter(division =>
    division.tags.some(tag => tag.includes(filter.toLowerCase()))
  );

  return (
    <Layout>
      <h2>WORCURE FLIX</h2>
      <input
        type="text"
        placeholder="Filtrar por tag..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: '2rem', width: '100%', padding: '0.5rem' }}
      />
      <div className="division-grid">
        {filteredDivisions.map((division) => (
          <Link href={`/flix/${division.id}`} key={division.id}>
            <a className="card">
              <h3>{division.title}</h3>
            </a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .division-grid {
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

export default FlixPage;
