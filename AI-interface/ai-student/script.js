// ===============================
// AI STUDENT ASSISTANT
// ===============================


// Get elements
const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const aiResponse = document.getElementById("aiResponse");


// Ask AI button
askButton.addEventListener("click", function () {

    const question = questionInput.value.trim();

    if (question === "") {
        showResponse("Please enter a question first.");
        return;
    }

    showResponse("Thinking... 🤔");

    setTimeout(function () {

        const answer = generateResponse(question);

        showResponse(answer);

    }, 700);

});


// Press Enter to ask
questionInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        askButton.click();
    }

});


// Quick action buttons
function quickQuestion(question) {

    questionInput.value = question;

    askButton.click();

}


// Generate simple AI-style responses
function generateResponse(question) {

    const text = question.toLowerCase();


    if (
        text.includes("study plan") ||
        text.includes("study")
    ) {

        return `
            <strong>📚 Your Study Plan</strong>
            <br><br>

            <b>1. Morning:</b> Revise important concepts for 1 hour.
            <br>

            <b>2. Afternoon:</b> Practice problems for 2 hours.
            <br>

            <b>3. Evening:</b> Review difficult topics for 1 hour.
            <br>

            <b>4. Night:</b> Take a short quiz and review mistakes.
            <br><br>

            💡 Tip: Use 50 minutes of focused study followed by
            a 10-minute break.
        `;

    }


    if (
        text.includes("quiz") ||
        text.includes("questions")
    ) {

        return `
            <strong>🧠 Quick Quiz</strong>
            <br><br>

            <b>Q1.</b> What is the time complexity of binary search?
            <br>
            A) O(n) &nbsp; B) O(log n) &nbsp; C) O(n²)
            <br><br>

            <b>Q2.</b> Which data structure follows FIFO?
            <br>
            A) Stack &nbsp; B) Queue &nbsp; C) Tree
            <br><br>

            <b>Q3.</b> Which language is commonly used for
            data science?
            <br>
            A) Python &nbsp; B) HTML &nbsp; C) CSS
        `;

    }


    if (
        text.includes("summarize") ||
        text.includes("summary") ||
        text.includes("notes")
    ) {

        return `
            <strong>📝 Notes Summary</strong>
            <br><br>

            Your notes can be summarized into:
            <br><br>

            • Identify the main topic.
            <br>
            • Extract important definitions.
            <br>
            • Highlight key concepts.
            <br>
            • Remove repeated information.
            <br>
            • Create short revision points.
            <br><br>

            💡 Tip: Keep your final revision notes short and
            organized using headings and bullet points.
        `;

    }


    if (
        text.includes("explain") ||
        text.includes("what is")
    ) {

        return `
            <strong>📖 Simple Explanation</strong>
            <br><br>

            I can explain your topic in a beginner-friendly way.
            Start by identifying the main concept, then divide it
            into smaller parts and learn each part with examples.
            <br><br>

            💡 Tip: If a concept is difficult, try explaining it
            in your own words after studying it.
        `;

    }


    if (
        text.includes("assignment") ||
        text.includes("homework")
    ) {

        return `
            <strong>📝 Assignment Assistant</strong>
            <br><br>

            Break your assignment into these steps:
            <br><br>

            1. Understand the requirements.
            <br>
            2. Research the topic.
            <br>
            3. Create an outline.
            <br>
            4. Complete each section.
            <br>
            5. Review and correct your work.
            <br><br>

            ✅ Remember to check your submission requirements
            before submitting.
        `;

    }


    // Default response

    return `
        <strong>🤖 StudyAI Response</strong>
        <br><br>

        I received your question:
        <br>
        <em>"${escapeHTML(question)}"</em>
        <br><br>

        For this demo, try asking me about:
        <br><br>

        • Study plans
        <br>
        • Notes summaries
        <br>
        • Quiz questions
        <br>
        • Assignments
        <br>
        • Topic explanations
        <br><br>

        💡 This interface can later be connected to a real
        AI API for intelligent responses.
    `;

}


// Display response
function showResponse(message) {

    aiResponse.innerHTML = message;

    aiResponse.style.display = "block";

}


// Prevent HTML injection in user input
function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ===============================
// TASK CHECKBOXES
// ===============================

const taskCheckboxes = document.querySelectorAll(
    '.task input[type="checkbox"]'
);


taskCheckboxes.forEach(function (checkbox) {

    checkbox.addEventListener("change", function () {

        const task = checkbox.parentElement;

        const title = task.querySelector("strong");

        if (checkbox.checked) {

            title.style.textDecoration = "line-through";
            title.style.opacity = "0.5";

        } else {

            title.style.textDecoration = "none";
            title.style.opacity = "1";

        }

    });

});


// ===============================
// NOTIFICATION
// ===============================

const notificationButton =
    document.querySelector(".notification");


notificationButton.addEventListener("click", function () {

    alert(
        "🔔 You have 3 study reminders and 2 upcoming exams."
    );

});