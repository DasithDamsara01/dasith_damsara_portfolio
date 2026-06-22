document.addEventListener('DOMContentLoaded', () => {
    const switcherToggle = document.getElementById('switcherToggle');
    const colorPalette = document.getElementById('colorPalette');
    const colorBalls = document.querySelectorAll('.color-ball');
    const themeModeToggle = document.getElementById('themeModeToggle');
    const body = document.body;

    let currentColorName = 'cyan';

    function updateAccentColor() {
        body.style.setProperty('--accent-color', `var(--${currentColorName}-color)`);
    }

    // 1. Color Switcher Logic
    switcherToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        colorPalette.classList.toggle('active');
    });

    colorBalls.forEach(ball => {
        ball.addEventListener('click', (e) => {
            currentColorName = ball.getAttribute('data-color');
            updateAccentColor();
            colorPalette.classList.remove('active');
        });
    });

    // 2. Light / Dark Mode Toggle Logic
    themeModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        updateAccentColor();
    });

    document.addEventListener('click', (e) => {
        if (!switcherToggle.contains(e.target) && !colorPalette.contains(e.target)) {
            colorPalette.classList.remove('active');
        }
    });

    // 3. PURE JAVASCRIPT TYPING EFFECT IMPLEMENTATION
    const words = ["Graphic Designer", "Visual Artist", "Creative Thinker"];
    let i = 0;
    let timer;

    function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                document.getElementById('typing-effect').innerHTML += word.shift();
            } else {
                setTimeout(deletingEffect, 2000);
                return false;
            }
            timer = setTimeout(loopTyping, 100);
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                document.getElementById('typing-effect').innerHTML = word.join("");
            } else {
                if (words.length > (i + 1)) {
                    i++;
                } else {
                    i = 0;
                }
                setTimeout(typingEffect, 500);
                return false;
            }
            timer = setTimeout(loopDeleting, 60);
        };
        loopDeleting();
    }

    // 4. DYNAMIC RANDOM GRAPHIC DESIGN ICONS LOGIC
    const designIcons = [
        "fas fa-vector-square",
        "fas fa-pen-nib",
        "fas fa-palette",
        "fas fa-bezier-curve",
        "fas fa-crop-alt",
        "fas fa-paint-brush",
        "fas fa-layer-group",
        "fas fa-pencil-alt"
    ];
    
    const iconElement = document.getElementById('dynamic-hero-icon');
    const iconContainer = iconElement.parentElement;
    let currentIconIndex = 0;

    function changeHeroIcon() {
        // Add smooth scale out transition
        iconContainer.classList.add('icon-swap');
        
        setTimeout(() => {
            // Pick next icon in list (sequential loop for better user feel than true random repeats)
            currentIconIndex = (currentIconIndex + 1) % designIcons.length;
            
            // Clear previous classes and set new FontAwesome classes
            iconElement.className = designIcons[currentIconIndex];
            
            // Smooth scale back in
            iconContainer.classList.remove('icon-swap');
        }, 500); // matches transition time
    }

    // Change icon every 3.5 seconds
    setInterval(changeHeroIcon, 3500);

    // Run initial states
    updateAccentColor();
    typingEffect();
});
