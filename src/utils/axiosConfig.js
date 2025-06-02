const handleLogin = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/Auth/login", {
      email,
      password,
    });

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      // Navigate to dashboard
    } else {
      alert("Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. Please check your credentials.");
  }
};
