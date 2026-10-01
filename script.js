/* =====================================
   PORTFOLIO JAVASCRIPT
===================================== */


/* =====================================
   LOADING SCREEN
===================================== */

(function () {

    const hideLoader = function () {

        const loader =
            document.getElementById("loader");

        if (!loader) return;

        loader.classList.add("hide");

        setTimeout(function () {
            loader.style.display = "none";
        }, 600);

    };


    /*
     * Jangan menunggu semua gambar/audio selesai.
     * Loader akan hilang setelah DOM siap.
     */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                setTimeout(
                    hideLoader,
                    300
                );

            },
            { once: true }
        );

    } else {

        setTimeout(
            hideLoader,
            300
        );

    }


    /*
     * Pengaman.
     * Kalau ada asset yang macet,
     * loader tetap akan hilang maksimal 3 detik.
     */

    setTimeout(
        hideLoader,
        3000
    );

})();


/* =====================================
   MOBILE MENU
===================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        function () {

            if (!navMenu) return;

            navMenu.classList.toggle("show");

            if (
                navMenu.classList.contains("show")
            ) {

                menuToggle.textContent = "✕";

            } else {

                menuToggle.textContent = "☰";

            }

        }
    );

}


/* Close mobile menu after clicking link */

document
    .querySelectorAll(".nav-link")
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (!navMenu) return;

                navMenu.classList.remove("show");

                if (menuToggle) {

                    menuToggle.textContent =
                        "☰";

                }

            }
        );

    });


/* =====================================
   TYPING EFFECT
===================================== */

const typingText =
    document.getElementById("typingText");

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

    const currentWord =
        typingWords[wordIndex];


    if (!deleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (
            charIndex ===
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1400
            );

            return;

        }

    } else {

        typingText.textContent =
            currentWord.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            wordIndex++;


            if (
                wordIndex >=
                typingWords.length
            ) {

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

const photoInput =
    document.getElementById("photoInput");

const profileImage =
    document.getElementById("profileImage");


if (photoInput) {

    photoInput.addEventListener(
        "change",
        function (event) {

            const file =
                event.target.files[0];

            if (!file) return;


            if (
                !file.type.startsWith("image/")
            ) {

                showToast(
                    "File harus berupa gambar."
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (e) {

                    if (
                        profileImage
                    ) {

                        profileImage.src =
                            e.target.result;

                    }


                    /*
                     * Menyimpan foto sementara
                     * di browser.
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


                    showToast(
                        "Foto profil berhasil diganti."
                    );

                };


            reader.readAsDataURL(file);

        }
    );

}


/* Load saved photo */

let savedPhoto = null;

try {

    savedPhoto =
        localStorage.getItem(
            "portfolioProfilePhoto"
        );

} catch (error) {

    savedPhoto = null;

}


if (
    savedPhoto &&
    profileImage
) {

    profileImage.src =
        savedPhoto;

}


/* =====================================
   DARK / LIGHT MODE
===================================== */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


let savedTheme = null;


try {

    savedTheme =
        localStorage.getItem(
            "portfolioTheme"
        );

} catch (error) {

    savedTheme = null;

}


if (
    savedTheme === "light"
) {

    document.body.classList.add(
        "light"
    );

    if (themeToggle) {

        themeToggle.textContent =
            "🌙";

    }

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "light"
            );


            const isLight =
                document.body.classList.contains(
                    "light"
                );


            try {

                localStorage.setItem(
                    "portfolioTheme",
                    isLight
                        ? "light"
                        : "dark"
                );

            } catch (error) {

                console.warn(
                    "Tema tidak dapat disimpan."
                );

            }


            themeToggle.textContent =
                isLight
                    ? "🌙"
                    : "☀️";

        }
    );

}


/* =====================================
   BACKGROUND MUSIC
===================================== */

const music =
    document.getElementById(
        "backgroundMusic"
    );

const musicToggle =
    document.getElementById(
        "musicToggle"
    );


let musicPlaying = false;


/*
 * Browser Android biasanya tidak mengizinkan
 * autoplay audio sebelum user melakukan interaksi.
 */

if (
    musicToggle &&
    music
) {

    musicToggle.addEventListener(
        "click",
        function () {

            if (!musicPlaying) {

                music.play()

                    .then(function () {

                        musicPlaying = true;

                        musicToggle.textContent =
                            "🔊";

                        showToast(
                            "Musik dinyalakan."
                        );

                    })

                    .catch(function () {

                        showToast(
                            "Tambahkan file music.mp3 ke folder website."
                        );

                    });

            } else {

                music.pause();

                musicPlaying = false;

                musicToggle.textContent =
                    "🔇";

                showToast(
                    "Musik dimatikan."
                );

            }

        }
    );

}


/* =====================================
   SCROLL REVEAL
===================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    "IntersectionObserver" in window

        ? new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        )

        : null;


revealElements.forEach(
    function (element) {

        if (revealObserver) {

            revealObserver.observe(
                element
            );

        } else {

            element.classList.add(
                "show"
            );

        }

    }
);


/* =====================================
   ACTIVE NAVIGATION
===================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


window.addEventListener(
    "scroll",
    function () {

        let current = "";


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop - 150;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + current
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =====================================
   BACK TO TOP
===================================== */

const backTop =
    document.getElementById(
        "backTop"
    );


window.addEventListener(
    "scroll",
    function () {

        if (!backTop) return;


        if (
            window.scrollY > 500
        ) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    }
);


if (backTop) {

    backTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =====================================
   COUNTER ANIMATION
===================================== */

const counters =
    document.querySelectorAll(
        "[data-count]"
    );


let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    countersStarted = true;


    counters.forEach(
        function (counter) {

            const target =
                Number(
                    counter.dataset.count
                );


            let current = 0;


            const increment =
                Math.max(
                    1,
                    Math.ceil(
                        target / 40
                    )
                );


            const timer =
                setInterval(
                    function () {

                        current +=
                            increment;


                        if (
                            current >=
                            target
                        ) {

                            current =
                                target;

                            clearInterval(
                                timer
                            );

                        }


                        counter.textContent =
                            current + "+";

                    },
                    35
                );

        }
    );

}


const statsContainer =
    document.querySelector(
        ".stats-container"
    );


if (
    statsContainer &&
    "IntersectionObserver" in window
) {

    const statsObserver =
        new IntersectionObserver(
            function (entries) {

                if (
                    entries[0]
                        .isIntersecting
                ) {

                    startCounters();

                    statsObserver.disconnect();

                }

            }
        );


    statsObserver.observe(
        statsContainer
    );

} else if (statsContainer) {

    startCounters();

}


/* =====================================
   PROJECT FILTER
===================================== */

const filterButtons =
    document.querySelectorAll(
        ".filter"
    );

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const filter =
                    button.dataset.filter;


                projectCards.forEach(
                    function (card) {

                        const category =
                            card.dataset.category;


                        if (
                            filter === "all" ||
                            category === filter
                        ) {

                            card.style.display =
                                "";

                            setTimeout(
                                function () {

                                    card.style.opacity =
                                        "1";

                                },
                                10
                            );

                        } else {

                            card.style.opacity =
                                "0";


                            setTimeout(
                                function () {

                                    card.style.display =
                                        "none";

                                },
                                200
                            );

                        }

                    }
                );

            }
        );

    }
);


/* =====================================
   PROJECT MODAL
===================================== */

const projectModal =
    document.getElementById(
        "projectModal"
    );


const closeModal =
    document.getElementById(
        "closeModal"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalDescription =
    document.getElementById(
        "modalDescription"
    );


const modalTech =
    document.getElementById(
        "modalTech"
    );


document
    .querySelectorAll(
        ".project-detail"
    )
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    if (
                        !projectModal ||
                        !modalTitle ||
                        !modalDescription ||
                        !modalTech
                    ) {

                        return;

                    }


                    modalTitle.textContent =
                        button.dataset.title ||
                        "";


                    modalDescription.textContent =
                        button.dataset.description ||
                        "";


                    modalTech.textContent =
                        button.dataset.tech ||
                        "";


                    projectModal.classList.add(
                        "show"
                    );


                    document.body.style.overflow =
                        "hidden";

                }
            );

        }
    );


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeProjectModal
    );

}


