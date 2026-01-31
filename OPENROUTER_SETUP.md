# OpenRouter API Integration

**Status**: ✅ Implemented & Ready to Deploy

---

## 🎯 What Changed

Switched AI provider from **Google Gemini** to **OpenRouter** (using GPT-4o-mini)

**Benefits**:
- Access to OpenAI's GPT-4o-mini model (faster, more reliable)
- Better conversation quality and response accuracy
- More stable API with better rate limits
- Same cost-effective pricing structure

---

## 📦 Implementation Details

### 1. New AI Integration File
**File**: `src/lib/openrouter.ts`
- OpenRouter API client with streaming support
- Uses GPT-4o-mini model (fast, cost-effective)
- Same StudyBuddy system prompt (CAPS/IEB curriculum)
- Streaming responses for real-time chat experience

### 2. Updated Components
**File**: `src/components/chat/AIChat.tsx`
- Now imports from `@/lib/openrouter` instead of `@/lib/gemini`
- All chat functionality preserved
- Automatic conversation title generation

### 3. GitHub Actions Workflow
**File**: `.github/workflows/deploy.yml`
- Updated to use `VITE_OPENROUTER_API_KEY` secret
- Automatically injects API key during build

### 4. Environment Configuration
**File**: `.env.example`
- Updated to show OpenRouter API key requirement
- Removed old Gemini API key reference

---

## 🚀 Deployment Instructions

### Step 1: Add OpenRouter API Key to GitHub Secrets (REQUIRED)

1. **Get your OpenRouter API key**:
   - Go to: https://openrouter.ai/keys
   - Sign in or create account
   - Generate a new API key
   - Copy the key (starts with `sk-or-v1-...`)

2. **Add to GitHub Secrets**:
   - Go to: https://github.com/oatswrldwide/study-buddy-ai/settings/secrets/actions
   - Click **"New repository secret"**
   - Name: `VITE_OPENROUTER_API_KEY`
   - Secret: Paste your OpenRouter API key
   - Click **"Add secret"**

### Step 2: Trigger Deployment

```bash
# Make a trivial change to trigger rebuild with new secret
git commit --allow-empty -m "Rebuild with OpenRouter API key"
git push origin main
```

Or just push any code change - the workflow will automatically rebuild with the new API key.

### Step 3: Verify Deployment (3-5 minutes)

1. **Monitor GitHub Actions**:
   - Go to: https://github.com/oatswrldwide/study-buddy-ai/actions
   - Watch for green checkmark on latest workflow
   - Build takes ~2-3 minutes

2. **Test on live site**:
   - Visit: https://studybuddy.works/students
   - Sign up or log in
   - Select a subject and grade
   - Try the AI chat
   - Should see responses from GPT-4o-mini

3. **Check browser console** (F12):
   - Should see no API errors
   - Look for successful chat message responses
   - No "Missing OpenRouter API key" errors

---

## 🔧 Local Development

**Update your `.env` file**:
```bash
# Remove old Gemini key (no longer used)
# VITE_GEMINI_API_KEY=...

# Add OpenRouter key
VITE_OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

**Test locally**:
```bash
npm run dev
# Visit http://localhost:5173
# Test AI chat functionality
```

---

## 💰 Pricing & Usage

**OpenRouter GPT-4o-mini**:
- Model: `openai/gpt-4o-mini`
- Input: ~$0.15 per 1M tokens
- Output: ~$0.60 per 1M tokens
- Average chat message: ~200-500 tokens
- Estimated cost: $0.0001-0.0003 per message

**OpenRouter Free Credits**:
- New accounts get $1-5 free credits
- Monitor usage: https://openrouter.ai/activity

**Add billing** (when free credits run out):
- Go to: https://openrouter.ai/settings/billing
- Add payment method
- Set spending limits for safety

---

## 🎯 Current Configuration

**Model**: `openai/gpt-4o-mini`
- Fast, cost-effective GPT-4 variant
- Good for educational use cases
- 128K context window
- Supports streaming responses

**System Prompt**:
- South African CAPS/IEB curriculum focus
- Socratic teaching method (guided questions)
- Local context (rand currency, SA examples)
- Grade 8-12 content alignment

**Settings**:
```typescript
temperature: 0.7     // Balanced creativity
top_p: 0.95         // Response diversity
max_tokens: 1024    // Response length limit
stream: true        // Real-time responses
```

---

## ✅ Verification Checklist

Before going live, confirm:

- [ ] OpenRouter API key added to GitHub Secrets
- [ ] GitHub Actions workflow passed (green checkmark)
- [ ] Site deploys successfully to studybuddy.works
- [ ] AI chat loads without errors
- [ ] Messages send and receive responses
- [ ] Responses are coherent and educational
- [ ] No console errors related to API
- [ ] Conversation history persists in Firestore
- [ ] Streaming responses work smoothly

---

## 🆘 Troubleshooting

**Error: "Missing OpenRouter API key"**
- ❌ **Cause**: GitHub Secret not added OR local `.env` missing key
- ✅ **Fix**: 
  - GitHub: Add `VITE_OPENROUTER_API_KEY` secret (see Step 1 above)
  - Local: Add to `.env` file
  - Rebuild and deploy

**Error: "OpenRouter API error: 401"**
- ❌ **Cause**: Invalid or expired API key
- ✅ **Fix**: 
  - Generate new key at https://openrouter.ai/keys
  - Update GitHub Secret
  - Rebuild

**Error: "OpenRouter API error: 402"**
- ❌ **Cause**: No credits remaining
- ✅ **Fix**: 
  - Check balance: https://openrouter.ai/activity
  - Add billing: https://openrouter.ai/settings/billing

**Chat not responding / Stuck loading**
- ❌ **Cause**: Network issue or API rate limit
- ✅ **Fix**: 
  - Check browser console for errors
  - Verify API key is valid
  - Check OpenRouter status: https://status.openrouter.ai
  - Wait 30 seconds and retry

**Responses are slow**
- ❌ **Cause**: Model selection or network latency
- ✅ **Fix**: 
  - GPT-4o-mini should respond in 2-5 seconds
  - Check network connection
  - Consider switching to faster model if needed

---

## 📊 Monitoring

**Track API Usage**:
- Dashboard: https://openrouter.ai/activity
- View per-request costs
- Monitor token usage
- Set up spending alerts

**Firestore Chat Logs**:
- Collections: `chat_conversations`, `chat_messages`
- Track student engagement
- Analyze conversation patterns
- Calculate real costs per student

---

## 🔄 Old Gemini Implementation

**File preserved**: `src/lib/gemini.ts`
- Still in codebase but no longer used
- Can be safely deleted if desired
- Keep as backup/reference

**To switch back to Gemini** (if needed):
1. Update `AIChat.tsx` import: `@/lib/gemini`
2. Change GitHub Secret to `VITE_GEMINI_API_KEY`
3. Update workflow to use Gemini key
4. Rebuild and deploy

---

**Next Steps**: Add `VITE_OPENROUTER_API_KEY` to GitHub Secrets and deploy! 🚀
