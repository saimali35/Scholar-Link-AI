// ScholarLink AI Authentication Service
// Simulated authentication layer using localStorage
const Auth = {
  // Check if a user is currently logged in
  isAuthenticated() {
    return localStorage.getItem("currentUser") !== null;
  },
  // Get current logged-in user data
  getCurrentUser() {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  },
  // Register a new user
  register(name, email, password) {
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return { success: false, message: "Email is already registered!" };
    }
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    // Log the user in immediately
    localStorage.setItem("currentUser", JSON.stringify({ name, email }));
    // Create an initial student profile based on registration info
    const initialProfile = {
      fullName: name,
      email: email,
      age: "",
      gender: "Male",
      state: "Maharashtra",
      course: "B.Tech",
      collegeName: "",
      currentYear: "1st Year",
      cgpa: "",
      income: "",
      category: "General",
      minority: "No",
      disability: "No"
    };
    localStorage.setItem("studentProfile", JSON.stringify(initialProfile));
    return { success: true };
  },
  // Login verification
  login(email, password) {
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Check hardcoded/demo credentials as a fallback to make testing easy!
    if (email === "demo@scholarlink.ai" && password === "demo123") {
      const demoUser = { name: "Demo Student", email: "demo@scholarlink.ai" };
      localStorage.setItem("currentUser", JSON.stringify(demoUser));
      
      // Ensure profile exists for demo user
      if (!localStorage.getItem("studentProfile")) {
        const demoProfile = {
          fullName: "Demo Student",
          email: "demo@scholarlink.ai",
          age: "20",
          gender: "Male",
          state: "Maharashtra",
          course: "B.Tech",
          collegeName: "IIT Bombay",
          currentYear: "2nd Year",
          cgpa: "8.5",
          income: "450000",
          category: "General",
          minority: "No",
          disability: "No"
        };
        localStorage.setItem("studentProfile", JSON.stringify(demoProfile));
      }
      return { success: true };
    }
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { success: false, message: "Invalid email or password!" };
    }
    localStorage.setItem("currentUser", JSON.stringify({ name: user.name, email: user.email }));
    return { success: true };
  },
  // Logout
  logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  },
  // Protection helper for private dashboard pages
  protectPage() {
    if (!this.isAuthenticated()) {
      window.location.href = "login.html";
    }
  }
};
window.Auth = Auth;