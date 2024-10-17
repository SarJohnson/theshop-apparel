const suppliers = document.querySelectorAll('.supplier-item');
const logos = document.querySelectorAll('.carousel-item img');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalLink = document.getElementById('modal-link');
const closeModalBtn = document.getElementById('modal-close');

const supplierData = {
    ssactivewear: {
        title: "SS Activewear",
        description: "Leading supplier of high-quality activewear and accessories.",
        link: "https://www.ssactivewear.com/"
    },
    sanmar: {
        title: "SanMar",
        description: "A trusted supplier of apparel and promotional products.",
        link: "https://www.sanmar.com"
    },
    hitpromo: {
        title: "Hit Promotional Products",
        description: "Innovative promotional items for events, brands, and marketing.",
        link: "https://www.hitpromo.net"
    },
    alphabroder: {
        title: "Alphabroder",
        description: "Supplier of high-quality apparel for branding and events.",
        link: "https://www.alphabroder.com"
    },
    augustsportswear: {
        title: "Augusta Sportswear",
        description: "Premium sportswear and athletic gear for teams and individuals.",
        link: "https://www.augustasportswear.com"
    },
    ordermygear: {
        title: "OrderMyGear",
        description: "Custom ecommerce solutions for team gear and branded merchandise.",
        link: "https://www.ordermygear.com"
    }
};

// Add event listener to each supplier item
suppliers.forEach(supplier => {
    supplier.addEventListener('click', function () {
        const supplierKey = this.getAttribute('data-supplier');
        const data = supplierData[supplierKey];

        if (data) {
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            modalLink.href = data.link;
            modalLink.textContent = `Visit ${data.title}`;
            modal.style.display = 'flex'; // Show the modal
        }
    });
});

// Close the modal when the close button is clicked
closeModalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Close modal if clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic hero text animation
const heroText = document.querySelector('.hero p');
const messages = ["Quality Product", "Affordable Prices", "Quick Turnaround"];
let messageIndex = 0;

function changeHeroText() {
    heroText.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
}

setInterval(changeHeroText, 2000); // Change text every 2 seconds

// Fade-in sections on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        }
    });
});

/// Function to scroll with offset to center the section in the viewport
function scrollToSectionCentered(id) {
    const target = document.querySelector(id);
    const navbarHeight = document.querySelector('header').offsetHeight; // Get the height of the fixed navbar
    const viewportHeight = window.innerHeight; // Get the height of the viewport
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - (viewportHeight / 2) + (target.offsetHeight / 2); // Calculate center position

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Apply the function to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default anchor behavior
        const targetId = this.getAttribute('href'); // Get the target section ID
        scrollToSectionCentered(targetId); // Call the function with the target ID
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll to the contact section when "Shop Now" button is clicked
const shopNowBtn = document.getElementById('shopNowBtn');
shopNowBtn.addEventListener('click', function() {
    window.location.href = '../templates/contact.html';
});

const menuToggle = document.getElementById('menuToggle');
    const navbarLinks = document.getElementById('navbarLinks');

    menuToggle.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });

const form = document.getElementById('contactForm');
    
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert("Thank you for your message! We'll get back to you soon.");
            form.reset(); // Clear the form after submission
        } else {
            alert("Oops! Something went wrong. Please try again.");
        }
    } catch (error) {
        alert("There was a problem submitting the form.");
    }
});
