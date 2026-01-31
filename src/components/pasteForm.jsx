import { useState } from "react";

function PasteForm() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState(300);
  const [views, setViews] = useState(1);
  const [result, setResult] = useState(null);

  async function createPaste() {
    const response = await fetch(
      "https://pastebin-lite-2-kioy.onrender.com/api/pastes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          ttlSeconds: Number(ttl),
          maxViews: Number(views),
        }),
      }
    );

    const data = await response.json();

    //  backend returns ONLY id
    const generatedUrl = `https://pastebin-lite-2-kioy.onrender.com/api/pastes/${data.id}`;

    setResult(generatedUrl);
  }

  return (
    <div>
      <label>Paste Content</label>
      <textarea
        rows="6"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <label>TTL (seconds)</label>
      <input
        type="number"
        value={ttl}
        onChange={(e) => setTtl(e.target.value)}
      />

      <label>Max Views</label>
      <input
        type="number"
        value={views}
        onChange={(e) => setViews(e.target.value)}
      />

      <button onClick={createPaste}>Create Paste</button>

      {result && (
        <div className="result">
          <p>Shareable Link:</p>
          <a href={result} target="_blank" rel="noreferrer">
            {result}
          </a>
        </div>
      )}
    </div>
  );
}

export default PasteForm;
