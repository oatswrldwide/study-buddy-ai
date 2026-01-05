import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

if (!apiKey) {
  throw new Error('Missing Gemini API key')
}

const genAI = new GoogleGenerativeAI(apiKey)

// System prompt aligned with CAPS and IEB curriculum
const SYSTEM_PROMPT = `You are StudyBuddy, an AI tutor specializing in South African CAPS and IEB curricula for grades 8-12.

Your teaching philosophy:
- Use Socratic questioning to guide students to discover answers themselves
- Never give direct answers; instead, ask leading questions
- Break complex problems into smaller, manageable steps
- Relate concepts to everyday South African contexts and examples
- Encourage critical thinking and problem-solving skills
- Be patient, supportive, and encouraging
- Use simple, clear language appropriate for the student's grade level

South African context:
- Use rand (R) for currency examples
- Reference local contexts (cities, companies, sports, culture)
- Be mindful of diverse home languages (English, Afrikaans, Zulu, etc.)
- Align with DBE curriculum guidelines

For mathematical problems:
- Guide students through step-by-step reasoning
- Ask "What do you notice about...?" and "What would happen if...?"
- Encourage students to check their own work
- Use real-world SA contexts (petrol prices, taxi fares, sports stats)

For sciences:
- Connect theory to practical applications
- Use local examples (Table Mountain geology, Kruger Park ecology)
- Encourage experimental thinking

For languages:
- Focus on comprehension and analysis
- Guide essay structure and argumentation
- Encourage creative expression

Remember: Your goal is to develop understanding, not just provide answers.`

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
 * Send a message to Gemini and get streaming response
 */
export async function* sendMessage(
  userMessage: string,
  options: ChatOptions
): AsyncGenerator<string, void, unknown> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: SYSTEM_PROMPT,
  })

  // Build conversation history
  const history = options.conversationHistory?.map((msg) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  })) || []

  // Add context about subject and grade
  const contextMessage = `[Subject: ${options.subject}, Grade: ${options.grade}]`

  // Start chat session
  const chat = model.startChat({
    history,
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 1024,
    },
  })

  // Send message with context
  const result = await chat.sendMessageStream(`${contextMessage}\n\n${userMessage}`)

  // Stream response chunks
  for await (const chunk of result.stream) {
    const text = chunk.text()
    yield text
  }
}

/**
 * Generate a conversation title based on first message
 */
export async function generateTitle(
  firstUserMessage: string,
  subject: string
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  })

  const prompt = `Generate a brief, descriptive title (max 5 words) for a ${subject} tutoring conversation that starts with: "${firstUserMessage}". Only return the title, nothing else.`

  try {
    const result = await model.generateContent(prompt)
    const title = result.response.text().trim().replace(/['"]/g, '')
    return title.substring(0, 60) // Max 60 chars
  } catch (error) {
    console.error('Error generating title:', error)
    return `${subject} - ${firstUserMessage.substring(0, 30)}...`
  }
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
      return { valid: false, reason: 'Message appears to be spam' }
    }
  }

  return { valid: true }
}

export type { GoogleGenerativeAI }
