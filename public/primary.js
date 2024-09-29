const progressImage = document.getElementById('progressImage');
        const percentageDisplay = document.getElementById('percentage');
		const newImage = document.getElementById('newImage');
        const leaf = document.getElementById('leaf');
        const welcomeSection = document.getElementById('welcomeSection');
        const themeSlider = document.getElementById('themeSlider');
        const navBar = document.getElementById('navBar');
        const aboutSection = document.getElementById('aboutSection');
        const registeredUserSection = document.getElementById('registeredUserSection');
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += 1; // Increase progress by 1%
            progressImage.style.filter = `grayscale(${100 - progress}%)`; // Remove grayscale as progress increases
            percentageDisplay.textContent = progress + '%'; // Update percentage display

            if (progress >= 100) {
                clearInterval(loadingInterval);
                
                // Hide loading screen immediately
                document.getElementById('loadingScreen').style.display = 'none';

                // Show the leaf and trigger its animation
               

                // Immediately show the new image and start its animation
                newImage.style.opacity = 1; // Fade in new image
                newImage.style.transition = 'opacity 2s ease'; // Ensure smooth opacity transition

                // Show welcome section and nav bar after the image fades in
                setTimeout(() => {
                    welcomeSection.style.display = 'block'; // Display welcome section after image appears
                    welcomeSection.style.animation = 'glideDown 1s ease forwards'; // Glide down effect
					aboutSection.style.display = 'block';
					
                    // Show nav bar after the new image animation
                    navBar.style.display = 'flex'; // Show navigation bar

                    // Show "About" and "Registered User" sections after image has loaded

                }, 2000); // Delay for welcome section and nav bar*/
            }
        }, 50); // Interval for loading

			themeSlider.addEventListener('input', (e) => {
				if (e.target.value == 1) {
					document.body.style.backgroundColor = '#333';
					welcomeSection.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
					welcomeSection.style.color = 'white';
				} else {
					document.body.style.backgroundColor = '#f0f8ff';
					welcomeSection.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
					welcomeSection.style.color = 'black';
				}
			});