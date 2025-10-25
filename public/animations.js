document .fonts.ready.then(() => {
    let split = SplitText.create('.congrats', {
    type: 'chars, words',
    charsClass: 'char++'
});
gsap.from(split.chars.filter(char => !char.classList.contains('char17')), {
    yPercent: "random([-100, 100])",
    xPercent: "random([-100, 100])",
    rotation: "random(-30, 30)",
    autoAlpha: 0,
    stagger: {
        from: 'random',
        amount: 0.5
    },
    ease: 'back.out(1.7)',
    duration: 1.5,
});
// Define the target element and the characters
const char17 = document.querySelector('.char17');
const finalLetter = 'o'; // Assuming 'char17' corresponds to the letter 'o'
const emoji = '🥳';
const flickerDuration = 2; // Time to hold each state in the loop (2 seconds)

// 1. Initial State Setup: Set the content to the emoji for the entry animation
gsap.set(char17, { textContent: emoji, autoAlpha: 1});

// 2. Entry Animation (Slide in, Spin, and Fade in)
gsap.from(char17, {
    autoAlpha: 0,
    x: '100vw', // Starts off screen to the right
    rotation: 360, // Starts rotated
    duration: 2,
    delay: 2,
    ease: 'power2.out',

    // 3. Content Swap & Flicker Start
        onComplete: () => {

        // Create a repeating timeline to transform 'o' to emoji and back
        const flicker_tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 2, // Wait 2 seconds before repeating the cycle
            delay: 1 // Initial delay before starting
        });

        flicker_tl.to(char17, { // shrink emoji
            scale: 0,
            autoAlpha: 0,
            duration: 0.6,
            ease: 'power2.in',
            onComplete: () => {
                char17.textContent = finalLetter;
            }
        })
        .to(char17, { // expand 'o'
            scale: 1,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'back.out(1.7)'
        })
        .to(char17, { // hold 'o' for 2 seconds, then shrink it
            scale: 0,
            autoAlpha: 0,
            duration: 0.6,
            ease: 'power2.in',
            delay: 2,
            onComplete: () => {
                char17.textContent = emoji;
            }
        })
        .to(char17, { // expand emoji back
            scale: 1.2,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'back.out(1.7)'
        });
    }
});
});


//Scrolltrigger animations for the cardgrids
document.querySelectorAll('.photoGrid').forEach((grid) => {
    gsap.from(grid, {
        scrollTrigger: {
            trigger: grid,
            start: 'center 100%',
            toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        rotation: 0,
        ease: 'power2.out',
    });
});

// Scrolltrigger animations for the text sections
document.querySelectorAll('.messages').forEach((message) => {
    window.addEventListener('load', () => {
        gsap.from(message, {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
        });
    });
});

