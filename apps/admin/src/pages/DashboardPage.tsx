import { useEffect, useState } from "react";

const Dashboard = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsername(data.username))
      .catch(() => setUsername(null));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    location.href = "/admin/login";
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome to admin panel {username ? `, ${username}` : ""}!</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Dashboard;
