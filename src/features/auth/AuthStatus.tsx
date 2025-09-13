import React, { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { Button, Card, Input } from "../../components";

export default function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      <Card className="max-w-xs mx-4">
        <div className="mb-2">👋 Bienvenido, <b>{user.email}</b></div>
        <Button 
          onClick={handleLogout} 
          variant="danger"
          size="sm"
        >
          Cerrar sesión
        </Button>
      </Card>
    );
  }

  return (
    <Card className="max-w-xs mx-4">
      <h2 className="font-bold text-xl mb-4">🔒 Iniciar Sesión</h2>
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={setEmail}
        required
      />
      <Input
        label="Contraseña"
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
        required
      />
      <Button
        onClick={handleLogin}
        variant="primary"
        className="w-full"
      >
        Entrar
      </Button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </Card>
  );
}