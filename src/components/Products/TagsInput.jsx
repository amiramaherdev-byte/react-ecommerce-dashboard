import React, { useState } from "react";
import { Form, Badge } from "react-bootstrap";

const TagsInput = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

const handleKeyDown = (e) => {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault();
    const value = input.trim();
    if (value && !tags.includes(value)) {
      setTags([...tags, value]); 
    }
    setInput("");
  }
};

const removeTag = (index) => {
  setTags(tags.filter((_, i) => i !== index)); 
};
  return (
    <Form.Group className="mb-3">
      <Form.Label>Tags(Type and press Enter)</Form.Label>
      <div
        className="border rounded p-2 d-flex flex-wrap gap-2"
        style={{ minHeight: "45px", cursor: "text" }}
        onClick={() => document.getElementById("tag-input").focus()}
      >
        {tags.map((tag, index) => (
          <Badge
            bg="secondary"
            key={index}
            className="d-flex align-items-center gap-1 px-2 py-1"
          >
            {tag}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => removeTag(index)}
            >
              &times;
            </span>
          </Badge>
        ))}

        <Form.Control
          id="tag-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter"
          style={{ border: "none", boxShadow: "none", flex: 1, minWidth: "100px" }}
        />
      </div>
    </Form.Group>
  );
};

export default TagsInput;