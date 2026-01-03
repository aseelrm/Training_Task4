const _mobileBtn = document.getElementById("mobileMenuBtn");
const _navMenu = document.getElementById("navMenu");

function _toggleMobile() {
  _mobileBtn.classList.toggle("active");
  _navMenu.classList.toggle("active");
}

if (_mobileBtn) _mobileBtn.addEventListener("click", _toggleMobile);

const _navLinkNodes = document.querySelectorAll(".nav-link");
_navLinkNodes.forEach((lnk) => {
  lnk.addEventListener("click", () => {
    _mobileBtn.classList.remove("active");
    _navMenu.classList.remove("active");
  });
});

function _smoothScrollTo(targetEl, offset = 80) {
  const rectTop = targetEl.getBoundingClientRect().top;
  const top = rectTop + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (ev) {
    ev.preventDefault();
    const sel = this.getAttribute("href");
    const target = document.querySelector(sel);
    if (target) _smoothScrollTo(target, 80);
  });
});

const obsOpts = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, obsOpts);

document.querySelectorAll(".course-card, .access-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  io.observe(card);
});

window.addEventListener("scroll", () => {
  let current = "";
  const secs = document.querySelectorAll("section[id]");
  secs.forEach((s) => {
    const top = s.offsetTop;
    const h = s.clientHeight;
    if (window.pageYOffset >= top - 100) current = s.getAttribute("id");
  });

  _navLinkNodes.forEach((lnk) => {
    lnk.classList.remove("active");
    if (lnk.getAttribute("href") === `#${current}`) lnk.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", (ev) => {
      ev.preventDefault();

      const fullName = document.getElementById("fullName").value;
      const emailAddress = document.getElementById("emailAddress").value;
      const message = document.getElementById("message").value;

      if (fullName && emailAddress && message) {
        contactForm.style.display = "none";
        if (successMessage) successMessage.classList.remove("hidden");

        console.log("Form submitted:", { fullName, emailAddress, message });

        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = "flex";
          if (successMessage) successMessage.classList.add("hidden");
        }, 3000);
      }
    });
  }

  const navAnchors = document.querySelectorAll(".nav a, .footer-column a");
  navAnchors.forEach((a) => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href") || "";
      if (href.startsWith("#")) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const courseItems = document.querySelectorAll(".course-item");
  courseItems.forEach((it, idx) => {
    it.style.opacity = "0";
    it.style.transform = "translateY(20px)";
    setTimeout(() => {
      it.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      it.style.opacity = "1";
      it.style.transform = "translateY(0)";
    }, idx * 100);
  });

  const progressFill = document.querySelector(".progress-fill");
  if (progressFill) {
    const targetWidth = progressFill.style.width || "";
    progressFill.style.width = "0%";
    setTimeout(() => {
      progressFill.style.width = targetWidth;
    }, 500);
  }
});

function toggleMobileMenu() {
  const nav = document.querySelector(".nav");
  if (nav) nav.classList.toggle("active");
}

document.addEventListener("click", (e) => {
  const t = e.target;
  if (t.classList && t.classList.contains("continue-btn")) {
    console.log("Continue button clicked for course");
  }
  if (t.classList && t.classList.contains("review-btn")) {
    console.log("Review button clicked for course");
  }
  if (t.classList && t.classList.contains("view-course-btn")) {
    console.log("View Recommended Course button clicked");
  }
});
