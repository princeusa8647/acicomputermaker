// ==== Typewriter Heading ====
const typewriterText = "WELCOME TO ACI COMPUTER INSTITUTE MAKER";
let index = 0;
const speed = 70;

function typeWriter() {
  if (index < typewriterText.length) {
    document.getElementById("typewriter").innerHTML += typewriterText.charAt(index);
    index++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter();

// ==== Toggle Course Details ====
function toggleDetails(id) {
  const element = document.getElementById(id);
  element.classList.toggle("active");
}

// ==== Form Validation + Confetti ====
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const course = document.getElementById("course").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const popup = document.getElementById("thankyou-popup");
  const alreadyPopup = document.getElementById("already-submitted-popup");
  const mobilePattern = /^[6-9]\d{9}$/;

  if (!name || !course || !mobilePattern.test(mobile)) {
    alert("❌ Invalid Details:\nPlease enter correct name, course, and a valid 10-digit mobile number.");
    if (popup) popup.classList.add("hidden");
    return false;
  }

  if (localStorage.getItem(`submitted_${mobile}`)) {
    if (alreadyPopup) alreadyPopup.classList.remove("hidden");
    return false;
  }

  localStorage.setItem(`submitted_${mobile}`, true);

  if (popup) {
    popup.classList.remove("hidden");
    launchConfetti();
  }

  return true;
}

// ==== Close Popup ====
function closePopup() {
  document.getElementById("thankyou-popup").classList.add("hidden");
  document.getElementById("already-submitted-popup").classList.add("hidden");
}

// ==== Toggle FAQ Answers ====
function toggleFaq(element) {
  const answer = element.nextElementSibling;
  answer.style.display = answer.style.display === "block" ? "none" : "block";
}

// ==== Scroll to Top on Refresh ====
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// ==== Confetti Function ====
function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// ==== Counter Animation ====
const counters = document.querySelectorAll(".counter");

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.disconnect();
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => {
  observer.observe(counter);
});


function showOfferPopup() {
  const popup = document.getElementById("offer-popup");
  const message = document.getElementById("offer-message");

  const offerActive = false;
  const promoText = `
    🎉 20% OFF on ADCA Course!<br>
    🎓 Only for new students this month.<br><br>
    🧾 <strong>Visit the centre and say Promo Code:</strong> "<em>Prince18</em>" to claim 🎉 500 OFF on Every Course.<br><br>
    ⚠️ You can only claim <u>either this offer OR a course discount</u>, not both.
  `;

  const noOfferText = `
    ❌ No active offers right now.<br><br>
    📢 Stay tuned on Our Website for upcoming surprises!
  `;

  message.innerHTML = offerActive ? promoText : noOfferText;
  popup.classList.remove("hidden");
}

function closeOfferPopup() {
  document.getElementById("offer-popup").classList.add("hidden");
}
