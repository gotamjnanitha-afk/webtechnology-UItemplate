/* ================================
   CareerAI - AI Career Assistant
   ================================ */

const careerInput = document.getElementById("careerInput");
const askCareerButton = document.getElementById("askCareerButton");
const careerResponse = document.getElementById("careerResponse");


/* ================================
   ASK AI
   ================================ */

askCareerButton.addEventListener("click", function () {
    askCareerAI();
});


careerInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        askCareerAI();
    }
});


function askCareerAI() {

    const question = careerInput.value.trim();

    if (question === "") {

        showResponse(
            "Please enter a career question.",
            "Ask me about resumes, jobs, skills, interviews or career paths."
        );

        return;
    }

    const lowerQuestion = question.toLowerCase();

    let title = "CareerAI Recommendation";
    let message = "";

    if (
        lowerQuestion.includes("resume") ||
        lowerQuestion.includes("cv")
    ) {

        title = "Resume Improvement";

        message =
            "Your resume should clearly highlight your education, technical skills, projects and achievements. " +
            "Use strong action words, add measurable results where possible, " +
            "and customize your resume for each job description.";

    }

    else if (
        lowerQuestion.includes("job") ||
        lowerQuestion.includes("career") ||
        lowerQuestion.includes("role")
    ) {

        title = "Career Recommendation";

        message =
            "Based on a technology-focused profile, suitable career paths include " +
            "Data Analyst, Software Developer, AI/ML Engineer and Business Analyst. " +
            "Build projects and gain practical skills related to your preferred role.";

    }

    else if (
        lowerQuestion.includes("skill") ||
        lowerQuestion.includes("learn")
    ) {

        title = "Skill Gap Recommendation";

        message =
            "Focus on Python, SQL, data structures, Git/GitHub, data analysis and communication skills. " +
            "For an AI/ML career, gradually add statistics, machine learning and model deployment.";

    }

    else if (
        lowerQuestion.includes("interview") ||
        lowerQuestion.includes("interview questions")
    ) {

        title = "Interview Preparation";

        message =
            "Start with common questions about yourself, your projects and your technical skills. " +
            "Practice explaining every project using the problem, approach, technology and result. " +
            "You should also practice behavioral questions using the STAR method.";

    }

    else if (
        lowerQuestion.includes("salary") ||
        lowerQuestion.includes("package")
    ) {

        title = "Salary Guidance";

        message =
            "For a fresher, salary depends on your skills, location, company and role. " +
            "Instead of focusing only on salary, build strong projects, internships and problem-solving skills " +
            "to improve your opportunities.";

    }

    else if (
        lowerQuestion.includes("data analyst") ||
        lowerQuestion.includes("data analysis")
    ) {

        title = "Data Analyst Career Path";

        message =
            "For a Data Analyst role, focus on Excel, SQL, Python, Pandas, statistics and Power BI. " +
            "Build projects using real datasets and practice explaining your insights clearly.";

    }

    else if (
        lowerQuestion.includes("ai") ||
        lowerQuestion.includes("machine learning") ||
        lowerQuestion.includes("ml")
    ) {

        title = "AI / ML Career Path";

        message =
            "For AI/ML, learn Python, NumPy, Pandas, statistics and machine learning fundamentals. " +
            "After that, explore deep learning, NLP or computer vision and build practical projects.";

    }

    else {

        title = "CareerAI Suggestion";

        message =
            "A good career plan is to choose a target role, identify the skills required, " +
            "improve your resume, build relevant projects and practice interviews regularly. " +
            "Ask me something specific about your career and I can give you a focused recommendation.";

    }

    showResponse(title, message);
}


/* ================================
   QUICK QUESTIONS
   ================================ */

function quickCareerQuestion(question) {

    careerInput.value = question;

    askCareerAI();
}


/* ================================
   SHOW AI RESPONSE
   ================================ */

function showResponse(title, message) {

    careerResponse.innerHTML = `
        <div class="response-icon">✦</div>

        <div>
            <h3>${escapeHTML(title)}</h3>
            <p>${escapeHTML(message)}</p>
        </div>
    `;

    careerResponse.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* ================================
   FEATURE BUTTONS
   ================================ */

function showFeature(featureName) {

    let title = featureName;
    let message = "";

    if (featureName === "Resume Analyzer") {

        message =
            "Resume Analyzer checks your resume structure, skills, keywords, projects and overall presentation.";

    }

    else if (featureName === "Skill Gap Analysis") {

        message =
            "Skill Gap Analysis compares your current skills with the skills commonly required for your target career.";

    }

    else if (featureName === "Career Recommendations") {

        message =
            "CareerAI recommends career paths based on your interests, skills, education and career goals.";

    }

    else if (featureName === "Career Boost") {

        message =
            "Career Boost helps you improve your resume, learn important skills and prepare for interviews.";

    }

    else {

        message =
            featureName + " is ready to help you improve your career journey.";

    }

    showResponse(title, message);
}


/* ================================
   MOCK INTERVIEW
   ================================ */

function startInterview() {

    showResponse(
        "Mock Interview Started 🎤",
        "Question 1: Tell me about yourself and explain one project you are proud of. Take a moment to prepare your answer."
    );

}


/* ================================
   NOTIFICATION
   ================================ */

function showNotification() {

    alert(
        "CareerAI Notification\n\n" +
        "You have 3 new career recommendations and 2 interview questions waiting for you."
    );

}


/* ================================
   HTML SECURITY
   ================================ */

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ================================
   NAVIGATION DEMO
   ================================ */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


/* ================================
   INITIAL MESSAGE
   ================================ */

console.log("CareerAI loaded successfully.");