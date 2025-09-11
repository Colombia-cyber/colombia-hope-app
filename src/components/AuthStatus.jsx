import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function AuthStatus() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      setError("");
      setEmail("");
      setPass("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      <div style={{padding: 16, maxWidth: 320, margin: '16px auto', background: '#f9f9f9', borderRadius: 10}}>
        <div style={{marginBottom: 8}}>👋 Bienvenido, <b>{user.email}</b></div>
        <button onClick={handleLogout} style={{background: 'red', color: 'white', padding: '8px 16px', borderRadius: 6, border: 0}}>Cerrar sesión</button>
      </div>
    );
  }

  return (
    <div style={{padding: 16, maxWidth: 320, margin: '16px auto', background: '#f9f9f9', borderRadius: 10}}>
      <h2 style={{fontWeight: 'bold', fontSize: 22, marginBottom: 16}}>🔒 Iniciar Sesión</h2>
      <input
        style={{borderRadius: 6, border: '1px solid #ccc', padding: 8, marginBottom: 8, width: '100%'}}
        placeholder="Email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
      />
      <input
        type="password"
        style={{borderRadius: 6, border: '1px solid #ccc', padding: 8, marginBottom: 8, width: '100%'}}
        placeholder="Password"
        value={pass}
        onChange={e=>setPass(e.target.value)}
      />
      <button
        onClick={handleLogin}
        style={{background: '#1976d2', color: 'white', padding: '8px 16px', borderRadius: 6, border: 0, width: '100%'}}
      >Entrar</button>
      {error && <div style={{color: 'red', marginTop: 8}}>{error}</div>}
    </div>
  );
}