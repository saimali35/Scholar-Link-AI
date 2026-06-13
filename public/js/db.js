// ScholarLink AI Mock Database Layer
// Handles state persistence in localStorage
const DEFAULT_SCHOLARSHIPS = [
  {
    id: "sch-1",
    name: "Google Generation Scholarship (Asia Pacific)",
    provider: "Google Inc.",
    amount: "₹1,80,000",
    amountNumeric: 180000,
    deadline: "2026-09-15",
    description: "Established to help aspiring computer scientists excel in technology. Selected students will receive funding for the academic year and participate in professional development workshops.",
    benefits: [
      "Financial award of ₹1,80,000 to cover tuition and study materials.",
      "Access to exclusive Google mentorship and networking events.",
      "Priority consideration for Google internship programs."
    ],
    eligibilityCriteria: [
      "Must be currently enrolled as a full-time student in a Bachelor's program.",
      "Must be in the 2nd or 3rd year of study.",
      "Course of study must be Computer Science, Computer Engineering, or closely related technical field.",
      "Academic percentage of 75% (or 7.5 CGPA) and above."
    ],
    requiredDocuments: [
      "Resume/CV showing academic achievements and leadership experiences.",
      "Official academic transcript from your current college.",
      "Two essay responses addressing diversity and passion for computer science.",
      "Reference letter from a professor or academic advisor."
    ],
    applicationProcess: "Applications must be submitted online through the Google Careers portal. Candidates will complete a technical assessment followed by two interview rounds.",
    state: "All",
    minCGPA: 7.5,
    minPercentage: 75,
    maxIncome: 1200000,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    courses: ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "BCA", "MCA"],
    minorityOnly: false,
    disabilityOnly: false,
    tags: ["Tech", "Women in STEM", "Global"]
  },
  {
    id: "sch-2",
    name: "Reliance Foundation Undergraduate Scholarship",
    provider: "Reliance Foundation",
    amount: "₹2,00,000",
    amountNumeric: 200000,
    deadline: "2026-10-30",
    description: "Aims to support meritorious students from all streams to pursue undergraduate education in India. The scholarship focuses on leadership development and academic excellence.",
    benefits: [
      "Up to ₹2,00,000 support over the duration of the degree course.",
      "Membership in a vibrant alumni network of Reliance Scholars.",
      "Invitation to exclusive annual youth leadership seminars."
    ],
    eligibilityCriteria: [
      "Must be an Indian citizen.",
      "Enrolled in 1st year of any full-time undergraduate degree program.",
      "Minimum 60% marks in 12th Standard examinations.",
      "Annual family income must be less than ₹15,00,000 (Preference to income under ₹2,50,000)."
    ],
    requiredDocuments: [
      "10th and 12th standard mark sheets.",
      "Current college admission letter/fee receipt.",
      "Family income certificate issued by a competent authority.",
      "Identity proof (Aadhaar Card, Passport, etc.)."
    ],
    applicationProcess: "Fill the online registration form, complete an online aptitude test consisting of cognitive and analytical sections, followed by an interview round.",
    state: "All",
    minCGPA: 6.0,
    minPercentage: 60,
    maxIncome: 1500000,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    courses: ["Any"],
    minorityOnly: false,
    disabilityOnly: false,
    tags: ["Merit-cum-Means", "Undergraduate"]
  },
  {
    id: "sch-3",
    name: "National Means-Cum-Merit Scholarship (NMMSS)",
    provider: "Ministry of Education, Govt of India",
    amount: "₹12,000 / Year",
    amountNumeric: 12000,
    deadline: "2026-07-25",
    description: "An initiative by the Central Government to arrest drop-out rates of students after class VIII and encourage them to complete secondary and higher secondary education.",
    benefits: [
      "Yearly stipend of ₹12,000 deposited directly into the student bank account.",
      "Exemption from school tuition fees in state-run schools."
    ],
    eligibilityCriteria: [
      "Must have secured at least 55% marks in class VII exam.",
      "Family income from all sources must not exceed ₹3,50,000 per annum.",
      "Must be studying in Government, Government-aided, or Local body schools."
    ],
    requiredDocuments: [
      "Academic transcript of previous year class.",
      "Income certificate of parents.",
      "Caste/Category certificate (if applicable).",
      "Disability certificate (if applicable)."
    ],
    applicationProcess: "Students must appear for a state-level written selection test consisting of the Mental Ability Test (MAT) and Scholastic Aptitude Test (SAT).",
    state: "All",
    minCGPA: 5.5,
    minPercentage: 55,
    maxIncome: 350000,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    courses: ["High School", "Diploma"],
    minorityOnly: false,
    disabilityOnly: false,
    tags: ["Government", "Means-Based"]
  },
  {
    id: "sch-4",
    name: "Savitribai Phule Scholarship for Girls",
    provider: "Department of Social Justice, Maharashtra",
    amount: "₹36,000",
    amountNumeric: 36000,
    deadline: "2026-08-15",
    description: "Designed specifically to promote female education and empowerment in Maharashtra. Supports girls from weaker financial backgrounds pursuing higher technical and professional degrees.",
    benefits: [
      "Annual scholarship amount of ₹36,000.",
      "Subsidized hostel accommodations and book bank facilities."
    ],
    eligibilityCriteria: [
      "Must be a female student domiciled in Maharashtra.",
      "Enrolled in any UG/PG course in a recognized college in Maharashtra.",
      "Family income must be below ₹6,00,000 per annum.",
      "Must belong to OBC, SC, ST or EWS category."
    ],
    requiredDocuments: [
      "Maharashtra Domicile Certificate.",
      "Previous college passing certificate/mark sheet.",
      "Caste Certificate and Non-Creamy Layer certificate.",
      "Income certificate certified by Tehsildar."
    ],
    applicationProcess: "Apply online through the MahaDBT portal. Document verification will be conducted by the college nodal officer, followed by direct benefit transfer.",
    state: "Maharashtra",
    minCGPA: 5.0,
    minPercentage: 50,
    maxIncome: 600000,
    categories: ["OBC", "SC", "ST", "EWS"],
    courses: ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "B.Com", "M.Com", "BBA", "MBA", "BCA", "MCA", "Any"],
    minorityOnly: false,
    disabilityOnly: false,
    tags: ["Girls-Only", "State-Sponsored", "Maharashtra"]
  },
  {
    id: "sch-5",
    name: "Aditya Birla Capital Scholarship Scheme",
    provider: "Aditya Birla Capital Foundation",
    amount: "₹60,000",
    amountNumeric: 60000,
    deadline: "2026-09-30",
    description: "A CSR initiative of Aditya Birla Capital Limited aiming to provide financial assistance to students who have suffered personal or financial crises, ensuring continuity of their education.",
    benefits: [
      "One-time financial assistance of up to ₹60,000.",
      "Mental health and academic counseling support workshops."
    ],
    eligibilityCriteria: [
      "Open to students studying in class 9 to 12 or pursuing graduation courses.",
      "Must have scored at least 60% marks in the previous class.",
      "Family income must not exceed ₹6,00,000 per annum.",
      "Preference given to students facing active crises (parental loss, illness, etc.)."
    ],
    requiredDocuments: [
      "Previous year marksheet.",
      "Current year admission receipt & ID card.",
      "Income proof / Crisis declaration certificate.",
      "Bank account passbook copy."
    ],
    applicationProcess: "Submit applications through Buddy4Study portal. Shortlisted candidates undergo telephone interview rounds followed by document validation.",
    state: "All",
    minCGPA: 6.0,
    minPercentage: 60,
    maxIncome: 600000,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    courses: ["Any", "B.Tech", "B.Sc", "B.Com", "BBA", "BCA"],
    minorityOnly: false,
    disabilityOnly: false,
    tags: ["CSR", "Crisis-Support"]
  },
  {
    id: "sch-6",
    name: "Post Matric Scholarship Scheme for SC Students",
    provider: "Ministry of Social Justice, Govt of India",
    amount: "₹1,20,000 / Year",
    amountNumeric: 120000,
    deadline: "2026-08-31",
    description: "Centrally sponsored scheme that aims to provide financial support to Scheduled Caste (SC) students to complete their post-matric/post-secondary level education.",
    benefits: [
      "100% tuition fee reimbursement for government and private colleges.",
      "Monthly maintenance allowance of up to ₹1,200.",
      "Additional allowance for blind/differently-abled scholars."
    ],
    eligibilityCriteria: [
      "Must be an Indian national belonging to the Scheduled Caste (SC) category.",
      "Family income from all sources must not exceed ₹2,50,000 per annum.",
      "Must be enrolled in post-matric studies at a recognized institution."
    ],
    requiredDocuments: [
      "Caste Certificate issued by authorized Revenue officer.",
      "Income declaration certificate.",
      "Fee structure certified by the college.",
      "Aadhaar linked Bank Passbook."
    ],
    applicationProcess: "Register on the National Scholarship Portal (NSP). Apply under the Ministry of Social Justice & Empowerment tab and upload required certificates.",
    state: "All",
    minCGPA: 4.5,
    minPercentage: 45,
    maxIncome: 250000,
    categories: ["SC"],
    courses: ["Any"],
    minorityOnly: false,
    disabilityOnly: false,
    tags: ["Government", "SC-Only"]
  },
  {
    id: "sch-7",
    name: "Pre-Matric & Post-Matric Scholarship for Minorities",
    provider: "Ministry of Minority Affairs, India",
    amount: "₹45,000",
    amountNumeric: 45000,
    deadline: "2026-07-20",
    description: "Aims to support educational opportunities for students from minority communities (Muslim, Christian, Sikh, Buddhist, Parsi, Jain) to enhance their socioeconomic status.",
    benefits: [
      "Reimbursement of tuition fees up to ₹30,000.",
      "Maintenance allowance of up to ₹15,000."
    ],
    eligibilityCriteria: [
      "Must belong to one of the notified minority communities.",
      "Must be studying in class 11th, 12th, or pursuing UG/PG graduation.",
      "Minimum 50% marks in the previous final examination.",
      "Family income must not exceed ₹2,00,000 per annum."
    ],
    requiredDocuments: [
      "Self-declaration minority community certificate.",
      "Self-attested mark sheet of previous class.",
      "Income certificate issued by State authorities.",
      "Verification form signed by head of institution."
    ],
    applicationProcess: "Apply via National Scholarship Portal (NSP). Requires verification first by institute, then by district nodal officer, and finally state board.",
    state: "All",
    minCGPA: 5.0,
    minPercentage: 50,
    maxIncome: 200000,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    courses: ["Any"],
    minorityOnly: true,
    disabilityOnly: false,
    tags: ["Government", "Minority-Only"]
  },
  {
    id: "sch-8",
    name: "NTPC Scholarship Scheme for Disabled Students",
    provider: "National Thermal Power Corporation (NTPC)",
    amount: "₹1,50,000",
    amountNumeric: 150000,
    deadline: "2026-10-15",
    description: "NTPC invites applications from differently-abled engineering and management students. This initiative aims to foster inclusivity and support technical talents in India.",
    benefits: [
      "Financial assistance of ₹1,50,000 per academic year.",
      "Laptops and customized assistive studying kits.",
      "Possibility of project internship at NTPC power plants."
    ],
    eligibilityCriteria: [
      "Must be an Indian student enrolled in 3rd or 4th year B.Tech, or 1st/2nd year MBA.",
      "Must have a physical disability percentage of 40% or more (as certified by medical board).",
      "No income cap, but preference to EWS students.",
      "Passed previous semester exams with no active backlogs."
    ],
    requiredDocuments: [
      "Official Disability Certificate with 40%+ rating.",
      "College enrollment and semester report card transcripts.",
      "Reference letter from college dean/principal.",
      "Valid government ID card."
    ],
    applicationProcess: "Send physical application form along with attested documents to NTPC HR-Corporate Office, New Delhi, or submit via official online portal.",
    state: "All",
    minCGPA: 5.5,
    minPercentage: 55,
    maxIncome: 2000000,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    courses: ["B.Tech", "M.Tech", "MBA"],
    minorityOnly: false,
    disabilityOnly: true,
    tags: ["Differently-Abled", "Corporate", "Inclusivity"]
  },
  {
    id: "sch-9",
    name: "Karnataka Vidyasiri Scholarship",
    provider: "Backward Classes Welfare Department, Karnataka",
    amount: "₹15,000",
    amountNumeric: 15000,
    deadline: "2026-08-30",
    description: "Food and Accommodation scheme launched by the State of Karnataka. Supports OBC, SC, ST students who live in rural areas and are studying in cities but could not secure government hostel placements.",
    benefits: [
      "Monthly allowance of ₹1,500 for 10 months (₹15,000 total) to cover room rent and meals.",
      "Travel passes at highly subsidized rates."
    ],
    eligibilityCriteria: [
      "Must be a permanent resident (domicile) of Karnataka.",
      "Belong to OBC, SC, or ST categories.",
      "Enrolled in post-metric course (UG/PG/Diploma).",
      "Family income limit is ₹2,50,000 (OBC) and ₹6,00,000 (SC/ST).",
      "Distance from hometown to college must be at least 5km."
    ],
    requiredDocuments: [
      "Karnataka SSLC registration number.",
      "Caste and Income RD numbers.",
      "Bank Account details with Aadhaar seeding confirmation.",
      "Rent Agreement / Hostel warden certificate."
    ],
    applicationProcess: "Apply online through State Scholarship Portal (SSP). Provide Aadhaar and Caste numbers which will automatically sync and verify student data.",
    state: "Karnataka",
    minCGPA: 5.0,
    minPercentage: 50,
    maxIncome: 600000,
    categories: ["OBC", "SC", "ST"],
    courses: ["Any", "B.Tech", "B.Sc", "B.Com", "BCA", "Diploma"],
    minorityOnly: false,
    disabilityOnly: false,
    tags: ["State-Sponsored", "Hostel-Means", "Karnataka"]
  },
  {
    id: "sch-10",
    name: "Tata Scholarship at Cornell University (USA)",
    provider: "Tata Education and Development Trust",
    amount: "₹55,00,000 / Year",
    amountNumeric: 5500000,
    deadline: "2026-06-30",
    description: "A prestigious scholarship designed to allow undergraduate students from India to attend Cornell University, regardless of their family's financial circumstances.",
    benefits: [
      "Covers full tuition, international travel costs, living expenses, and health insurance.",
      "Assistance for up to 4 years of undergraduate study at Cornell."
    ],
    eligibilityCriteria: [
      "Must be a citizen and permanent resident of India.",
      "Must have attended secondary school in India.",
      "Must be offered admission to Cornell University as an undergraduate student.",
      "Must qualify for need-based financial aid."
    ],
    requiredDocuments: [
      "Cornell Admission Letter.",
      "Standardized test reports (SAT/ACT, TOEFL/IELTS).",
      "CSS Profile financial aid application form.",
      "Indian taxation documents / Parental income proofs."
    ],
    applicationProcess: "Apply for admission to Cornell University. Concurrently complete the CSS Profile indicating need. Tata selection committee reviews eligible candidates.",
    state: "All",
    minCGPA: 8.5,
    minPercentage: 85,
    maxIncome: 3000000,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    courses: ["B.Tech", "B.Sc", "B.Arch", "Any"],
    minorityOnly: false,
    disabilityOnly: false,
    tags: ["International", "Prestigious", "Study-Abroad"]
  }
];
const DEFAULT_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "deadline",
    title: "Deadline Approving Soon!",
    message: "Google Generation Scholarship (Asia Pacific) closes in 5 days. Ensure all essay answers are uploaded.",
    time: "2 hours ago",
    read: false
  },
  {
    id: "notif-2",
    type: "new",
    title: "New Matching Scholarship Found",
    message: "Reliance Foundation Undergraduate Scholarship is a 95% match for your updated profile.",
    time: "1 day ago",
    read: false
  },
  {
    id: "notif-3",
    type: "system",
    title: "Profile Setup Complete",
    message: "Welcome to ScholarLink AI! Complete your academic profile to unlock personalized recommendations.",
    time: "3 days ago",
    read: true
  }
];
const DEFAULT_ROADMAP_TASKS = [
  {
    id: "task-1",
    month: "June 2026",
    title: "Document Preparation",
    desc: "Scan and gather current transcripts, family income certificate, and caste certificate.",
    completed: true
  },
  {
    id: "task-2",
    month: "July 2026",
    title: "Write Essays & SOPs",
    desc: "Draft standard Statement of Purpose (SOP) and answer standard diversity essay prompts.",
    completed: false
  },
  {
    id: "task-3",
    month: "August 2026",
    title: "Apply for Post-Matric & State Scholarships",
    desc: "Submit Karnataka SSP / Savitribai Phule forms as their windows open.",
    completed: false
  },
  {
    id: "task-4",
    month: "September 2026",
    title: "Submit Google Generation Scholarship",
    desc: "Review resume, get recommendations, and complete submission by September 15.",
    completed: false
  },
  {
    id: "task-5",
    month: "October 2026",
    title: "Aptitude Tests & Interviews",
    desc: "Prepare for Reliance Aptitude Test and attend mock interviews.",
    completed: false
  }
];
// Database Utilities
const DB = {
  // Initialize localStorage with default values if empty
  init() {
    if (!localStorage.getItem("scholarships")) {
      localStorage.setItem("scholarships", JSON.stringify(DEFAULT_SCHOLARSHIPS));
    }
    if (!localStorage.getItem("notifications")) {
      localStorage.setItem("notifications", JSON.stringify(DEFAULT_NOTIFICATIONS));
    }
    if (!localStorage.getItem("roadmapTasks")) {
      localStorage.setItem("roadmapTasks", JSON.stringify(DEFAULT_ROADMAP_TASKS));
    }
    if (!localStorage.getItem("savedScholarships")) {
      localStorage.setItem("savedScholarships", JSON.stringify([]));
    }
    if (!localStorage.getItem("applications")) {
      localStorage.setItem("applications", JSON.stringify([]));
    }
    if (!localStorage.getItem("chatHistory")) {
      localStorage.setItem("chatHistory", JSON.stringify([
        { role: "assistant", content: "Hello! I am your ScholarLink AI assistant. How can I help you today? You can ask me about eligibility criteria, document requirements, or help with drafting essays!", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]));
    }
  },
  // Profile management
  getProfile() {
    const profile = localStorage.getItem("studentProfile");
    return profile ? JSON.parse(profile) : null;
  },
  saveProfile(profileData) {
    localStorage.setItem("studentProfile", JSON.stringify(profileData));
    // Trigger notification
    this.addNotification({
      type: "system",
      title: "Profile Updated",
      message: "Your profile details have been updated. Your scholarship match scores were recalculated.",
      time: "Just now"
    });
  },
  // Scholarships management
  getScholarships() {
    this.init();
    return JSON.parse(localStorage.getItem("scholarships"));
  },
  getScholarshipById(id) {
    const scholarships = this.getScholarships();
    return scholarships.find(s => s.id === id) || null;
  },
  // Saved/Applied states
  getSavedScholarshipIds() {
    this.init();
    return JSON.parse(localStorage.getItem("savedScholarships"));
  },
  toggleSaveScholarship(id) {
    const savedIds = this.getSavedScholarshipIds();
    const index = savedIds.indexOf(id);
    let saved = false;
    if (index === -1) {
      savedIds.push(id);
      saved = true;
      this.addNotification({
        type: "system",
        title: "Scholarship Saved",
        message: `Successfully saved: ${this.getScholarshipById(id)?.name}`,
        time: "Just now"
      });
    } else {
      savedIds.splice(index, 1);
      this.addNotification({
        type: "system",
        title: "Scholarship Removed",
        message: `Removed from saved: ${this.getScholarshipById(id)?.name}`,
        time: "Just now"
      });
    }
    localStorage.setItem("savedScholarships", JSON.stringify(savedIds));
    return saved;
  },
  getApplications() {
    this.init();
    return JSON.parse(localStorage.getItem("applications"));
  },
  applyForScholarship(id) {
    const apps = this.getApplications();
    const existing = apps.find(a => a.scholarshipId === id);
    if (!existing) {
      apps.push({
        scholarshipId: id,
        status: "Applied",
        dateApplied: new Date().toISOString().split('T')[0]
      });
      localStorage.setItem("applications", JSON.stringify(apps));
      // Remove from saved if present, but keep application
      this.addNotification({
        type: "new",
        title: "Application Submitted",
        message: `Your application placeholder for ${this.getScholarshipById(id)?.name} is marked as Applied!`,
        time: "Just now"
      });
      return true;
    }
    return false;
  },
  removeApplication(id) {
    let apps = this.getApplications();
    apps = apps.filter(a => a.scholarshipId !== id);
    localStorage.setItem("applications", JSON.stringify(apps));
    return true;
  },
  // Calculations: Calculate Matching Score & Eligibility
  calculateMatchScore(scholarship, profile) {
    if (!profile) {
      // Return a standard 75% match with "Complete Profile" status if no profile
      return { score: 75, eligible: true, reasons: ["Profile setup not completed. Showing average eligibility estimation."] };
    }
    let score = 100;
    let reasons = [];
    let eligible = true;
    // 1. Income Check
    const income = Number(profile.income) || 0;
    if (scholarship.maxIncome && income > scholarship.maxIncome) {
      eligible = false;
      score -= 40;
      reasons.push(`Family Income (₹${income.toLocaleString()}) exceeds the limit of ₹${scholarship.maxIncome.toLocaleString()}`);
    } else {
      reasons.push("Income fits within criteria.");
    }
    // 2. CGPA / Percentage Check
    const studentCGPA = Number(profile.cgpa) || 0;
    const studentPercentage = Number(profile.cgpa) || 0; // The UI form collects percentage or CGPA. Let's support both.
    
    // Determine limit
    const minPct = scholarship.minPercentage || (scholarship.minCGPA * 10) || 50;
    const studentValue = studentCGPA <= 10 ? studentCGPA * 10 : studentCGPA; // convert CGPA to % equivalent for rough check
    if (studentValue < minPct) {
      score -= 20;
      reasons.push(`Academic score (${studentCGPA} / ${studentPercentage}%) is below the minimum threshold of ${minPct}% / ${scholarship.minCGPA || minPct/10} CGPA`);
      if (studentValue < minPct - 15) {
        eligible = false; // complete mismatch if too low
      }
    } else {
      reasons.push("Academic criteria satisfied.");
    }
    // 3. Category Check
    if (scholarship.categories && scholarship.categories.length > 0) {
      if (!scholarship.categories.includes(profile.category)) {
        score -= 25;
        reasons.push(`Scholarship is designated for ${scholarship.categories.join('/')} categories (Student profile category: ${profile.category})`);
        eligible = false;
      } else {
        reasons.push("Category matched.");
      }
    }
    // 4. State Check
    if (scholarship.state !== "All" && profile.state) {
      if (scholarship.state.toLowerCase() !== profile.state.toLowerCase()) {
        score -= 15;
        reasons.push(`Scholarship is restricted to students domiciled in ${scholarship.state} (Student domicile: ${profile.state})`);
        eligible = false;
      } else {
        reasons.push("Domicile matched.");
      }
    }
    // 5. Course check
    if (scholarship.courses && !scholarship.courses.includes("Any")) {
      const match = scholarship.courses.some(c => c.toLowerCase() === profile.course.toLowerCase());
      if (!match) {
        score -= 10;
        reasons.push(`Course is designated for ${scholarship.courses.join(', ')} (Student course: ${profile.course})`);
      } else {
        reasons.push("Course of study matches criteria.");
      }
    }
    // 6. Minority check
    if (scholarship.minorityOnly && profile.minority !== "Yes") {
      score -= 30;
      eligible = false;
      reasons.push("Scholarship is reserved for minority communities.");
    }
    // 7. Disability check
    if (scholarship.disabilityOnly && profile.disability !== "Yes") {
      score -= 30;
      eligible = false;
      reasons.push("Scholarship is reserved for students with disabilities.");
    }
    // Make sure score stays within bounds
    score = Math.max(0, Math.min(100, score));
    return {
      score: score,
      eligible: eligible && score >= 50,
      reasons: reasons
    };
  },
  // Notifications
  getNotifications() {
    this.init();
    return JSON.parse(localStorage.getItem("notifications"));
  },
  addNotification(notif) {
    const list = this.getNotifications();
    const newNotif = {
      id: "notif-" + Date.now(),
      read: false,
      ...notif
    };
    list.unshift(newNotif);
    localStorage.setItem("notifications", JSON.stringify(list));
  },
  markAllNotificationsRead() {
    const list = this.getNotifications();
    list.forEach(n => n.read = true);
    localStorage.setItem("notifications", JSON.stringify(list));
  },
  // Roadmap tasks
  getRoadmapTasks() {
    this.init();
    return JSON.parse(localStorage.getItem("roadmapTasks"));
  },
  toggleRoadmapTask(id) {
    const tasks = this.getRoadmapTasks();
    const t = tasks.find(x => x.id === id);
    if (t) {
      t.completed = !t.completed;
      localStorage.setItem("roadmapTasks", JSON.stringify(tasks));
      
      this.addNotification({
        type: "system",
        title: "Roadmap Task Updated",
        message: `Goal: "${t.title}" marked as ${t.completed ? "Completed" : "Active"}.`,
        time: "Just now"
      });
      return t.completed;
    }
    return false;
  },
  addRoadmapTask(month, title, desc) {
    const tasks = this.getRoadmapTasks();
    const newTask = {
      id: "task-" + Date.now(),
      month,
      title,
      desc,
      completed: false
    };
    tasks.push(newTask);
    localStorage.setItem("roadmapTasks", JSON.stringify(tasks));
    return newTask;
  },
  // Chat/AI assistant history
  getChatHistory() {
    this.init();
    return JSON.parse(localStorage.getItem("chatHistory"));
  },
  addChatMessage(role, content) {
    const history = this.getChatHistory();
    history.push({
      role,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    localStorage.setItem("chatHistory", JSON.stringify(history));
  },
  clearChatHistory() {
    localStorage.removeItem("chatHistory");
    this.init();
  }
};
// Initialize DB immediately
DB.init();
window.DB = DB;
