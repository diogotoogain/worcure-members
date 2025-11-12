import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(request: NextRequest) {
  try {
    const { memberName, style } = await request.json()

    if (!memberName) {
      return NextResponse.json(
        { error: 'Nome do membro é obrigatório' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      // Se não houver API key, retornar uma imagem de placeholder
      return NextResponse.json({
        imageUrl: `https://via.placeholder.com/1200x630/4F46E5/FFFFFF?text=${encodeURIComponent(memberName)}`,
        message: 'Usando imagem de placeholder (configure OPENAI_API_KEY para usar IA real)'
      })
    }

    // Definir o prompt baseado no estilo
    const stylePrompts: Record<string, string> = {
      professional: 'professional business style with clean lines and corporate colors',
      creative: 'creative and artistic with vibrant colors and unique composition',
      minimalist: 'minimalist design with simple geometric shapes and limited color palette',
      modern: 'modern and trendy with gradients and contemporary design elements',
      elegant: 'elegant and sophisticated with luxurious aesthetic and refined details',
    }

    const styleDescription = stylePrompts[style] || stylePrompts.professional

    const prompt = `Create a professional member cover image for "${memberName}" in ${styleDescription}. The design should be suitable for a member profile banner. High quality, 16:9 aspect ratio, modern and appealing.`

    // Gerar a imagem usando DALL-E
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1792x1024",
      quality: "standard",
    })

    const imageUrl = response.data?.[0]?.url

    if (!imageUrl) {
      throw new Error('Falha ao gerar imagem')
    }

    return NextResponse.json({
      imageUrl,
      memberName,
      style,
    })
  } catch (error) {
    console.error('Erro ao gerar capa:', error)
    
    // Se houver erro com a API, retornar placeholder
    const { memberName } = await request.json()
    return NextResponse.json({
      imageUrl: `https://via.placeholder.com/1200x630/4F46E5/FFFFFF?text=${encodeURIComponent(memberName || 'Member')}`,
      message: 'Erro na API de IA - usando placeholder',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    })
  }
}