function closeProjectModal() {

    if (!projectModal) return;


    projectModal.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


if (projectModal) {

    projectModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                projectModal
            ) {

                closeProjectModal();

            }

        }
    );

}


/* =====================================
   CERTIFICATE IMAGE MODAL
===================================== */

const imageModal =
    document.getElementById(
        "imageModal"
    );


const modalImage =
    document.getElementById(
        "modalImage"
    );


const closeImageModal =
    document.getElementById(
        "closeImageModal"
    );


document
    .querySelectorAll(
        ".certificate-card img"
    )
    .forEach(
        function (image) {

            image.addEventListener(
                "click",
                function () {

                    if (
                        !modalImage ||
                        !imageModal
                    ) {

                        return;

                    }


                    modalImage.src =
                        image.src;


                    imageModal.classList.add(
                        "show"
                    );


                    document.body.style.overflow =
                        "hidden";

                }
            );

        }
    );


if (closeImageModal) {

    closeImageModal.addEventListener(
        "click",
        function () {

            if (!imageModal) return;


            imageModal.classList.remove(
                "show"
            );


            document.body.style.overflow =
                "";

        }
    );

}


if (imageModal) {

    imageModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                imageModal
            ) {

                imageModal.classList.remove(
                    "show"
                );


                document.body.style.overflow =
                    "";

            }

        }
    );

}


