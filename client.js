document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript runs after the DOM is ready, but before other resources load!");
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function updateClock() {
        const clockElement = document.querySelector('.clock');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;
        clockElement.textContent = formattedTime;
    }

    const container = document.querySelector('body');

    function scrollToTarget(id) {
        const target = document.getElementById(id);

        console.log(target, id);
        if (container && target) {
            // Scroll smoothly within the container
            // container.scroll({
            // top: elementScrollTop - container.offsetTop - (container.offsetHeight - target.offsetHeight) /2,
            // behavior: 'smooth'
            // });

            target.scrollIntoView({
                behavior: "smooth", block: "center"
            })
        }
    }

    const list = [];
    function getElementScrollPosition(element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        return rect.top + scrollTop;
    }

    function updateOpacity (element) {

        if (element.classList.contains('category') ) {
            const rect = element.getBoundingClientRect();
            const elementScrollTop = getElementScrollPosition(element);
            const pos = window.scrollY;
            const min = elementScrollTop- element.offsetHeight;
            const max = elementScrollTop + element.offsetHeight;

            if (pos > min && pos < max) { 

                element.style.opacity = 1;
            } else {
                element.style.opacity = 0;
            }
        }
        
    }

    const _category = document.querySelectorAll('.category')

    function updateAllOpacity () {

        _category.forEach(element => {
            updateOpacity(element)
        });
    }
    
    window.addEventListener('scroll', () => {
        updateAllOpacity();
    });

    

    const topnav = document.querySelector('.topnav')
    const items = topnav.querySelectorAll('a[data-info]')

    items.forEach(link => {

        const customData = link.dataset.info;  // Get the custom data-info attribute

        const element = document.getElementById(customData);
        
        if (element) {
            updateOpacity(element);
            list.push(element);
        };
            
        link.addEventListener('click', function(event) {
            event.preventDefault();
            scrollToTarget(customData);
        })
    })

    setTimeout(async () => {
        const hello = document.getElementById('hello');
        const text = "Hello.";
        
        while (true) {
            for (i = 0; i <= text.length; i++) {
                hello.textContent = text.substring(0, i);
                await sleep(200);
            };
            await sleep(500);
            for (i = text.length; i >= 0; i--) {
                hello.textContent = text.substring(0, i);
                await sleep(200);
            };
        }
    }, 0);

    setInterval(updateClock, 1000);
    updateClock(); // call immediately to avoid delay
});

