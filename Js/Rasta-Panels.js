document.addEventListener("DOMContentLoaded", function () {
  const headerElement = document.getElementById("customHeader");
  const hideHeaderBtn = document.getElementById("customHideHeaderBtn");
  const showHeaderBtn = document.getElementById("customShowHeaderBtn");

  function initializeHeader() {
    headerElement.classList.add("no-transition");

    const headerStatus = localStorage.getItem("headerStatus");
    if (headerStatus === "hidden") {
      headerElement.classList.add("headerHidden");
      showHeaderBtn.style.display = "block";
    } else {
      headerElement.classList.remove("headerHidden");
      showHeaderBtn.style.display = "none";
    }

    requestAnimationFrame(() => {
      setTimeout(() => {
        headerElement.classList.remove("no-transition");
      }, 50);
    });
  }

  function updateShowButton() {
    if (headerElement.classList.contains("headerHidden")) {
      showHeaderBtn.style.display = "block";
    } else {
      showHeaderBtn.style.display = "none";
    }
  }

  hideHeaderBtn.addEventListener("click", function () {
    headerElement.classList.add("headerHidden");
    localStorage.setItem("headerStatus", "hidden");
    updateShowButton();
  });

  showHeaderBtn.addEventListener("click", function () {
    headerElement.classList.remove("headerHidden");
    localStorage.setItem("headerStatus", "visible");
    updateShowButton();
  });

  initializeHeader();

  const rightPanel = document.getElementById("rightPanel");
  const hideRightPanelBtn = document.getElementById("hideRightPanelBtn");
  const showRightPanelBtn = document.getElementById("showRightPanelBtn");

  function disableTransition() {
    rightPanel.classList.add("no-transition");
    setTimeout(() => {
      rightPanel.classList.remove("no-transition");
    }, 100);
  }

  function checkPanelStatus() {
    const rightPanelStatus = localStorage.getItem("rightPanelStatus");

    if (rightPanelStatus === "hidden") {
      rightPanel.classList.remove("show");
      showRightPanelBtn.style.display = "block";
    } else {
      rightPanel.classList.add("show");
      showRightPanelBtn.style.display = "none";
    }
  }

  function checkScreenWidth() {
    const isMobile = window.innerWidth < 1024;
    const wasMobile = localStorage.getItem("wasMobile") === "true";

    if (isMobile && !wasMobile) {
      rightPanel.classList.remove("show");
      showRightPanelBtn.style.display = "block";
      localStorage.setItem("rightPanelStatus", "hidden");
    }

    localStorage.setItem("wasMobile", isMobile);
  }

  hideRightPanelBtn.addEventListener("click", function () {
    rightPanel.classList.remove("show");
    localStorage.setItem("rightPanelStatus", "hidden");
    showRightPanelBtn.style.display = "block";
  });

  showRightPanelBtn.addEventListener("click", function () {
    rightPanel.classList.add("show");
    localStorage.setItem("rightPanelStatus", "visible");
    showRightPanelBtn.style.display = "none";
  });

  window.addEventListener("load", function () {
    disableTransition();
    checkPanelStatus();
    checkScreenWidth();
  });

  window.addEventListener("resize", function () {
    checkScreenWidth();
  });

  // مدیریت انتخاب تم‌ها (بدون تغییر)
  const themeButtons = document.querySelectorAll(".btnVTheme[data-theme]");
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      themeButtons.forEach((b) => b.classList.remove("selected"));

      button.classList.add("selected");

      localStorage.setItem("selectedTheme", button.getAttribute("data-theme"));
    });
  });

  const selectedTheme = localStorage.getItem("selectedTheme");
  if (selectedTheme) {
    const selectedButton = document.querySelector(
      `button[data-theme="${selectedTheme}"]`
    );
    if (selectedButton) {
      selectedButton.classList.add("selected");
    }
  }

  // مدیریت انتخاب پس‌زمینه‌ها (بدون تغییر)
  const bgButtons = document.querySelectorAll(".btnVTheme[data-bg]");
  bgButtons.forEach((button) => {
    button.addEventListener("click", () => {
      bgButtons.forEach((b) => b.classList.remove("selected"));

      button.classList.add("selected");

      localStorage.setItem(
        "selectedBackground",
        button.getAttribute("data-bg")
      );
    });
  });

  const selectedBackground = localStorage.getItem("selectedBackground");
  if (selectedBackground) {
    const selectedBgButton = document.querySelector(
      `button[data-bg="${selectedBackground}"]`
    );
    if (selectedBgButton) {
      selectedBgButton.classList.add("selected");
    }
  }

  const shadowButtons = document.querySelectorAll(".btnShadow[data-shadow]");
  shadowButtons.forEach((button) => {
    button.addEventListener("click", () => {
      shadowButtons.forEach((b) => b.classList.remove("selected"));

      button.classList.add("selected");

      localStorage.setItem(
        "selectedShadow",
        button.getAttribute("data-shadow")
      );
    });
  });

  const selectedShadow = localStorage.getItem("selectedShadow");
  if (selectedShadow) {
    const selectedShadowButton = document.querySelector(
      `button[data-shadow="${selectedShadow}"]`
    );
    if (selectedShadowButton) {
      selectedShadowButton.classList.add("selected");
    }
  }

  const panel = document.querySelector(".theme-settings-panel");
  const button = document.getElementById("toggleThemePanelBtn");
  const icon = button.querySelector("i");

  let isOpen = localStorage.getItem("themePanelOpen") === "true";

  panel.style.transition = "none";

  if (isOpen) {
    panel.classList.add("open");
    icon.classList.add("rotate");
  }

  setTimeout(() => {
    panel.style.transition = "top 0.3s ease-in-out";
  }, 50);

  button.addEventListener("click", function () {
    panel.classList.toggle("open");
    icon.classList.toggle("rotate");

    localStorage.setItem("themePanelOpen", panel.classList.contains("open"));
  });

  window.addEventListener("beforeunload", function () {
    headerElement.classList.add("no-transition");
    rightPanel.classList.add("no-transition");
  });
});

