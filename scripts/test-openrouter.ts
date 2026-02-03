#!/usr/bin/env tsx
/**
 * Quick OpenRouter API Test
 */

import 'dotenv/config';
import axios from 'axios';

const API_KEY = process.env.VITE_GROQ_API_KEY;

async function testAPI() {
  console.log('🧪 Testing Groq API...\n');
  
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [{ 
          role: 'user', 
          content: 'Write a 50-word description of an AI math tutor for South African students.' 
        }],
        temperature: 0.7,
        max_tokens: 200,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );
    
    console.log('✅ API Response:');
    console.log('Model:', response.data.model);
    console.log('Provider:', response.data.provider);
    console.log('\nContent:');
    console.log(response.data.choices[0].message.content);
    console.log('\n💰 Cost:', response.data.usage?.cost || 'Free');
    console.log('📊 Tokens:', response.data.usage?.total_tokens || 0);
    
  } catch (error: any) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testAPI();
