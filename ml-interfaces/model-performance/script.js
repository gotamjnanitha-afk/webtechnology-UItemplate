
const defaultMetrics = {
    accuracy: 94.5,
    precision: 92.8,
    recall: 91.6,
    f1: 92.2
};

function displayMetrics(metrics) {

    document.getElementById("accuracy").textContent =
        metrics.accuracy.toFixed(1) + "%";

    document.getElementById("precision").textContent =
        metrics.precision.toFixed(1) + "%";

    document.getElementById("recall").textContent =
        metrics.recall.toFixed(1) + "%";

    document.getElementById("f1").textContent =
        metrics.f1.toFixed(1) + "%";

    const progressBars = document.querySelectorAll(".progress div");

    const values = [
        metrics.accuracy,
        metrics.precision,
        metrics.recall,
        metrics.f1
    ];

    progressBars.forEach((bar, index) => {
        bar.style.width = values[index] + "%";
    });

    const chartBars = document.querySelectorAll(".bar");

    chartBars.forEach((bar, index) => {
        bar.style.height = values[index] + "%";
    });
}

function refreshMetrics() {

    const metrics = {
        accuracy: 90 + Math.random() * 9,
        precision: 90 + Math.random() * 9,
        recall: 90 + Math.random() * 9,
        f1: 90 + Math.random() * 9
    };

    displayMetrics(metrics);

    document.getElementById("message").textContent =
        "Sample performance metrics refreshed successfully.";
}

function resetMetrics() {

    displayMetrics(defaultMetrics);

    document.getElementById("message").textContent =
        "Performance metrics restored to default values.";
}

displayMetrics(defaultMetrics);
