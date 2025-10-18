const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const signIn = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE}/api/admin/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to sign in");
    }

    return data;
  } catch (err) {
    console.error("Sign-in error:", err);
    throw err;
  }
};
