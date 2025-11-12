import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>WORCURE MEMBERS</title>
        <meta name="description" content="Portal de Alunos WORCURE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <div>
            <Link href="/">
              <a>
                <Image src="/logo.png" alt="WORCURE Logo" width={80} height={80} />
              </a>
            </Link>
            <Link href="/">
              <a>
                <h1>WORCURE MEMBERS</h1>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/progress"><a>MEU PROGRESSO</a></Link>
            <Link href="/support"><a>SUPORTE 24/7 COM IA</a></Link>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <p>© 2025 WORCURE MEMBERS</p>
      </footer>
    </div>
  );
};

export default Layout;
