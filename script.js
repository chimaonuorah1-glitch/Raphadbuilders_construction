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

            opacity: 0;

            transform:
                translateY(35px);

            transition:
                opacity .8s ease,
                transform .8s cubic-bezier(.22,1,.36,1);

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