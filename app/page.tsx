'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [memberName, setMemberName] = useState('')
  const [coverStyle, setCoverStyle] = useState('professional')
  const [loading, setLoading] = useState(false)
  const [generatedCover, setGeneratedCover] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateCover = async () => {
    if (!memberName.trim()) {
      setError('Por favor, insira um nome')
      return
    }

    setLoading(true)
    setError(null)
    setGeneratedCover(null)

    try {
      const response = await fetch('/api/generate-cover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberName,
          style: coverStyle,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar capa')
      }

      setGeneratedCover(data.imageUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar capa')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">
          Portal Worcure Members
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Geração de Capas com Inteligência Artificial
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Gerar Nova Capa</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="memberName" className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Membro
              </label>
              <input
                id="memberName"
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite o nome do membro"
              />
            </div>

            <div>
              <label htmlFor="coverStyle" className="block text-sm font-medium text-gray-700 mb-2">
                Estilo da Capa
              </label>
              <select
                id="coverStyle"
                value={coverStyle}
                onChange={(e) => setCoverStyle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="professional">Profissional</option>
                <option value="creative">Criativo</option>
                <option value="minimalist">Minimalista</option>
                <option value="modern">Moderno</option>
                <option value="elegant">Elegante</option>
              </select>
            </div>

            <button
              onClick={handleGenerateCover}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Gerando...' : 'Gerar Capa'}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {generatedCover && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Capa Gerada</h2>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={generatedCover}
                alt={`Capa para ${memberName}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => window.open(generatedCover, '_blank')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Download
              </button>
              <button
                onClick={handleGenerateCover}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                Gerar Outra
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
