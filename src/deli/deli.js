import $ from 'jquery'
let order;


$('#submitDeli').on('click', (e) => {
    order = {
        'bread': '',
        'sauces': [],
        'cheeses': [],
        'meats': [],
        'veggies': [],
        'grilled': true,
        'chips': false,
        'price': 0,
    }
    
    order.bread = $("form[name='main'] input[name='bread']:checked").val()
    $("form[name='main'] input[name='sauce']:checked").each((i, item) => {
        order.sauces.push(item.value)
    })
    $("form[name='main'] input[name='cheese']:checked").each((i, item) => {
        order.cheeses.push(item.value)
    })
    $("form[name='main'] input[name='meat']:checked").each((i, item) => {
        order.meats.push(item.value)
    })
    $("form[name='main'] input[name='veggie']:checked").each((i, item) => {
        order.veggies.push(item.value)
    })

    order.grilled = document.querySelector("form[name='main'] input[name='grill']").checked
    order.chips = document.querySelector("form[name='main'] input[name='chips']").checked
    order.price = calculatePrice()

    console.log(order)
})

function calculatePrice() {
    const form = document.querySelector("form[name='main']")
    let bread = form.querySelector("input[name='bread']:checked")
    let cheeseValues = []
    $("form[name='main'] input[name='cheese']:checked").each((i, item) => {
        cheeseValues.push(formatItemValue(item.value))
    })
    let meatValues = []
    $("form[name='main'] input[name='meat']:checked").each((i, item) => {
        meatValues.push(formatItemValue(item.value))
    })
    let breadValue = bread == null ? '' : formatItemValue(bread.value)

    let price = 0;

    if (breadValue == 'Panini') {
        price += 4.85;
    } else {
        price += 4.15;
    }

    if(cheeseValues.length > 1) {
        price += 0.5 * (cheeseValues.length - 1);
    }
    if(meatValues.length > 1) {
        price += 0.5 * (meatValues.length - 1);
    }

    return price;
}

function updatePrice() {
    let price = calculatePrice();
    document.getElementById('price').textContent = '$' + price;
}

let cheeseBadges = document.querySelectorAll('.cheese')
let cheeseInputs = document.querySelectorAll("form[name='main'] input[name='cheese']")
let meatBadges = document.querySelectorAll('.meat')
let meatInputs = document.querySelectorAll("form[name='main'] input[name='meat']")

let meatInputChecked = [];
let cheeseInputChecked = [];

const navbar = document.querySelector("nav");
const spot = document.querySelector(".spot");

const footer = document.querySelector("footer");
const footerSpot = document.querySelector(".footer-spot");

window.onload = () => {
    // Navbar
    const options = {
        root: null,
        rootMargin: "0px",
        threshhold: 0,
    };

    // initialize and start the observer.
    
    const handleScroll = (entries) => {
        const spotIsVisble = entries[0].isIntersecting;
        if (spotIsVisble) {
            navbar.classList.remove("drop-shadow-xl");
            navbar.classList.remove("shadow-xl");
        } else {
            navbar.classList.add("drop-shadow-xl");
            navbar.classList.add("shadow-xl");
        }
    }
    const observer = new IntersectionObserver(handleScroll, options);
    observer.observe(spot);

    // Footer
    const handleFooterScroll = (entries) => {
        const spotIsVisble = !entries[0].isIntersecting;
        if (spotIsVisble) {
            navbar.classList.remove("shadow-up");
        } else {
            navbar.classList.add("shadow-up");
        }
    }
    const footerObserver = new IntersectionObserver(handleFooterScroll, options);
    footerObserver.observe(footerSpot);



    // Cheese
    for (let i = 0; i < cheeseInputs.length; i++) {
        const input = cheeseInputs[i];
        cheeseInputChecked.push(input.checked)
        input.addEventListener("change", (e) => {
            cheeseInputChecked[i] = e.target.checked
            cheeseBadges.forEach((badge) => {
                const label = badge.parentElement.parentElement.parentElement;
                const input = label.previousElementSibling;
                const match = formatItemName(label.textContent) == formatItemValue(e.target.value)
                if (flattenBooleanArray(cheeseInputChecked)) {
                    if (!match && !label.previousElementSibling.checked) {
                        badge.classList.remove("hidden");
                    }
                } else {
                    badge.classList.add("hidden");
                }
            })
        })
    }

    // Meat
    for (let i = 0; i < meatInputs.length; i++) {
        let input = meatInputs[i];
        meatInputChecked.push(input.checked)
        input.addEventListener("change", (e) => {
            // console.log(formatItemValue(e.target.value))
            // console.log("checked")
            meatInputChecked[i] = e.target.checked
            meatBadges.forEach((badge) => {
                const label = badge.parentElement.parentElement.parentElement;
                const input = label.previousElementSibling;

                const match = formatItemName(label.textContent) == formatItemValue(e.target.value)
                if (flattenBooleanArray(meatInputChecked)) {
                    
                    if (!match && !label.previousElementSibling.checked) {
                        badge.classList.remove("hidden");
                    }
                } else {
                    badge.classList.add("hidden");
                }
            })
            
        })
    }


    const inputs = document.querySelectorAll("form[name='main'] input");
    inputs.forEach((input) => {
        input.addEventListener("change", (e) => {
            updatePrice();
        })
    })

}

function formatItemValue(itemName) {
    let formatted = itemName.replace(/_/g, " ").replace(" ", "").replace(/([a-z])([A-Z])/g, '$1 $2')
    // console.log(formatted)
    return formatted
}

function formatItemName(itemName) {
    let formatted =  itemName.replace(/^\s+\+\$[\d.]+\s+/gm, '').replace(/([a-z])([A-Z])/g, '$1 $2').trim();
    // console.log(formatted)
    return formatted;

}

function flattenBooleanArray(array) {
    // if any values are true, then true, otherwise false
    return array.reduce((a, b) => a || b)
}