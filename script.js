/* =====================================
   PORTFOLIO JAVASCRIPT
===================================== */


/* =====================================
   LOADING SCREEN
===================================== */

window.addEventListener("load", function () {

    setTimeout(function () {

        const loader = document.getElementById("loader");

        if (loader) {
            loader.classList.add("hide");
        }

    }, 700);

});


/* =====================================
   MOBILE MENU
===================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("show");

        if (navMenu.classList.contains("show")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });

}


/* Close mobile menu after clicking link */

document.querySelectorAll(".nav-link").forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("show");

        if (menuToggle) {
            menuToggle.textContent = "☰";
        }

    });

});


/* =====================================
   TYPING EFFECT
===================================== */

const typingText = document.getElementById("typingText");

const typingWords = [
    "Student",
    "Informatics Enthusiast",
    "Web Developer",
    "Creative Learner"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    if (!typingText) return;

    const currentWord = typingWords[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1400);
            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= typingWords.length) {
                wordIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 55 : 90
    );

}

typeEffect();


/* =====================================
   PROFILE PHOTO
===================================== */

const photoInput = document.getElementById("photoInput");
const profileImage = document.getElementById("profileImage");

if (photoInput) {

    photoInput.addEventListener("change", function (event) {

        const file = event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {

            showToast("File harus berupa gambar.");

            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {

            profileImage.src = e.target.result;

            /*
             * Menyimpan foto sementara di browser.
             * Foto tetap tersedia setelah reload
             * pada browser yang sama.
             */

            try {

                localStorage.setItem(
                    "portfolioProfilePhoto",
                    e.target.result
                );

            } catch (error) {

                console.log(
                    "Foto terlalu besar untuk localStorage."
                );

            }

            showToast("Foto profil berhasil diganti.");

        };

        reader.readAsDataURL(file);

    });

}


/* Load saved photo */

const savedPhoto =
    localStorage.getItem("portfolioProfilePhoto");

if (savedPhoto && profileImage) {
    profileImage.src = savedPhoto;
}


/* =====================================
   DARK / LIGHT MODE
===================================== */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("portfolioTheme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    if (themeToggle) {
        themeToggle.textContent = "🌙";
    }

}


if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light");

        const isLight =
            document.body.classList.contains("light");

        localStorage.setItem(
            "portfolioTheme",
            isLight ? "light" : "dark"
        );

        themeToggle.textContent =
            isLight ? "🌙" : "☀️";

    });

}


/* =====================================
   BACKGROUND MUSIC
===================================== */

const music =
    document.getElementById("backgroundMusic");

const musicToggle =
    document.getElementById("musicToggle");

let musicPlaying = false;


/*
 * Browser Android biasanya tidak mengizinkan
 * autoplay audio sebelum user melakukan interaksi.
 */

if (musicToggle && music) {

    musicToggle.addEventListener("click", function () {

        if (!musicPlaying) {

            music.play()
                .then(function () {

                    musicPlaying = true;
                    musicToggle.textContent = "🔊";

                    showToast("Musik dinyalakan.");

                })
                .catch(function () {

                    showToast(
                        "Tambahkan file music.mp3 ke folder website."
                    );

                });

        } else {

            music.pause();

            musicPlaying = false;

            musicToggle.textContent = "🔇";

            showToast("Musik dimatikan.");

        }

    });

}


/* =====================================
   SCROLL REVEAL
===================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =====================================
   ACTIVE NAVIGATION
===================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {

    let current = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* =====================================
   BACK TO TOP
===================================== */

const backTop =
    document.getElementById("backTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


if (backTop) {

    backTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =====================================
   COUNTER ANIMATION
===================================== */

const counters =
    document.querySelectorAll("[data-count]");

let countersStarted = false;

function startCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(function (counter) {

        const target =
            Number(counter.dataset.count);

        let current = 0;

        const increment =
            Math.max(1, Math.ceil(target / 40));

        const timer =
            setInterval(function () {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                counter.textContent = current + "+";

            }, 35);

    });

}


const statsContainer =
    document.querySelector(".stats-container");

if (statsContainer) {

    const statsObserver =
        new IntersectionObserver(function (entries) {

            if (entries[0].isIntersecting) {

                startCounters();

                statsObserver.disconnect();

            }

        });

    statsObserver.observe(statsContainer);

}


/* =====================================
   PROJECT FILTER
===================================== */

const filterButtons =
    document.querySelectorAll(".filter");

const projectCards =
    document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        projectCards.forEach(function (card) {

            const category =
                card.dataset.category;

            if (
                filter === "all" ||
                category === filter
            ) {

                card.style.display = "";

                setTimeout(function () {
                    card.style.opacity = "1";
                }, 10);

            } else {

                card.style.opacity = "0";

                setTimeout(function () {
                    card.style.display = "none";
                }, 200);

            }

        });

    });

});


/* =====================================
   PROJECT MODAL
===================================== */

const projectModal =
    document.getElementById("projectModal");

const closeModal =
    document.getElementById("closeModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalTech =
    document.getElementById("modalTech");


document.querySelectorAll(".project-detail")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            modalTitle.textContent =
                button.dataset.title;

            modalDescription.textContent =
                button.dataset.description;

            modalTech.textContent =
                button.dataset.tech;

            projectModal.classList.add("show");

            document.body.style.overflow = "hidden";

        });

    });


