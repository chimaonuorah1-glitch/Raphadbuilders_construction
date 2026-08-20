/* =========================================================
   RAPHADBUILDERS CONSTRUCTION COMPANY LTD.
   COMPLETE WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       ELEMENTS
    ----------------------------------------------------- */

    const loadingScreen =
        document.getElementById("loadingScreen");

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileNav =
        document.querySelector(".mobile-nav");

    const consultationForm =
        document.getElementById("consultationForm");

    const formSuccess =
        document.getElementById("formSuccess");


    /* =====================================================
       LOADING SCREEN
    ===================================================== */

    const hideLoadingScreen = () => {

        if (!loadingScreen) return;

        loadingScreen.classList.add("loaded");

        document.body.classList.remove("loading");

    };


    /*
       Give the browser a moment to load the page,
       then remove the loading screen.
    */

    window.addEventListener("load", () => {

        setTimeout(() => {

            hideLoadingScreen();

        }, 900);

    });


    /*
       Safety fallback in case an image takes too long
       to load.
    */

    setTimeout(() => {

        hideLoadingScreen();

    }, 5000);



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && mobileNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.classList.toggle("active");

            mobileNav.classList.toggle(
                "active",
                isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /*
           Close mobile menu when a link is clicked.
        */

        const mobileLinks =
            mobileNav.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");

                mobileNav.classList.remove("active");

                document.body.classList.remove("menu-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /*
           Close menu when clicking outside it.
        */

        document.addEventListener("click", event => {

            const clickedInsideMenu =
                mobileNav.contains(event.target);

            const clickedButton =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedButton
            ) {

                menuToggle.classList.remove("active");

                mobileNav.classList.remove("active");

                document.body.classList.remove("menu-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const navigationLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    navigationLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);

            if (!target) return;


            event.preventDefault();


            const header =
                document.querySelector(".site-header");

            const headerHeight =
                header
                    ? header.offsetHeight + 20
                    : 20;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });



    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".about-section, " +
            ".services-section, " +
            ".service-feature, " +
            ".service-detail-card, " +
            ".projects-section, " +
            ".gallery-section, " +
            ".process-section, " +
            ".quality-section, " +
            ".mission-card, " +
            ".value-card, " +
            ".leader-card, " +
            ".contact-section"
        );


    /*
       Add initial class.
    */

    revealElements.forEach(element => {

        element.classList.add(
            "scroll-reveal"
        );

    });


    /*
       Add animation CSS dynamically so you don't
       have to modify the stylesheet again.
    */

    const revealStyle =
        document.createElement("style");


    revealStyle.textContent = `

        .scroll-reveal {

            opacity: 1;

            transform:
                translateY(0);

            transition:
                none;

        }


        .scroll-reveal.revealed {

            opacity: 1;

            transform:
                translateY(0);

        }


        .hero-card {

            animation:
                heroEntrance 1s cubic-bezier(.22,1,.36,1)
                both;

        }


        @keyframes heroEntrance {

            from {

                opacity: 0;

                transform:
                    translateY(30px)
                    scale(.98);

            }

            to {

                opacity: 1;

                transform:
                    translateY(0)
                    scale(1);

            }

        }

    `;


    document.head.appendChild(
        revealStyle
    );


    /*
       Intersection Observer.
    */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "revealed"
            );

        });

    }



    /* =====================================================
       HEADER SHADOW ON SCROLL
    ===================================================== */

    const header =
        document.querySelector(".site-header");


    if (header) {

        const updateHeader =
            () => {

                if (
                    window.scrollY > 40
                ) {

                    header.classList.add(
                        "scrolled"
                    );

                } else {

                    header.classList.remove(
                        "scrolled"
                    );

                }

            };


        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );


        updateHeader();


        const headerStyle =
            document.createElement("style");


        headerStyle.textContent = `

            .site-header {

                transition:
                    transform .3s ease;

            }


            .site-header.scrolled
            .nav-bar {

                box-shadow:
                    0 15px 45px
                    rgba(31,31,25,.14);

            }

        `;


        document.head.appendChild(
            headerStyle
        );

    }



    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".main-nav a, .mobile-nav a"
        );


    if (
        sections.length &&
        navLinks.length
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const id =
                                entry.target.id;


                            navLinks.forEach(link => {

                                link.classList.remove(
                                    "active"
                                );


                                if (
                                    link.getAttribute(
                                        "href"
                                    ) === `#${id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            });

                        }

                    });

                },
                {
                    rootMargin:
                        "-30% 0px -60% 0px"
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(
                section
            );

        });


        const activeNavStyle =
            document.createElement("style");


        activeNavStyle.textContent = `

            .main-nav a.active {

                color: #a47b32;

            }


            .main-nav a.active::after {

                transform: scaleX(1);

                transform-origin: left;

            }

        `;


        document.head.appendChild(
            activeNavStyle
        );

    }



    /* =====================================================
       FORM — FORMSPREE
    ===================================================== */

    if (consultationForm) {

        consultationForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const submitButton =
                    consultationForm.querySelector(
                        ".submit-button"
                    );


                const originalButtonText =
                    submitButton
                        ? submitButton.innerHTML
                        : "Send Enquiry";


                /*
                   Prevent multiple submissions.
                */

                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.innerHTML =
                        `
                        Sending...
                        <span>...</span>
                        `;

                }


                if (formSuccess) {

                    formSuccess.textContent =
                        "";

                }


                const formData =
                    new FormData(
                        consultationForm
                    );


                try {

                    const response =
                        await fetch(
                            consultationForm.action,
                            {
                                method: "POST",

                                body: formData,

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    if (response.ok) {

                        /*
                           Successful submission.
                        */

                        if (formSuccess) {

                            formSuccess.textContent =
                                "Thank you. Your enquiry has been sent successfully. We will get back to you shortly.";

                        }


                        consultationForm.reset();


                        if (submitButton) {

                            submitButton.innerHTML =
                                `
                                Enquiry Sent
                                <span>✓</span>
                                `;

                        }


                        /*
                           Return button to normal
                           after a few seconds.
                        */

                        setTimeout(() => {

                            if (submitButton) {

                                submitButton.disabled =
                                    false;

                                submitButton.innerHTML =
                                    originalButtonText;

                            }

                        }, 5000);


                    } else {

                        throw new Error(
                            "Form submission failed."
                        );

                    }


                } catch (error) {

                    console.error(
                        "Formspree error:",
                        error
                    );


                    if (formSuccess) {

                        formSuccess.textContent =
                            "Something went wrong while sending your enquiry. Please try again.";

                    }


                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            originalButtonText;

                    }

                }

            }
        );

    }



    /* =====================================================
       HORIZONTAL DRAG SCROLL
    ===================================================== */

    const horizontalAreas =
        document.querySelectorAll(
            ".projects-viewport"
        );


    horizontalAreas.forEach(area => {

        let isDown = false;

        let startX = 0;

        let scrollStart = 0;


        area.addEventListener(
            "mousedown",
            event => {

                isDown = true;

                area.classList.add(
                    "dragging"
                );

                startX =
                    event.pageX -
                    area.offsetLeft;

                scrollStart =
                    area.scrollLeft;

            }
        );


        area.addEventListener(
            "mouseleave",
            () => {

                isDown = false;

                area.classList.remove(
                    "dragging"
                );

            }
        );


        area.addEventListener(
            "mouseup",
            () => {

                isDown = false;

                area.classList.remove(
                    "dragging"
                );

            }
        );


        area.addEventListener(
            "mousemove",
            event => {

                if (!isDown) return;

                event.preventDefault();


                const x =
                    event.pageX -
                    area.offsetLeft;


                const distance =
                    (x - startX) * 1.2;


                area.scrollLeft =
                    scrollStart -
                    distance;

            }
        );

    });



    /* =====================================================
       IMAGE LAZY LOADING
    ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(image => {

        /*
           Don't lazy-load the hero image because
           it should appear immediately.
        */

        const isHero =
            image.closest(".hero");


        if (!isHero) {

            image.loading = "lazy";

        }


        image.decoding =
            "async";

    });



    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );

                image.classList.add(
                    "image-error"
                );

            }
        );

    });



    /* =====================================================
       BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .submit-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.className =
                    "button-ripple";


                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                ripple.style.left =
                    `${x}px`;

                ripple.style.top =
                    `${y}px`;


                button.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 700);

            }
        );

    });


    const rippleStyle =
        document.createElement("style");


    rippleStyle.textContent = `

        .btn,
        .submit-button {

            position: relative;

            overflow: hidden;

        }


        .button-ripple {

            position: absolute;

            width: 10px;

            height: 10px;

            border-radius: 50%;

            background:
                rgba(
                    255,
                    255,
                    255,
                    .35
                );

            pointer-events: none;

            transform:
                translate(-50%, -50%)
                scale(0);

            animation:
                buttonRipple .7s ease-out
                forwards;

        }


        @keyframes buttonRipple {

            to {

                transform:
                    translate(-50%, -50%)
                    scale(25);

                opacity: 0;

            }

        }


        .projects-viewport.dragging {

            cursor: grabbing;

        }


        .image-error {

            opacity: .5;

        }

    `;


    document.head.appendChild(
        rippleStyle
    );



    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });



    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                }


                if (mobileNav) {

                    mobileNav.classList.remove(
                        "active"
                    );

                }


                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );



    /* =====================================================
       REDUCE MOTION ACCESSIBILITY
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document.documentElement.style
            .scrollBehavior = "auto";


        document.querySelectorAll(
            ".services-track, .gallery-track"
        ).forEach(element => {

            element.style.animation =
                "none";

        });


        revealElements.forEach(element => {

            element.classList.add(
                "revealed"
            );

        });

    }

});

/* =================================================
   RAPHAD TEXT VIDEO
================================================= */

const raphadVideo =
    document.getElementById(
        "raphadTextVideo"
    );

const raphadCanvas =
    document.getElementById(
        "raphadTextCanvas"
    );


if (
    raphadVideo &&
    raphadCanvas
) {

    const ctx =
        raphadCanvas.getContext("2d");


    let animationStarted = false;


    function resizeRaphadCanvas() {

        const rect =
            raphadCanvas.getBoundingClientRect();

        const ratio =
            window.devicePixelRatio || 1;


        raphadCanvas.width =
            rect.width * ratio;

        raphadCanvas.height =
            rect.height * ratio;


        ctx.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );

    }


    function drawRaphadVideo() {

        const width =
            raphadCanvas.clientWidth;

        const height =
            raphadCanvas.clientHeight;


        if (!width || !height) {

            requestAnimationFrame(
                drawRaphadVideo
            );

            return;

        }


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /* -----------------------------------------
           TEXT MASK
        ----------------------------------------- */

        ctx.save();


        const fontSize =
            Math.min(
                width * 0.17,
                175
            );


        ctx.font =
            `700 ${fontSize}px "DM Sans", sans-serif`;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle = "#000";


        ctx.fillText(
            "RAPHAD",
            width / 2,
            height / 2
        );


        /* -----------------------------------------
           KEEP VIDEO ONLY INSIDE TEXT
        ----------------------------------------- */

        ctx.globalCompositeOperation =
            "source-in";


        if (
            raphadVideo.readyState >= 2 &&
            raphadVideo.videoWidth &&
            raphadVideo.videoHeight
        ) {

            const videoWidth =
                raphadVideo.videoWidth;

            const videoHeight =
                raphadVideo.videoHeight;


            const videoRatio =
                videoWidth / videoHeight;

            const canvasRatio =
                width / height;


            let drawWidth;
            let drawHeight;
            let offsetX;
            let offsetY;


            if (
                videoRatio > canvasRatio
            ) {

                drawHeight = height;

                drawWidth =
                    height * videoRatio;

                offsetX =
                    (width - drawWidth) / 2;

                offsetY = 0;

            } else {

                drawWidth = width;

                drawHeight =
                    width / videoRatio;

                offsetX = 0;

                offsetY =
                    (height - drawHeight) / 2;

            }


            ctx.drawImage(
                raphadVideo,
                offsetX,
                offsetY,
                drawWidth,
                drawHeight
            );

        }


        ctx.restore();


        requestAnimationFrame(
            drawRaphadVideo
        );

    }


    function startRaphadVideo() {

        resizeRaphadCanvas();

        raphadVideo.play()
            .catch(() => {});


        if (!animationStarted) {

            animationStarted = true;

            requestAnimationFrame(
                drawRaphadVideo
            );

        }

    }


    raphadVideo.addEventListener(
        "loadeddata",
        startRaphadVideo
    );


    window.addEventListener(
        "resize",
        resizeRaphadCanvas
    );


    if (
        raphadVideo.readyState >= 2
    ) {

        startRaphadVideo();

    }

}

/* =====================================================
   MOBILE MENU
===================================================== */

const mobileToggle = document.getElementById("mobileToggle");
const mainNav = document.getElementById("mainNav");

if (mobileToggle && mainNav) {
    mobileToggle.addEventListener("click", () => {
        document.body.classList.toggle("menu-open");
        mainNav.classList.toggle("active");
        mobileToggle.classList.toggle("active");
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            document.body.classList.remove("menu-open");
            mainNav.classList.remove("active");
            mobileToggle.classList.remove("active");
        });
    });
}


/* =====================================================
   STAT COUNTERS
===================================================== */

const counters = document.querySelectorAll(".counter");

const startCounter = counter => {

    const target = Number(counter.dataset.target);

    let current = 0;

    const duration = 1800;
    const startTime = performance.now();

    function updateCounter(time) {

        const progress = Math.min(
            (time - startTime) / duration,
            1
        );

        const easedProgress =
            1 - Math.pow(1 - progress, 3);

        current = Math.floor(
            easedProgress * target
        );

        counter.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
};


const counterObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                startCounter(entry.target);

                counterObserver.unobserve(
                    entry.target
                );

            }

        });

    },
    {
        threshold: 0.5
    }
);


counters.forEach(counter => {
    counterObserver.observe(counter);
});



/* =====================================================
   GENERIC HORIZONTAL DRAG / TOUCH SCROLL
===================================================== */

function makeDraggable(selector) {

    const slider = document.querySelector(selector);

    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    slider.addEventListener(
        "pointerdown",
        event => {

            isDown = true;

            slider.setPointerCapture(event.pointerId);

            startX = event.clientX;
            startScroll = slider.scrollLeft;

            slider.classList.add("dragging");

        }
    );


    slider.addEventListener(
        "pointermove",
        event => {

            if (!isDown) return;

            const distance =
                event.clientX - startX;

            slider.scrollLeft =
                startScroll - distance;

        }
    );


    const stopDragging = () => {

        isDown = false;

        slider.classList.remove("dragging");

    };


    slider.addEventListener(
        "pointerup",
        stopDragging
    );

    slider.addEventListener(
        "pointercancel",
        stopDragging
    );

    slider.addEventListener(
        "pointerleave",
        stopDragging
    );

}


//* AUTO-SCROLLING CAROUSELS ===================================================== //*

function autoScrollSlider(selector, speed = 0.35) {

    const slider = document.querySelector(selector);

    if (!slider) return;

    function move() {

        slider.scrollLeft += speed;

        if (
            slider.scrollLeft + slider.clientWidth >=
            slider.scrollWidth - 2
        ) {
            slider.scrollLeft = 0;
        }

        requestAnimationFrame(move);
    }

    requestAnimationFrame(move);
}


autoScrollSlider(".services-slider", 0.35);
autoScrollSlider(".delivery-track-wrapper", 0.35);
autoScrollSlider(".projects-track-wrapper", 0.3);
autoScrollSlider(".reviews-track-wrapper", 0.3);


/* =====================================================
   START AUTO SLIDERS
===================================================== */

autoScrollSlider(
    ".brands-section",
    0.45
);

autoScrollSlider(
    ".services-slider",
    0.35
);

autoScrollSlider(
    ".delivery-track-wrapper",
    0.35
);

autoScrollSlider(
    ".projects-track-wrapper",
    0.3
);

autoScrollSlider(
    ".reviews-track-wrapper",
    0.3
);



/* =====================================================
   CONSULTATION FORM
===================================================== */

const consultationForm =
    document.getElementById(
        "consultationForm"
    );


if (consultationForm) {

    consultationForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(
                    consultationForm
                );


            const name =
                formData.get("name");

            const phone =
                formData.get("phone");

            const email =
                formData.get("email");

            const project =
                formData.get("project");

            const message =
                formData.get("message");


            const subject =
                encodeURIComponent(
                    "New Cynosure Construction Consultation"
                );


            const body =
                encodeURIComponent(
`New Consultation Request

Name: ${name}

Phone: ${phone}

Email: ${email}

Project Type: ${project}

Project Details:
${message}`
                );


            /*
             * Opens the user's email client.
             * The message is already prepared.
             */

            window.location.href =
                `mailto:info@cynosureconstruction.com?subject=${subject}&body=${body}`;

        }
    );

}



/* =====================================================
   BACK TO TOP
===================================================== */

const backToTop =
    document.getElementById(
        "backToTop"
    );


if (backToTop) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 600) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        }
    );

}



/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

const header =
    document.querySelector(
        ".site-header"
    );


if (header) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 50) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        }
    );

}



/* =====================================================
   SMOOTH INTERNAL LINKS
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });
    
window.addEventListener("load", () => {

    const loadingScreen =
        document.getElementById("loadingScreen");

    setTimeout(() => {
        loadingScreen.classList.add("loaded");
    }, 1800);

});
