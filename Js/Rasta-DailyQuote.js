const quotes = [
  "موفقیت چیزی نیست جز تکرار عادت‌های ساده‌ای که هر روز انجام می‌دهید.",
  "باور کن که می‌توانی، نیمی از راه را رفته‌ای.",
  "برای رسیدن به چیزی که تا به حال نداشتی، باید کاری را انجام دهی که تا به حال نکرده‌ای.",
  "هر روز یک شروع تازه است. امروز بهترین فرصت توست.",
  "مسیر موفقیت با قدم‌های کوچک اما مستمر ساخته می‌شود.",
  "هیچ چیز غیرممکن نیست، غیرممکن فقط زمان بیشتری نیاز دارد.",
  "اگر زمین خوردی، بلند شو؛ اما این بار خاک را با خودت بردار!",
  "رؤیاهایت را دنبال کن، چون آن‌ها نقشه راه موفقیت تو هستند.",
  "از اشتباهاتت یاد بگیر، ولی هیچ‌وقت به آن‌ها اجازه نده تو را متوقف کنند.",
  "بهترین زمان برای کاشتن یک درخت ۲۰ سال پیش بود، دومین زمان مناسب امروز است.",
];

function getRandomImage() {
  return `https://picsum.photos/800/600?random=${new Date().getDate()}`;
}

function updateDailyContent() {
  const today = new Date();
  const dayIndex = today.getDate() % quotes.length;

  const quoteElement = document.getElementById("daily-quote");
  const imgElement = document.getElementById("daily-img");
  const showImage = localStorage.getItem("showImage") !== "false";

  quoteElement.style.opacity = 0;
  imgElement.style.opacity = 0;
  setTimeout(() => {
    quoteElement.innerText = quotes[dayIndex];
    quoteElement.style.opacity = 1;

    if (showImage) {
      imgElement.src = getRandomImage();
      imgElement.style.display = "block";
      imgElement.style.opacity = 1;
    } else {
      imgElement.style.display = "none";
    }
  }, 500);
}

function toggleImageVisibility() {
  const imgElement = document.getElementById("daily-img");
  const toggleSwitch = document.getElementById("image-toggle");
  const showImage = toggleSwitch.checked;

  localStorage.setItem("showImage", showImage);

  if (showImage) {
    imgElement.src = getRandomImage();
    imgElement.style.display = "block";
  } else {
    imgElement.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("image-toggle");
  toggleSwitch.checked = localStorage.getItem("showImage") !== "false";
  toggleSwitch.addEventListener("change", toggleImageVisibility);
  updateDailyContent();
});
let primaryTextColor, thirdColor, secondryColor;

function updateThemeColors() {
  setTimeout(() => {
    const rootStyles = getComputedStyle(document.documentElement);

    primaryTextColor = rootStyles.getPropertyValue("--primary-text").trim();
    thirdColor = rootStyles.getPropertyValue("--third-color").trim();
    secondryColor = rootStyles.getPropertyValue("--secondry-color").trim();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("selectedTheme") || "theme-light";
  document.body.classList.add(savedTheme);

  updateThemeColors();
});
