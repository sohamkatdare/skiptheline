import $ from 'jquery'

let order = {
    'bread': '',
    'sauces': [],
    'cheeses': [],
    'meats': [],
    'veggies': []
}

$('#submitDeli').on('click', (e) => {
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

    console.log(order)
})