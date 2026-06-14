// ScholarLink AI Authentication Service
// Authentication layer persisted through the Express backend database.
const Auth = {
  recordLogin(user) {
    const loggedInUser = {
      name: user.name,
      email: user.email,
      lastLogin: new Date().toISOString()
    };
    const loginHistory = JSON.parse(ServerStore.getItem("loginHistory") || "[]");

    loginHistory.unshift({
      email: loggedInUser.email,
      name: loggedInUser.name,
      loggedInAt: loggedInUser.lastLogin
    });

    ServerStore.setItem("currentUser", JSON.stringify(loggedInUser));
    ServerStore.setItem("loginHistory", JSON.stringify(loginHistory));
    return loggedInUser;
  },
  // Check if a user is currently logged in
  isAuthenticated() {
    return ServerStore.getItem("currentUser") !== null;
  },
  // Get current logged-in user data
  getCurrentUser() {
    const user = ServerStore.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  },
  // Register a new user
  register(name, email, password) {
    const users = JSON.parse(ServerStore.getItem("registeredUsers") || "[]");
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return { success: false, message: "Email is already registered!" };
    }
    const newUser = { name, email, password, createdAt: new Date().toISOString(), lastLogin: null };
    users.push(newUser);
    ServerStore.setItem("registeredUsers", JSON.stringify(users));
    // Log the user in immediately
    this.recordLogin({ name, email });
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
    ServerStore.setItem("studentProfile", JSON.stringify(initialProfile));
    return { success: true };
  },
  // Login verification
  login(email, password) {
    const users = JSON.parse(ServerStore.getItem("registeredUsers") || "[]");
    
    // Check hardcoded/demo credentials as a fallback to make testing easy!
    if (email === "demo@scholarlink.ai" && password === "demo123") {
      const demoUser = { name: "Demo Student", email: "demo@scholarlink.ai" };
      this.recordLogin(demoUser);
      
      // Ensure profile exists for demo user
      if (!ServerStore.getItem("studentProfile")) {
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
        ServerStore.setItem("studentProfile", JSON.stringify(demoProfile));
      }
      return { success: true };
    }
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { success: false, message: "Invalid email or password!" };
    }
    user.lastLogin = new Date().toISOString();
    ServerStore.setItem("registeredUsers", JSON.stringify(users));
    this.recordLogin({ name: user.name, email: user.email });
    return { success: true };
  },
  // Logout
  logout() {
    ServerStore.removeItem("currentUser");
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

