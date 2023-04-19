// Données à afficher
var data = {
    labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"],
    datasets: [
        {
            label: "Ventes",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [12, 19, 3, 5, 2, 3],
        },
    ],
};

// Options du graphique
var options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

// Création du graphique
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: options,
});