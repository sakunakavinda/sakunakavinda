document.addEventListener('DOMContentLoaded', function() {

    const video = document.getElementById('home-video');
    if (video) {
        // Create fallback image element
        const fallbackImg = document.createElement('img');
        fallbackImg.src = video.poster;
        fallbackImg.className = 'video-fallback';
        fallbackImg.alt = 'Background image';
        video.parentNode.insertBefore(fallbackImg, video.nextSibling);
        
        // Check if video can play
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Video failed to play - show fallback image
                video.style.display = 'none';
                fallbackImg.style.display = 'block';
            });
        }
        
        // Handle when video ends (for the loop)
        video.addEventListener('ended', function() {
            video.currentTime = 0;
            video.play();
        });
    }


    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Gigs data
    const gigsData = [
        { date: "Saturday 7 pm - 10 pm", venue: "Kurunegala", info: "@Ceylon Lagos" },
        { date: "Friday 7 pm - 11 pm", venue: "Colombo", info: "@Ti Amo" },
        { date: "Thursday 7 pm - 11 pm", venue: "Colombo", info: "@Chef's Table" },
    ];

    // YouTube videos data
    const youtubeVideos = [
        { title: "Song Title 1", url: "https://www.youtube.com/embed/RuBe-gu-BKA" },
        { title: "Song Title 2", url: "https://www.youtube.com/embed/mpjtFXyTbvA" },
        { title: "Song Title 3", url: "https://www.youtube.com/embed/WvMa-qh5n30" },
        { title: "Song Title 4", url: "https://www.youtube.com/embed/UEIw3S9H7-I" }
    ];

    // Gallery videos data
    const galleryVideos = [
        {  src: "media/vd5.mp4" },
        {  src: "media/vd4.mp4" },
        {  src: "media/vd1.mp4" },
        {  src: "media/vd2.mp4" },
        {  src: "media/vd3.mp4" }
    ];

    // Display gigs with animation attributes
    function displayGigs() {
        const gigsContainer = document.getElementById("gigs-container");
        gigsData.forEach((gig, index) => {
            const gigCard = document.createElement("div");
            gigCard.className = "gig-card";
            gigCard.setAttribute('data-animate', 'slide-up');
            gigCard.style.transitionDelay = `${index * 0.1}s`;
            gigCard.innerHTML = `
                <h3>${gig.info}</h3>
                <p>${gig.date}</p>
                <p>${gig.venue}</p>
            `;
            gigsContainer.appendChild(gigCard);
        });
    }

    // Display gallery videos with animation attributes
    function displayGallery() {
        const galleryContainer = document.getElementById("gallery-container");
        galleryVideos.forEach((video, index) => {
            const videoDiv = document.createElement("div");
            videoDiv.className = "gallery-video";
            videoDiv.setAttribute('data-animate', 'slide-up');
            videoDiv.style.transitionDelay = `${index * 0.1}s`;
            videoDiv.innerHTML = `
                <video controls preload="metadata">
                    <source src="${video.src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            galleryContainer.appendChild(videoDiv);
        });

        // Add View More button
        const viewMoreBtn = document.createElement("a");
        viewMoreBtn.className = "view-more-btn";
        viewMoreBtn.href = "gallery.html";
        viewMoreBtn.setAttribute('data-animate', 'slide-up');
        viewMoreBtn.style.transitionDelay = `${galleryVideos.length * 0.1}s`;
        viewMoreBtn.innerHTML = `
            <i class="fas fa-images"></i>
            <span>View More</span>
        `;
        galleryContainer.appendChild(viewMoreBtn);

        // Add scroll indicator for mobile
        const scrollIndicator = document.createElement("div");
        scrollIndicator.className = "scroll-indicator";
        scrollIndicator.innerHTML = '<i class="fas fa-chevron-right"></i>';
        document.getElementById("gallery").appendChild(scrollIndicator);
    }

    // Display YouTube videos with animation attributes
    function displayYouTubeVideos() {
        const container = document.getElementById("youtube-videos");
        
        youtubeVideos.forEach((video, index) => {
            const videoDiv = document.createElement("div");
            videoDiv.className = "youtube-video";
            videoDiv.setAttribute('data-animate', 'slide-up');
            videoDiv.style.transitionDelay = `${index * 0.1}s`;
            
            videoDiv.innerHTML = `
                <iframe 
                    src="${video.url}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    title="${video.title}"
                    loading="lazy"
                ></iframe>
            `;
            container.appendChild(videoDiv);
        });

        // Add scroll indicator for mobile
        const scrollIndicator = document.createElement("div");
        scrollIndicator.className = "scroll-indicator";
        scrollIndicator.innerHTML = '<i class="fas fa-chevron-right"></i>';
        document.getElementById("youtube").appendChild(scrollIndicator);
    }

    // Initialize scroll animations
    function initScrollAnimations() {
        const animateOnScroll = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate section heading
                    const heading = entry.target.querySelector('h2');
                    if (heading && !heading.classList.contains('animate-in')) {
                        heading.classList.add('animate-in');
                    }
                    
                    // Animate all elements with data-animate attribute
                    const animatables = entry.target.querySelectorAll('[data-animate]');
                    animatables.forEach(el => {
                        if (!el.classList.contains('animate-in')) {
                            el.classList.add('animate-in');
                        }
                    });
                } else {
                    // Reset animations when element leaves view
                    const heading = entry.target.querySelector('h2');
                    if (heading) heading.classList.remove('animate-in');
                    
                    const animatables = entry.target.querySelectorAll('[data-animate]');
                    animatables.forEach(el => {
                        el.classList.remove('animate-in');
                    });
                }
            });
        };

        // Set up intersection observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(animateOnScroll, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
            
            // Observe individual animated elements within sections
            section.querySelectorAll('[data-animate]').forEach(el => {
                observer.observe(el);
            });
        });
    }

    // Mobile menu toggle with modern animations
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            if (mobileMenu.classList.contains('show')) {
                // Close menu with animation
                mobileMenu.classList.remove('show');
                mobileMenu.classList.add('hide');
                mobileMenuButton.classList.remove('active');
                
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                    mobileMenu.classList.remove('hide');
                }, 300);
            } else {
                // Open menu with animation
                mobileMenu.style.display = 'block';
                mobileMenuButton.classList.add('active');
                
                // Force reflow to ensure display change is applied
                mobileMenu.offsetHeight;
                
                mobileMenu.classList.add('show');
            }
        });

        // Close menu when clicking on links
        mobileMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                mobileMenu.classList.remove('show');
                mobileMenu.classList.add('hide');
                mobileMenuButton.classList.remove('active');
                
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                    mobileMenu.classList.remove('hide');
                }, 300);
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                if (mobileMenu.classList.contains('show')) {
                    mobileMenu.classList.remove('show');
                    mobileMenu.classList.add('hide');
                    mobileMenuButton.classList.remove('active');
                    
                    setTimeout(() => {
                        mobileMenu.style.display = 'none';
                        mobileMenu.classList.remove('hide');
                    }, 300);
                }
            }
        });
    }

    // Smooth scroll function
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    }

    // Add smooth scroll to all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            if (mobileMenu) {
                mobileMenu.style.display = 'none';
            }
            
            smoothScroll(target);
        });
    });

    // Button event listeners
    document.getElementById('youtube-channel-btn').addEventListener('click', function() {
        window.open('https://www.youtube.com/@sakuna_kavinda', '_blank');
    });

    document.getElementById('whatsapp-btn').addEventListener('click', function() {
        window.open('https://wa.me/+94716531817', '_blank');
    });

    document.getElementById('messenger-btn').addEventListener('click', function() {
        window.open('https://m.me/tadashi.hamada.16940', '_blank');
    });

    // Initialize everything
    displayGigs();
    displayGallery();
    displayYouTubeVideos();
    initScrollAnimations();

    // Animate home content after a slight delay
    setTimeout(() => {
        const homeContent = document.getElementById('home-content');
        if (homeContent) {
            homeContent.style.animation = 'slideUp 1s ease 0.3s forwards';
        }
    }, 300);
});