const TestPage = () => {
  return (
    <div style={{ padding: '50px', fontSize: '24px' }}>
      <h1>Test Page Working!</h1>
      <p>If you see this, React is loading correctly.</p>
      <p>Supabase URL: {import.meta.env.VITE_SUPABASE_URL}</p>
      <p>Has Anon Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Yes' : 'No'}</p>
      <p>Has Gemini Key: {import.meta.env.VITE_GEMINI_API_KEY ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default TestPage;
