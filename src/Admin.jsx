import React, { useState } from 'react';

// Client-side admin panel (hidden). This is a convenience tool for managing
// projects stored in localStorage. It is NOT secure and should not be used in
// production without server-side auth.

export default function Admin({ projects = [], setProjects = () => {} }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [message, setMessage] = useState('');

  // obfuscated credentials (base64)
  const encUser = 'YWRtaW4='; // admin
  const encPass = 'c2VjcmV0'; // secret

  const checkAuth = (e) => {
    e && e.preventDefault();
    try {
      if (btoa(username) === encUser && btoa(password) === encPass) {
        setAuthed(true);
        setMessage('Authenticated');
      } else {
        setMessage('Invalid credentials');
      }
    } catch (err) {
      setMessage('Auth error');
    }
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');
  const [link, setLink] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const addProject = (e) => {
    e && e.preventDefault();
    const newProject = {
      title: title || 'Untitled',
      description: description || '',
      image: image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop',
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      link: link || '#',
    };

    try {
      if (editingIndex !== null && editingIndex >= 0 && editingIndex < projects.length) {
        // update existing
        const copy = projects.slice();
        copy[editingIndex] = newProject;
        setProjects(copy);
        setMessage('Project updated');
        setEditingIndex(null);
      } else {
        // add new
        setProjects([newProject, ...projects]);
        setMessage('Project added');
      }

      // clear form
      setTitle(''); setDescription(''); setImage(''); setTags(''); setLink('');
    } catch (err) {
      setMessage(editingIndex !== null ? 'Failed to update project' : 'Failed to add project');
    }
  };

  const removeProject = (idx) => {
    const copy = projects.slice();
    copy.splice(idx, 1);
    setProjects(copy);
    setMessage('Project removed');
  };

  const startEdit = (idx) => {
    const p = projects[idx];
    if (!p) return;
    setTitle(p.title || '');
    setDescription(p.description || '');
    setImage(p.image || '');
    setTags((p.tags || []).join(', '));
    setLink(p.link || '');
    setEditingIndex(idx);
    setMessage('Editing project');
    // scroll to top of admin form area if desired
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setTitle(''); setDescription(''); setImage(''); setTags(''); setLink('');
    setMessage('Edit cancelled');
  };

  if (typeof window !== 'undefined') {
    const path = window.location.pathname || '';
    if (!path.endsWith('/admin')) return null;
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto">
        {!authed ? (
          <form onSubmit={checkAuth} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            <p className="text-sm mb-4">Hidden admin — navigate to /admin to access. Client-side only.</p>
            <label className="block mb-2">Username</label>
            <input className="w-full px-3 py-2 rounded mb-3" value={username} onChange={e=>setUsername(e.target.value)} />
            <label className="block mb-2">Password</label>
            <input type="password" className="w-full px-3 py-2 rounded mb-3" value={password} onChange={e=>setPassword(e.target.value)} />
            <div className="flex items-center justify-between">
              <button className="px-4 py-2 bg-blue-500 text-white rounded" type="submit">Login</button>
              <span className="text-sm text-gray-500">{message}</span>
            </div>
          </form>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Admin Dashboard</h2>
              <div>
                <button className="px-3 py-2 bg-red-500 text-white rounded" onClick={()=>{setAuthed(false); setMessage('Logged out');}}>Logout</button>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-semibold mb-3">Add Project</h3>
              <form onSubmit={addProject} className="space-y-3">
                <input placeholder="Title" className="w-full px-3 py-2 rounded text-black" value={title} onChange={e=>setTitle(e.target.value)} />
                <input placeholder="Image URL" className="w-full px-3 py-2 rounded text-black" value={image} onChange={e=>setImage(e.target.value)} />
                <input placeholder="Tags (comma separated)" className="w-full px-3 py-2 rounded text-black" value={tags} onChange={e=>setTags(e.target.value)} />
                <input placeholder="Link" className="w-full px-3 py-2 rounded text-black" value={link} onChange={e=>setLink(e.target.value)} />
                <textarea placeholder="Description" className="w-full px-3 py-2 rounded text-black" rows={4} value={description} onChange={e=>setDescription(e.target.value)} />
                <div className="flex items-center justify-between">
                  <div className="space-x-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded" type="submit">{editingIndex !== null ? 'Save Changes' : 'Add Project'}</button>
                    {editingIndex !== null && (
                      <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded" onClick={cancelEdit}>Cancel</button>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{message}</span>
                </div>
              </form>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Existing Projects</h3>
              <div className="space-y-3">
                {projects && projects.length ? projects.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded border dark:border-gray-700">
                    <div>
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-sm text-gray-500">{(p.tags || []).join(', ')}</div>
                    </div>
                    <div className="space-x-2">
                      <a className="text-blue-500" href={p.link || '#'} target="_blank" rel="noreferrer">Open</a>
                      <button className="px-2 py-1 bg-yellow-500 text-white rounded" onClick={()=>startEdit(i)}>Edit</button>
                      <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={()=>removeProject(i)}>Remove</button>
                    </div>
                  </div>
                )) : <div className="text-sm text-gray-500">No projects</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
