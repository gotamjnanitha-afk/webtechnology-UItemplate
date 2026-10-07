// ======================================
// Marketing Analytics Dashboard
// ======================================


// Period filter
const periodFilter =
    document.getElementById("periodFilter");


periodFilter.addEventListener(
    "change",
    function () {

        const period = this.value;


        if (period === "month") {

            updateKPIs(
                "24",
                "₹4,25,000",
                "3,842",
                "28.4%"
            );

        }


        else if (period === "quarter") {

            updateKPIs(
                "68",
                "₹12,85,000",
                "11,640",
                "31.6%"
            );

        }


        else if (period === "year") {

            updateKPIs(
                "284",
                "₹48,52,000",
                "48,920",
                "34.8%"
            );

        }

    }
);


// Update KPI values
function updateKPIs(
    campaigns,
    spend,
    conversions,
    roi
) {

    document.getElementById(
        "campaigns"
    ).textContent = campaigns;


    document.getElementById(
        "spend"
    ).textContent = spend;


    document.getElementById(
        "conversions"
    ).textContent = conversions;


    document.getElementById(
        "roi"
    ).textContent = roi;

}


// Export report
function exportReport() {

    const report = `
MARKETING ANALYTICS REPORT
--------------------------

Total Campaigns: 24
Ad Spend: ₹4,25,000
Conversions: 3,842
Marketing ROI: 28.4%

TRAFFIC SOURCES
---------------
Social Media: 36%
Search: 28%
Direct: 21%
Referral: 15%

TOP CAMPAIGNS
-------------
Summer Sale
Search Boost
Welcome Series
Brand Awareness

CONVERSION FUNNEL
-----------------
Impressions: 1,250,000
Clicks: 184,500
Leads: 42,680
Conversions: 3,842
`;


    const blob = new Blob(
        [report],
        {
            type: "text/plain"
        }
    );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;


    link.download =
        "marketing-analytics-report.txt";


    link.click();


    URL.revokeObjectURL(url);

}


// Campaign filter
const campaignFilter =
    document.getElementById(
        "campaignFilter"
    );


campaignFilter.addEventListener(
    "change",
    function () {

        alert(
            this.value +
            " campaign data selected."
        );

    }
);


// View all campaigns
function showCampaigns() {

    alert(
        "Showing all available marketing campaigns."
    );

}