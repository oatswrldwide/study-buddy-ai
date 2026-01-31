// OpenRouter API integration for AI chat
// Supports streaming responses from OpenAI models via OpenRouter

const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY

// System prompt aligned with CAPS and IEB curriculum
const SYSTEM_PROMPT = `You are StudyBuddy, an AI tutor specializing in South African CAPS and IEB curricula for grades 8-12.

Teaching Approach:

Your primary role is to explain concepts clearly and directly. Adapt your teaching method based on what the student needs:

Guided Exploration: Break complex topics into clear, step-by-step explanations. Build understanding progressively.

Real-World Examples: Use South African contexts (Kruger Park, Table Mountain, taxi fares, petrol prices, local sports, SA companies) to make concepts memorable.

Scaffolded Learning: Start simple, then layer in complexity. Build confidence before tackling harder concepts.

Visual Descriptions: Describe diagrams, flowcharts, or mind maps to show relationships between concepts when helpful.

Direct Instruction with Practice: Explain concepts clearly first, then provide exercises or problems to reinforce learning.

Problem-Based Learning: When appropriate, work through real problems together step-by-step.

Comparative Learning: Show similarities and differences between concepts to help students make informed choices.

Analogies: Relate new ideas to familiar ones to make abstract concepts easier to grasp.

Chunking: Break content into digestible pieces, especially for complex topics.

Key Principles:
Prioritize clear, direct explanations over excessive questioning. Use simple language appropriate for the grade level. Be patient, supportive, encouraging, and helpful. Use rand (R) for currency examples. Reference SA cities, companies, sports, culture, and geography. Be mindful of diverse home languages (English, Afrikaans, Zulu, Xhosa, etc.). Align with DBE curriculum guidelines. Check for understanding, but don't overuse questions. Provide answers when students ask - you're here to teach, not quiz.

For Mathematics: Step-by-step reasoning, visual strategies, worked examples, real-world SA contexts (budgets, measurements, statistics), then practice problems.

For Sciences: Connect theory to practical applications, use local examples (ecosystems, geology, industries), explain processes clearly, encourage experimental thinking.

For Languages: Focus on comprehension and analysis, guide essay structure, provide direct feedback on writing, encourage creative expression, teach grammar in context.

For Other Subjects: Use storytelling, real-world case studies, comparative analysis, and clear explanations tailored to the discipline.

Goal: Be the helpful, knowledgeable tutor who explains things clearly and builds student confidence through understanding.`

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatOptions {
  subject: string
  grade: number
  conversationHistory?: ChatMessage[]
}

/**
 * Send a message to OpenRouter and get streaming response
 */
export async function* sendMessage(
  userMessage: string,
  options: ChatOptions
): AsyncGenerator<string, void, unknown> {
  // Check API key at runtime
  if (!apiKey) {
    throw new Error('OpenRouter API key is not configured. Please add VITE_OPENROUTER_API_KEY to your environment variables.')
  }

  // Build messages array
  const messages = [
    {
      role: 'system',
      content: SYSTEM_PROMPT,
    },
    ...(options.conversationHistory?.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })) || []),
    {
      role: 'user',
      content: `[Subject: ${options.subject}, Grade: ${options.grade}]\n\n${userMessage}`,
    },
  ]

  // Call OpenRouter API with streaming
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://studybuddy.works',
      'X-Title': 'StudyBuddy AI Tutor',
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini', // Fast, cost-effective GPT-4 model
      messages,
      temperature: 0.7,
      top_p: 0.95,
      max_tokens: 1024,
      stream: true,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`)
  }

  // Parse SSE stream
  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('Response body is not readable')
  }

  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6)
        if (data === '[DONE]') continue

        try {
          const parsed = JSON.parse(data)
          const content = parsed.choices?.[0]?.delta?.content
          if (content) {
            yield content
          }
        } catch (e) {
          // Skip invalid JSON
        }
      }
    }
  }
}

/**
 * Generate a conversation title based on first message
 */
export async function generateTitle(
  firstUserMessage: string,
  subject: string
): Promise<string> {
  // Check API key at runtime
  if (!apiKey) {
    return `${subject} - ${firstUserMessage.substring(0, 30)}...`
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://studybuddy.works',
      'X-Title': 'StudyBuddy AI Tutor',
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Generate a brief, descriptive title (max 5 words) for a ${subject} tutoring conversation that starts with: "${firstUserMessage}". Only return the title, nothing else.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 20,
    }),
  })

  if (!response.ok) {
    console.error('Error generating title:', await response.text())
    return `${subject} - ${firstUserMessage.substring(0, 30)}...`
  }

  const data = await response.json()
  const title = data.choices?.[0]?.message?.content?.trim().replace(/['"]/g, '') || ''
  return title.substring(0, 60) // Max 60 chars
}

/**
 * Estimate token count for a message
 * Rough estimate: ~4 characters per token
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

/**
 * Validate if user message is appropriate
 */
export function validateMessage(message: string): {
  valid: boolean
  reason?: string
} {
  if (!message || message.trim().length === 0) {
    return { valid: false, reason: 'Message cannot be empty' }
  }

  if (message.length > 2000) {
    return { valid: false, reason: 'Message is too long (max 2000 characters)' }
  }

  // Check for spam/abuse patterns
  const spamPatterns = [
    /(.)\1{10,}/, // Repeated characters
    /^[^a-zA-Z0-9\s]{20,}$/, // Only special characters
  ]

  for (const pattern of spamPatterns) {
    if (pattern.test(message)) {
      return { valid: false, reason: 'Message contains invalid patterns' }
    }
  }

  return { valid: true }
}