const rightPanel = document.getElementById("rightPanel");
const hideRightPanelBtn = document.getElementById("hideRightPanelBtn");
const showRightPanelBtn = document.getElementById("showRightPanelBtn");

function initializeRightPanel() {
  rightPanel.classList.add("initial-load");

  const rightPanelStatus = localStorage.getItem("rightPanelStatus");
  const isMobile = window.innerWidth < 1024;

  if (isMobile || rightPanelStatus === "hidden") {
    rightPanel.classList.remove("show");
    showRightPanelBtn.style.display = "block";
  } else {
    rightPanel.classList.add("show");
    showRightPanelBtn.style.display = "none";
  }

  // حذف کلاس initial-load بعد از رندر اولیه
  requestAnimationFrame(() => {
    setTimeout(() => {
      rightPanel.classList.remove("initial-load");
    }, 50);
  });
}

function checkScreenWidth() {
  const isMobile = window.innerWidth < 1024;
  const wasMobile = localStorage.getItem("wasMobile") === "true";

  if (isMobile && !wasMobile) {
    rightPanel.classList.remove("show");
    showRightPanelBtn.style.display = "block";
    localStorage.setItem("rightPanelStatus", "hidden");
  } else if (!isMobile && wasMobile) {
    const rightPanelStatus = localStorage.getItem("rightPanelStatus");
    if (rightPanelStatus !== "hidden") {
      rightPanel.classList.add("show");
      showRightPanelBtn.style.display = "none";
    }
  }

  localStorage.setItem("wasMobile", isMobile);
}

hideRightPanelBtn.addEventListener("click", function () {
  rightPanel.classList.remove("show");
  localStorage.setItem("rightPanelStatus", "hidden");
  showRightPanelBtn.style.display = "block";
});

showRightPanelBtn.addEventListener("click", function () {
  rightPanel.classList.add("show");
  localStorage.setItem("rightPanelStatus", "visible");
  showRightPanelBtn.style.display = "none";
});

initializeRightPanel();

window.addEventListener("resize", function () {
  checkScreenWidth();
});

window.addEventListener("beforeunload", function () {
  rightPanel.classList.add("initial-load");
});

window.addEventListener("load", function () {
  let renderBody = document.getElementById("RenderBody");
  if (renderBody) {
    renderBody.style.width = "100%"; // یا مقدار دلخواه
  }
});
