
const defaultDrift = {
    age: 0.20,
    income: 0.35,
    experience: 0.12
};

function updateFeature(name, value) {

    const percentage = value * 100;

    const statusElement = document.getElementById(name + "Status");
    const barElement = document.getElementById(name + "Bar");
    const chartElement = document.getElementById(name + "Chart");

    let status = "Normal";
    let color = "#10b981";

    if (value > 0.5) {
        status = "High Drift";
        color = "#f87171";
    } else if (value > 0.3) {
        status = "Moderate";
        color = "#fbbf24";
    }

    statusElement.textContent = status;
    statusElement.style.color = color;

    barElement.style.width = percentage + "%";
    barElement.style.background = color;

    chartElement.style.height = percentage + "%";
    chartElement.style.background = color;
}

function runMonitoring() {

    // Generate sample drift values

    const drift = {
        age: Math.random() * 0.8,
        income: Math.random() * 0.8,
        experience: Math.random() * 0.8
    };

    const features = [
        { name: "age", label: "Age" },
        { name: "income", label: "Annual Income" },
        { name: "experience", label: "Work Experience" }
    ];

    let alerts = [];

    let totalDrift = 0;

    features.forEach(feature => {

        const value = drift[feature.name];

        updateFeature(feature.name, value);

        totalDrift += value;

        if (value > 0.5) {
            alerts.push(feature.label + " has high data drift.");
        }

    });

    // Calculate average drift score

    const averageDrift = totalDrift / features.length;

    document.getElementById("driftScore").textContent =
        averageDrift.toFixed(2);

    // Overall drift status

    const statusElement = document.getElementById("driftStatus");

    if (averageDrift > 0.5) {

        statusElement.textContent = "High Drift";
        statusElement.className = "danger";

    } else if (averageDrift > 0.3) {

        statusElement.textContent = "Moderate Drift";
        statusElement.className = "warning";

    } else {

        statusElement.textContent = "Normal";
        statusElement.className = "good";

    }

    // Update alert count

    document.getElementById("alertCount").textContent =
        alerts.length;

    // Display alerts

    const alertList = document.getElementById("alertList");

    if (alerts.length > 0) {

        alertList.innerHTML = alerts.map(alert => `
            <div class="alert">⚠️ ${alert}</div>
        `).join("");

    } else {

        alertList.innerHTML = `
            <div class="alert-ok">
                ✓ No significant feature drift detected.
            </div>
        `;

    }

    // Display monitoring summary

    document.getElementById("monitorResult").innerHTML = `
        <h3>Monitoring Completed</h3>
        <p>Average Drift Score: ${averageDrift.toFixed(2)}</p>
        <p>Features Checked: 3</p>
        <p>Alerts Found: ${alerts.length}</p>
        <p>Status: ${statusElement.textContent}</p>
    `;

}


// Reset dashboard

function resetMonitoring() {

    updateFeature("age", defaultDrift.age);
    updateFeature("income", defaultDrift.income);
    updateFeature("experience", defaultDrift.experience);

    document.getElementById("driftStatus").textContent = "Normal";
    document.getElementById("driftStatus").className = "good";

    document.getElementById("driftScore").textContent = "0.12";

    document.getElementById("alertCount").textContent = "0";

    document.getElementById("monitorResult").textContent =
        "Waiting for monitoring check.";

    document.getElementById("alertList").innerHTML = `
        <p class="empty">No drift alerts detected.</p>
    `;

}
