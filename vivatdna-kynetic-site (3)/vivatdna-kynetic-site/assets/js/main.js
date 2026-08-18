// ==========================================================================
// VivatDNA × Kynetic — site scripts
// ==========================================================================

document.getElementById('year').textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------- scroll reveal ---------------------------- */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* ------------------------- kynetic console typewriter ------------------------- */
// These lines are drawn directly from the "What Kynetic actually sounds like"
// example in the investor materials — the product's real voice, not filler copy.
const instructions = [
  "Skip the morning fast today. Move strength training to 11am. Take your omega-3 before lunch. Your recovery window is narrow. Protect it.",
  "Your HRV dipped after last night's short sleep. Push today's HIIT session to tomorrow — a 20-minute walk instead.",
  "Fasting glucose trending up again. Swap tonight's carbs for the Mediterranean plate your genotype responds best to.",
  "Cortisol elevated on your wearable. 10 minutes of morning sunlight before coffee — not after."
];

const outputEl = document.getElementById('typewriter');

function typeLoop() {
  if (!outputEl) return;

  if (prefersReducedMotion) {
    outputEl.textContent = instructions[0];
    return;
  }

  let lineIndex = 0;

  function typeLine() {
    const text = instructions[lineIndex];
    let charIndex = 0;
    outputEl.innerHTML = '';
    const textNode = document.createElement('span');
    outputEl.appendChild(textNode);
    const cursor = document.createElement('span');
    cursor.className = 'console__cursor';
    outputEl.appendChild(cursor);

    const typeChar = setInterval(() => {
      textNode.textContent = text.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex >= text.length) {
        clearInterval(typeChar);
        setTimeout(eraseLine, 2600);
      }
    }, 22);

    function eraseLine() {
      const eraseChar = setInterval(() => {
        charIndex--;
        textNode.textContent = text.slice(0, charIndex);
        if (charIndex <= 0) {
          clearInterval(eraseChar);
          lineIndex = (lineIndex + 1) % instructions.length;
          setTimeout(typeLine, 350);
        }
      }, 10);
    }
  }

  typeLine();
}

typeLoop();

/* --------------------------------- form --------------------------------- */
// Waitlist signups are stored in a Supabase table, hit directly via its
// auto-generated REST API (PostgREST) — no SDK needed, just fetch().
// Fill these in once the `waitlist` table exists (see README.md section 5).
const SUPABASE_URL = 'https://ojhxijyazqxmtkiebmse.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_egUFfbMhx3q7Y6Qs6PkMWQ_MTXx6LMP';

const form = document.getElementById('waitlist-form');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // If the Supabase project hasn't been configured yet, don't attempt
    // a network request that will fail — just show a friendly reminder.
    if (SUPABASE_URL.includes('YOUR_PROJECT_REF') || SUPABASE_ANON_KEY.includes('YOUR_ANON_PUBLIC_KEY')) {
      alert('Almost there: connect your Supabase project. See README.md for the 5-minute setup.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const payload = {
      name: form.elements['name'].value.trim(),
      email: form.elements['email'].value.trim(),
      interest: new FormData(form).get('interest')
    };

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: 'return=minimal'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        form.reset();
        form.style.display = 'none';
        successMsg.style.display = 'block';
      } else if (res.status === 409) {
        // unique constraint on email — they already signed up
        submitBtn.disabled = false;
        submitBtn.textContent = 'Join the list';
        successMsg.textContent = "Looks like you're already on the list. Thank you.";
        form.style.display = 'none';
        successMsg.style.display = 'block';
      } else {
        throw new Error(`Submission failed (${res.status})`);
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Join the list';
      alert('Something went wrong sending that — please try again in a moment.');
    }
  });
}