/* =====================================
   CONTACT FORM
===================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nameElement =
                document.getElementById(
                    "contactName"
                );


            const emailElement =
                document.getElementById(
                    "contactEmail"
                );


            const messageElement =
                document.getElementById(
                    "contactMessage"
                );


            const name =
                nameElement
                    ? nameElement.value.trim()
                    : "";


            const email =
                emailElement
                    ? emailElement.value.trim()
                    : "";


            const message =
                messageElement
                    ? messageElement.value.trim()
                    : "";


            if (
                !name ||
                !email ||
                !message
            ) {

                showToast(
                    "Lengkapi semua data."
                );

                return;

            }


            /*
             * Ganti email berikut
             * dengan email kamu.
             */

            const destination =
                "magustian745@email.com";


            const subject =
                encodeURIComponent(
                    "Pesan dari Portfolio - " +
                    name
                );


            const body =
                encodeURIComponent(

                    "Nama: " +
                    name +

                    "\nEmail: " +
                    email +

                    "\n\nPesan:\n" +
                    message

                );


            window.location.href =
                "mailto:" +
                destination +
                "?subject=" +
                subject +
                "&body=" +
                body;


            showToast(
                "Membuka aplikasi email..."
            );


            contactForm.reset();

        }
    );

}


/* =====================================
   DOWNLOAD CV
===================================== */

const downloadCV =
    document.getElementById(
        "downloadCV"
    );


if (downloadCV) {

    downloadCV.addEventListener(
        "click",
        function () {

            /*
             * Karena website berjalan offline,
             * tombol ini membuka halaman CV
             * yang bisa disimpan sebagai PDF
             * melalui menu Print browser.
             */

            const cvWindow =
                window.open(
                    "",
                    "_blank"
                );


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

                    <title>
                        CV - Muhammad Agustian
                    </title>


                    <style>

                        body {

                            font-family:
                                Arial,
                                sans-serif;

                            max-width:
                                800px;

                            margin:
                                40px auto;

                            padding:
                                20px;

                            color:
                                #111;

                            line-height:
                                1.6;

                        }


                        h1 {

                            margin-bottom:
                                5px;

                        }


                        h2 {

                            margin-top:
                                30px;

                            border-bottom:
                                2px solid #111;

                            padding-bottom:
                                5px;

                        }


                        .muted {

                            color:
                                #666;

                        }


                        .skills {

                            display:
                                flex;

                            flex-wrap:
                                wrap;

                            gap:
                                8px;

                        }


                        .skill {

                            background:
                                #eee;

                            padding:
                                6px 10px;

                            border-radius:
                                6px;

                        }


                        @media print {

                            body {

                                margin:
                                    20px;

                            }

                        }

                    </style>

                </head>


                <body>

                    <h1>
                        Muhammad Agustian
                    </h1>


                    <p class="muted">

                        Student • Informatics
                        • Web Developer

                    </p>


                    <p>

                        Email:
                        magustian745@email.com

                        <br>

                        WhatsApp:
                        +62 878-8021-3072

                        <br>

                        Location:
                        Indonesia

                    </p>


                    <h2>
                        ABOUT ME
                    </h2>


                    <p>

                        Pelajar yang memiliki
                        minat pada Informatika,
                        teknologi, web development,
                        desain, dan pengembangan
                        proyek digital.

                    </p>


                    <h2>
                        SKILLS
                    </h2>


                    <div class="skills">

                        <span class="skill">
                            HTML
                        </span>

                        <span class="skill">
                            CSS
                        </span>

                        <span class="skill">
                            JavaScript
                        </span>

                        <span class="skill">
                            UI/UX
                        </span>

                        <span class="skill">
                            Microsoft Office
                        </span>

                        <span class="skill">
                            Video Editing
                        </span>

                    </div>


                    <h2>
                        PROJECTS
                    </h2>


                    <ul>

                        <li>
                            Personal Portfolio Website
                        </li>

                        <li>
                            Memory Challenge Game
                        </li>

                        <li>
                            Online Store Website
                        </li>

                        <li>
                            Digital Poster Design
                        </li>

                    </ul>


                    <h2>
                        EDUCATION
                    </h2>


                    <p>

                        Student —
                        Informatics & Technology

                    </p>


                    <h2>
                        EXPERIENCE
                    </h2>


                    <p>

                        Personal Web Development
                        Projects

                    </p>


                    <script>

                        window.onload =
                            function () {

                                window.print();

                            };

                    <\\/script>


                </body>

                </html>

            `);


            cvWindow.document.close();

        }
    );

}


/* =====================================
   TOAST
===================================== */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) return;


    const text =
        toast.querySelector("p");


    if (!text) return;


    text.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}


/* =====================================
   YEAR
===================================== */

const year =
    document.getElementById(
        "year"
    );


if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =====================================
   KEYBOARD ESCAPE
===================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        if (
            projectModal &&
            projectModal.classList.contains(
                "show"
            )
        ) {

            closeProjectModal();

        }


        if (
            imageModal &&
            imageModal.classList.contains(
                "show"
            )
        ) {

            imageModal.classList.remove(
                "show"
            );


            document.body.style.overflow =
                "";

        }

    }
);