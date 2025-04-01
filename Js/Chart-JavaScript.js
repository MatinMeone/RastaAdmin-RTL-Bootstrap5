Chart.defaults.font.family = "Vazir";

function getChartColors() {
  const bodyStyles = getComputedStyle(document.body);
  return {
    primaryText: bodyStyles.getPropertyValue("--chart-text").trim(),
    dailyColor: bodyStyles.getPropertyValue("--Daily").trim(),
    weeklyColor: bodyStyles.getPropertyValue("--Weekly").trim(),
    monthlyColor: bodyStyles.getPropertyValue("--Monthly").trim(),
    activeUserColor: bodyStyles.getPropertyValue("--active-user").trim(),
    deActiveUserColor: bodyStyles.getPropertyValue("--none-active").trim(),
  };
}

function createUserActivityChart(ctx) {
  const colors = getChartColors();
  return new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["کاربران فعال", "کاربران غیرفعال"],
      datasets: [
        {
          data: [65, 35],
          backgroundColor: [colors.activeUserColor, colors.deActiveUserColor],
          hoverOffset: 8,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: colors.primaryText,
            font: { size: 14, family: "Vazir" },
          },
        },
      },
    },
  });
}

function createVisitsChart(ctx) {
  const colors = getChartColors();
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["روزانه", "هفتگی", "ماهانه"],
      datasets: [
        {
          label: "تعداد بازدید",
          data: [1704, 4552, 6000],
          backgroundColor: [
            colors.dailyColor,
            colors.weeklyColor,
            colors.monthlyColor,
          ],
          borderRadius: 12,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: colors.primaryText,
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        x: {
          ticks: {
            color: colors.primaryText,
          },
          grid: {
            display: false,
          },
        },
      },
    },
  });
}

function changeTheme(theme) {
  document.body.classList.remove("theme-light", "theme-dark");
  document.body.classList.add(theme);

  const colors = getChartColors();

  userActivityChart.data.datasets[0].backgroundColor = [
    colors.activeUserColor,
    colors.deActiveUserColor,
  ];
  visitsChart.data.datasets[0].backgroundColor = [
    colors.dailyColor,
    colors.weeklyColor,
    colors.monthlyColor,
  ];

  userActivityChart.options.plugins.legend.labels.color = colors.primaryText;
  visitsChart.options.scales.y.ticks.color = colors.primaryText;
  visitsChart.options.scales.x.ticks.color = colors.primaryText;

  // بلافاصله تغییرات اعمال می‌شوند
  userActivityChart.update();
  visitsChart.update();
}

// اضافه کردن رویداد کلیک به همه دکمه‌های تغییر تم
document.querySelectorAll(".btnVTheme").forEach((button) => {
  button.addEventListener("click", function () {
    const newTheme = this.getAttribute("data-theme");
    changeTheme(newTheme);
  });
});

// ایجاد چارت کاربری
const ctx = document.getElementById("userActivityChart").getContext("2d");
let userActivityChart = createUserActivityChart(ctx);

// ایجاد چارت بازدیدها
const ctx_2 = document.getElementById("visitsChart").getContext("2d");
let visitsChart = createVisitsChart(ctx_2);

const observer = new MutationObserver(() => {
  setTimeout(() => {
    userActivityChart.destroy();
    visitsChart.destroy();

    userActivityChart = createUserActivityChart(ctx);
    visitsChart = createVisitsChart(ctx_2);
  }, 50);
});

observer.observe(document.body, {
  attributes: true,
  attributeFilter: ["class"],
});
