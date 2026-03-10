import React, { useState } from "react";
import "./index.css";
import "./App.css";

const CharacterCounter = () => {
  const [text, setText] = useState("");
  const getSentenceCount = (str) => {
    if (!str.trim()) return 0;

    // 1. We split by punctuation followed by a space OR the end of text
    // 2. We also handle the case where there is no space (e.g. "End.Next")
    const sentences = str.split(/[.!?]+(\s+|$)/).filter((part) => {
      if (!part || part.trim().length === 0) return false;

      // Ignore common abbreviations
      const abbreviations = ["mr", "mrs", "ms", "dr", "prof", "inc"];
      const cleaned = part.trim().toLowerCase().replace(".", "");

      return !abbreviations.includes(cleaned);
    });

    return sentences.length;
  };

  const counts = {
    total: text.length,
    letters: (text.match(/[a-z]/gi) || []).length,
    digits: (text.match(/[0-9]/g) || []).length,
    spaces: (text.match(/\s/g) || []).length,
    special: (text.match(/[^a-z0-9\s]/gi) || []).length,
    words: text.trim() === "" ? 0 : text.trim().split(/\s+/).length,
    sentences: getSentenceCount(text),
    paragraphs: text.split(/\n+/).filter((p) => p.trim().length > 0).length,
  };

  return (
    <div className="container">
      <h2>Character Counter</h2>
      <textarea
        rows="7"
        className="text-area"
        placeholder="Type something here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="stats-grid">
        <p className="stat-item">
          <strong>Letters:</strong> {counts.letters}
        </p>
        <p className="stat-item">
          <strong>Digits:</strong> {counts.digits}
        </p>
        <p className="stat-item">
          <strong>Spaces:</strong> {counts.spaces}
        </p>
        <p className="stat-item">
          <strong>Special characters:</strong> {counts.special}
        </p>
        <p className="stat-item">
          <strong>Sentences:</strong> {counts.sentences}
        </p>
        <p className="stat-item">
          <strong>Paragraphs:</strong> {counts.paragraphs}
        </p>
        <p className="stat-item">
          <strong>Total characters:</strong> {counts.total}
        </p>
      </div>
    </div>
  );
};

export default CharacterCounter;
