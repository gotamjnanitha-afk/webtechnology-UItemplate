// ===============================
// Sales Analytics Dashboard
// ===============================


// Period filter
const periodFilter = document.getElementById("periodFilter");

periodFilter.addEventListener("change", function () {

    const period = this.value;

    if (period === "month") {

        updateDashboard(
            "₹12,84,500",
            "2,846",
            "₹4,515",
            "24.8%"
        );

    }

    else if (period === "quarter") {

        updateDashboard(
            "₹38,62,700",
            "8,492",
            "₹4,548",
            "26.1%"
        );

    }

    else if (period === "year") {

        updateDashboard(
            "₹1,48,24,800",
            "34,582",
            "₹4,287",
            "27.4%"
        );

    }

});


// Update KPI values
function updateDashboard(
    revenue,
    sales,
    average,
    conversion
) {

    document.getElementById("revenue").textContent = revenue;

    document.getElementById("sales").textContent = sales;

    document.getElementById("average").textContent = average;

    document.getElementById("conversion").textContent = conversion;

}


// Export report
function exportReport() {

    const report = `
SALES ANALYTICS REPORT
----------------------

Total Revenue: ₹12,84,500
Total Sales: 2,846
Average Order: ₹4,515
Conversion Rate: 24.8%

Top Category:
Electronics

Top Product:
Premium Headphones
`;

    const blob = new Blob(
        [report],
        { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "sales-analytics-report.txt";

    link.click();

    URL.revokeObjectURL(url);

}


// Chart period filter
const chartFilter =
    document.getElementById("chartFilter");

chartFilter.addEventListener("change", function () {

    if (this.value === "Last 12 Months") {

        alert(
            "12-month revenue data selected."
        );

    } else {

        alert(
            "6-month revenue data selected."
        );

    }

});