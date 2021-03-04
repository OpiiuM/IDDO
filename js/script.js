(function () {
    // header anchors
    const links = document.querySelectorAll(".header__link")

    // mobile menu
    const burger = document.querySelector(".burger")
    const menu = document.querySelector(".header__nav")

    // filter posts
    const btns = document.querySelectorAll(".portfolio__button")

    // add btn
    const adds = document.querySelector(".btn-add")
    const projects = document.querySelectorAll(".project")
    const cards = document.querySelectorAll(".card")

    // slider
    const toggles = document.querySelectorAll(".testimonial__toggle")
    const inputs = document.querySelectorAll(".skills__heading")


    // переход по якорям в header
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault()

            const href = this.getAttribute("href").substring(1)
            const scrollTarget = document.getElementById(href)
            const topOffset = 80
            const elementPosition = scrollTarget.getBoundingClientRect().top
            const offSetPosition = elementPosition - topOffset

            window.scrollBy({
                top: offSetPosition,
                behavior: "smooth",
            })

            // если экран меньше 768px
            if (window.innerWidth < 768) {
                menu.classList.toggle("active")
                burger.classList.toggle("burger--active")
            }
        })
    })


    // burger-button
    burger.addEventListener("click", function () {
        menu.classList.toggle("active")
        this.classList.toggle("burger--active")
    })


    // filter posts
    btns.forEach((btn, index) => {
        btn.onclick = () => {
            activateButton(index, "btn")
            const currentCategory = btn.dataset.filter
            filter(currentCategory, projects)
        }
    })

    function filter(category, items) {
        items.forEach(item => {
            const isItemFiltered = !item.classList.contains(category)
            const isShowAll = category.toLowerCase() === "all"

            if (isItemFiltered && !isShowAll) {
                item.classList.add("project--hide")
            } else {
                item.classList.remove("project--hide")
            }
        })
    }

    function activateButton(n, button) {
        for (let i = 0; i < btns.length; i++) {
            btns[i].className = btns[i].className.replace(`${button}--active`, "")
        }

        btns[n].className += ` ${button}--active`
    }

    activateButton(0, "btn")


    // adding posts
    // adds[0].addEventListener("click", function () {
    //     addingPosts(projects, "portfolio__project project project--hide", "project")
    //     this.style.display = "none"
    // })

    adds.addEventListener("click", function () {
        addingPosts(cards, "about__card card card--hide", "card")
        this.style.display = "none"
    })

    function addingPosts(posts, condition, toggleClass) {
        posts.forEach(item => {
            if (item.className === condition) {
                item.classList.remove(`${toggleClass}--hide`)
            }
        })
    }


    // slider
    toggles.forEach((toggle, index) => {
        toggle.onclick = () => showSlides(index + 1, "testimonial__slide", "testimonial__toggle", "flex")
    })

    // dropdown
    inputs.forEach((input, index) => {
        input.onclick = () => showSlides(index + 1, "skills__text", "skills__heading", "block")
    })

    function showSlides(n, slideName, spanName, display, child = false) {
        const slides = document.querySelectorAll(`.${slideName}`)
        const spans = document.querySelectorAll(`.${spanName}`)

        if (n > slides.length) n = 1
        if (n < 1) n = slides.length

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"
            spans[i].className = spans[i].className.replace(`${spanName}--active`, "")

            if (child) {
                slides[i].childNodes[0].className = slides[i].childNodes[0].className.replace(`${child}--active`, "")
            }
        }

        slides[n - 1].style.display = display
        spans[n - 1].className += ` ${spanName}--active`

        if (child) slides[n - 1].childNodes[0].className += ` ${child}--active`
    }

    showSlides(1, "testimonial__slide", "testimonial__toggle", "flex")
    showSlides(1, "skills__text", "skills__heading", "block")
}())