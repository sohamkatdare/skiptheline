let order = {
    'bread': '',
    'sauces': [],
    'cheeses': [],
    'meats': [],
    'veggies': []
}

document.getElementById('submitDeli').onclick = (e) => {
    e.preventDefault()
    let bread = document.querySelector("form[name='main'] input[name='bread']:checked").value
    console.log(bread)
    let sauce = document.querySelector("form[name='main'] input[name='sauce']:checked").value
    let cheese = document.querySelector("form[name='main'] input[name='cheese']:checked").value
    let meat = document.querySelector("form[name='main'] input[name='meat']:checked").value
    let veggie = document.querySelector("form[name='main'] input[name='veggie']:checked").value
    order.bread = bread
    order.sauces.push(sauce)
    order.cheeses.push(cheese)
    order.meats.push(meat)
    order.veggies.push(veggie)
    console.log(order)
}