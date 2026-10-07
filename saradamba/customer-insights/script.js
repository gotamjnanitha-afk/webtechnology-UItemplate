// ======================================
// Customer Insights Dashboard
// ======================================


// Period Filter
const periodFilter = document.getElementById("periodFilter");

periodFilter.addEventListener("change", function () {

    const period = this.value;

    if (period === "month") {

        updateKPIs(
            "24,850",
            "18,420",
            "3,280",
            "74.2%"
        );

    }

    else if (period === "quarter") {

        updateKPIs(
            "68,420",
            "51,280",
            "9,640",
            "76.5%"
        );

    }

    else if (period === "year") {

        updateKPIs(
            "2,48,650",
            "1,92,480",
            "42,850",
            "78.3%"
        );

    }

});


// Update KPI cards
function updateKPIs(
    customers,
    activeUsers,
    newCustomers,
    retention
) {

    document.getElementById("customers").textContent =
        customers;

    document.getElementById("activeUsers").textContent =
        activeUsers;

    document.getElementById("newCustomers").textContent =
        newCustomers;

    document.getElementById("retention").textContent =
        retention;

}


// Export customer report
function exportReport() {

    const report = `
CUSTOMER INSIGHTS REPORT
------------------------

Total Customers: 24,850
Active Users: 18,420
New Customers: 3,280
Retention Rate: 74.2%

Customer Segments
-----------------
Premium: 26%
Regular: 48%
New: 17%
Inactive: 9%

Conversion Funnel
-----------------
Website Visitors: 82,450
Sign Ups: 32,840
Active Users: 18,420
Purchasers: 8,640
`;

    const blob = new Blob(
        [report],
        { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
        "customer-insights-report.txt";

    link.click();

    URL.revokeObjectURL(url);
}


// Growth filter
const growthFilter =
    document.getElementById("growthFilter");

growthFilter.addEventListener("change", function () {

    if (this.value === "Weekly") {

        alert(
            "Weekly customer growth data selected."
        );

    } else {

        alert(
            "Monthly customer growth data selected."
        );

    }

});


// Cohort details
function showCohortMessage() {

    alert(
        "Cohort analysis shows how customer retention changes over time for each signup group."
    );

}