if (closeModal) {

    closeModal.addEventListener("click", closeProjectModal);

}


function closeProjectModal() {

    projectModal.classList.remove("show");

    document.body.style.overflow = "";

}


projectModal.addEventListener("click", function (event) {

    if (event.target === projectModal) {
        closeProjectModal();
    }

});


/* =====================================
   CERTIFICATE IMAGE MODAL
===================================== */

const imageModal =
    document.getElementById("imageModal");

const modalImage =
    document.getElementById("modalImage");

const closeImageModal =
    document.getElementById("closeImageModal");

document.querySelectorAll(".certificate-card img")
    .forEach(function (image) {

        image.addEventListener("click", function () {

            modalImage.src = image.src;

            imageModal.classList.add("show");

            document.body.style.overflow = "hidden";

        });

    });


if (closeImageModal) {

    closeImageModal.addEventListener(
        "click",
        function () {

            imageModal.classList.remove("show");

            document.body.style.overflow = "";

        }
    );

}


imageModal.addEventListener("click", function (event) {

    if (event.target === imageModal) {

        imageModal.classList.remove("show");

        document.body.style.overflow = "";

    }

});


/* =====================================
   CONTACT FORM
===================================== */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("contactName").value.trim();

        const email =
            document.getElementById("contactEmail").value.trim();

        const message =
            document.getElementById("contactMessage").value.trim();


        if (!name || !email || !message) {

            showToast("Lengkapi semua data.");

            return;

        }


        /*
         * Ganti email berikut dengan email kamu.
         */

        const destination =
            "yourname@email.com";


        const subject =
            encodeURIComponent(
                "Pesan dari Portfolio - " + name
            );

        const body =
            encodeURIComponent(
                "Nama: " + name +
                "\nEmail: " + email +
                "\n\nPesan:\n" + message
            );


        window.location.href =
            "mailto:" +
            destination +
            "?subject=" +
            subject +
            "&body=" +
            body;


        showToast("Membuka aplikasi email...");

        contactForm.reset();

    });

}


/* =====================================
   DOWNLOAD CV
===================================== */

const downloadCV =
    document.getElementById("downloadCV");

if (downloadCV) {

    downloadCV.addEventListener("click", function () {

        /*
         * Karena website berjalan offline,
         * tombol ini membuka halaman CV
         * yang bisa disimpan sebagai PDF
         * melalui menu Print browser.
         */

        const cvWindow =
            window.open("", "_blank");

        if (!cvWindow) {

            showToast(
                "Izinkan popup untuk membuka CV."
            );

            return;

        }


        cvWindow.document.write(`

            <!DOCTYPE html>

            <html>

            <head>

                <title>CV - YOUR NAME</title>

                <style>

                    body {
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 40px auto;
                        padding: 20px;
                        color: #111;
                        line-height: 1.6;
                    }

                    h1 {
                        margin-bottom: 5px;
                    }

                    h2 {
                        margin-top: 30px;
                        border-bottom: 2px solid #111;
                        padding-bottom: 5px;
                    }

                    .muted {
                        color: #666;
                    }

                    .skills {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                    }

                    .skill {
                        background: #eee;
                        padding: 6px 10px;
                        border-radius: 6px;
                    }

                    @media print {
                        body {
                            margin: 20px;
                        }
                    }

                </style>

            </head>

            <body>

                <h1>YOUR NAME</h1>

                <p class="muted">
                    Student • Informatics • Web Developer
                </p>

                <p>
                    Email: yourname@email.com<br>
                    WhatsApp: +62 812-XXXX-XXXX<br>
                    Location: Indonesia
                </p>


                <h2>ABOUT ME</h2>

                <p>
                    Pelajar yang memiliki minat pada Informatika,
                    teknologi, web development, desain, dan
                    pengembangan proyek digital.
                </p>


                <h2>SKILLS</h2>

                <div class="skills">

                    <span class="skill">HTML</span>
                    <span class="skill">CSS</span>
                    <span class="skill">JavaScript</span>
                    <span class="skill">UI/UX</span>
                    <span class="skill">Microsoft Office</span>
                    <span class="skill">Video Editing</span>

                </div>


                <h2>PROJECTS</h2>

                <ul>

                    <li>Personal Portfolio Website</li>
                    <li>Memory Challenge Game</li>
                    <li>Online Store Website</li>
                    <li>Digital Poster Design</li>

                </ul>


                <h2>EDUCATION</h2>

                <p>
                    Student — Informatics & Technology
                </p>


                <h2>EXPERIENCE</h2>

                <p>
                    Personal Web Development Projects
                </p>

                <script>

                    window.onload = function() {
                        window.print();
                    };

                <\/script>

            </body>

            </html>

        `);

        cvWindow.document.close();

    });

}


/* =====================================
   TOAST
===================================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    const text =
        toast.querySelector("p");

    text.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}


/* =====================================
   YEAR
===================================== */

const year =
    document.getElementById("year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =====================================
   KEYBOARD ESCAPE
===================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        if (projectModal.classList.contains("show")) {
            closeProjectModal();
        }

        if (imageModal.classList.contains("show")) {

            imageModal.classList.remove("show");

            document.body.style.overflow = "";

        }

    }

});