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
  document.body.classList.remove("loading");

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

  const themeClasses = [
    "theme-dark",
    "theme-light",
    "theme-pink",
    "theme-blue",
    "theme-green",
    "theme-glass",
    "theme-glass2",
    "theme-red",
    "theme-gold",
    "theme-purple-night",
  ];

  const defaultTheme = "theme-light";
  const defaultBg = "bg-black";
  const defaultShadow = "black";

  let savedTheme = localStorage.getItem("selectedTheme") || defaultTheme;
  let savedBg = localStorage.getItem("selectedBg") || defaultBg;
  const savedShadow = localStorage.getItem("selectedShadow") || defaultShadow;

  document.body.classList.add(savedTheme, savedBg);

  const RenderBody = document.getElementById("RenderBody");
  const shadowClass = `shadow-${savedShadow.toLowerCase()}`;
  if (shadowClasses.includes(shadowClass)) {
    RenderBody.classList.add(shadowClass);
  }

  const applyTheme = (theme) => {
    document.body.classList.remove(...themeClasses);
    document.body.classList.add(theme);
    savedTheme = theme;
    localStorage.setItem("selectedTheme", theme);
    console.log("تم اعمال شد:", theme);
  };

  const applyBackground = (bg) => {
    if (!bgClasses.includes(bg)) {
      console.warn(`پس‌زمینه نامعتبر: ${bg}`);
      return;
    }
    document.body.classList.remove(...bgClasses);
    document.body.classList.add(bg);
    localStorage.setItem("selectedBg", bg);
    console.log("پس‌زمینه اعمال شد:", bg);

    if (savedTheme === "theme-light") {
      applyTheme("theme-light");
    }
  };

  document.querySelectorAll("[data-theme]").forEach((button) => {
    button.addEventListener("click", () => applyTheme(button.dataset.theme));
  });

  document.querySelectorAll("[data-bg]").forEach((button) => {
    button.addEventListener("click", () => applyBackground(button.dataset.bg));
  });

  document.querySelectorAll("[data-shadow]").forEach((button) => {
    button.addEventListener("click", function () {
      const shadow = `shadow-${this.dataset.shadow.toLowerCase()}`;
      if (shadowClasses.includes(shadow)) {
        RenderBody.classList.remove(...shadowClasses);
        RenderBody.classList.add(shadow);
        localStorage.setItem(
          "selectedShadow",
          this.dataset.shadow.toLowerCase()
        );
      }
    });
  });

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        console.log("کلاس‌های فعلی body:", document.body.className);
      }
    });
  });
  observer.observe(document.body, { attributes: true });
});
