import { useEffect, useState } from "react";
import { supabase } from "./client";
import "./App.css";

function App() {
  const [creators, setCreators] = useState([]);
  const [form, setForm] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchCreators = async () => {
    const { data, error } = await supabase.from("creators").select("*");
    if (!error) setCreators(data || []);
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCreator = async () => {
    if (!form.name || !form.url || !form.description) {
      alert("Name, URL, and description are required");
      return;
    }

    await supabase.from("creators").insert([form]);
    setForm({ name: "", url: "", description: "", imageURL: "" });
    fetchCreators();
  };

  const startEdit = (creator) => {
    setEditingId(creator.id);
    setForm({
      name: creator.name,
      url: creator.url,
      description: creator.description,
      imageURL: creator.imageURL || "",
    });
  };

  const updateCreator = async () => {
    await supabase.from("creators").update(form).eq("id", editingId);
    setEditingId(null);
    setForm({ name: "", url: "", description: "", imageURL: "" });
    fetchCreators();
  };

  const deleteCreator = async (id) => {
    await supabase.from("creators").delete().eq("id", id);
    fetchCreators();
  };

  return (
    <div className="app">
      <h1>Creatorverse</h1>
      <p>My favorite content creators worth following.</p>

      <div className="form">
        <input name="name" placeholder="Creator name" value={form.name} onChange={handleChange} />
        <input name="url" placeholder="Creator URL" value={form.url} onChange={handleChange} />
        <input name="imageURL" placeholder="Image URL optional" value={form.imageURL} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        {editingId ? (
          <button onClick={updateCreator}>Update Creator</button>
        ) : (
          <button onClick={addCreator}>Add Creator</button>
        )}
      </div>

      <div className="grid">
        {creators.map((creator) => (
          <div className="card" key={creator.id}>
            {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}

            <h2>{creator.name}</h2>
            <a href={creator.url} target="_blank" rel="noreferrer">
              Visit Channel
            </a>
            <p>{creator.description}</p>

            <button onClick={() => startEdit(creator)}>Edit</button>
            <button className="delete" onClick={() => deleteCreator(creator.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;