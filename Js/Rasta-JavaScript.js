function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  document.getElementById(
    "time"
  ).textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

document.getElementById("SearchAc").addEventListener("click", function () {
  document.getElementById("SearchBox").classList.toggle("SearchEx");
});

document.addEventListener("DOMContentLoaded", function () {
  const themeButtons = document.querySelectorAll("[data-theme]");
  const bgButtons = document.querySelectorAll("[data-bg]");
  const boxShadowButtons = document.querySelectorAll("[data-shadow]");
  const RenderBody = document.getElementById("RenderBody");

  const shadowClasses = [
    "shadow-black",
    "shadow-white",
    "shadow-blue",
    "shadow-red",
    "shadow-green",
    "shadow-orange",
    "shadow-purple",
    "shadow-gold",
    "shadow-cyan",
    "shadow-magenta",
  ];

  const bgClasses = [
    "bg-green",
    "bg-black",
    "bg-blacksolid",
    "bg-blackred",
    "bg-blackyellow",
    "bg-pink",
    "bg-blueSolid",
    "bg-pinksolid",
    "bg-whitesolid",
    "bg-bluepurple",
    "bg-blue",
    "bg-bluesolid",
    "bg-gold",
    "bg-gray",
    "bg-blood",
    "bg-water",
    "bg-texture-0",
    "bg-texture-1",
    "bg-texture-2",
    "bg-texture-3",
    "bg-texture-4",
    "bg-texture-5",
  ];

  // تعیین پیش‌فرض‌ها
  const defaultTheme = "theme-light";
  const defaultBg = "bg-black";
  const defaultShadow = "black";

  const savedTheme = localStorage.getItem("selectedTheme") || defaultTheme;
  const savedBg = localStorage.getItem("selectedBg") || defaultBg;
  const savedShadow = localStorage.getItem("selectedShadow") || defaultShadow;

  if (savedTheme) document.body.classList.add(savedTheme);
  if (savedBg && bgClasses.includes(savedBg)) {
    document.body.classList.add(savedBg);
  }

  if (savedShadow) {
    const shadowClass = `shadow-${savedShadow.toLowerCase()}`;
    if (shadowClasses.includes(shadowClass)) {
      RenderBody.classList.remove(...shadowClasses);
      RenderBody.classList.add(shadowClass);
    }
  }

  // تنظیم دکمه‌های سایه
  boxShadowButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedShadow = `shadow-${this.dataset.shadow.toLowerCase()}`;
      if (shadowClasses.includes(selectedShadow)) {
        RenderBody.classList.remove(...shadowClasses);
        RenderBody.classList.add(selectedShadow);
        localStorage.setItem(
          "selectedShadow",
          this.dataset.shadow.toLowerCase()
        );
      }
    });
  });

  // تنظیم دکمه‌های تم
  themeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      document.body.classList.remove(
        "theme-dark",
        "theme-light",
        "theme-pink",
        "theme-blue",
        "theme-green",
        "theme-glass",
        "theme-glass2",
        "theme-red",
        "theme-gold",
        "theme-purple-night"
      );
      document.body.classList.add(this.dataset.theme);
      localStorage.setItem("selectedTheme", this.dataset.theme);
    });
  });

  // تنظیم دکمه‌های پس‌زمینه
  bgButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const newBg = this.dataset.bg;
      if (!newBg || !bgClasses.includes(newBg)) {
        console.warn(`کلاس "${newBg}" در لیست مجاز نیست!`);
        return;
      }
      document.body.classList.remove(...bgClasses);
      document.body.classList.add(newBg);
      localStorage.setItem("selectedBg", newBg);
    });
  });
});

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

  document.querySelectorAll("[data-theme]").forEach((button) => {
    button.addEventListener("click", function () {
      document.body.classList.remove(
        "theme-dark",
        "theme-light",
        "theme-pink",
        "theme-blue",
        "theme-green",
        "theme-glass",
        "theme-glass2",
        "theme-red",
        "theme-gold",
        "theme-purple-night"
      );
      document.body.classList.add(this.dataset.theme);
      localStorage.setItem("selectedTheme", this.dataset.theme);

      updateThemeColors();
    });
  });
});
