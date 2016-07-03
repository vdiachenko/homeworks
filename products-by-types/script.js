/*
 Задача: С сервера пришел следующий массив с товарами, их картинками и типами.
 Вам нужно вывести эти товары по типам: сначала те, которые на распродаже (sale), потом те, которые участвуют в промо-акции (promo)
 и в конце рекомендуемые (recommended).

 Для вывода нужно использовать шаблонизатор lodash.template.

 Материалы по теме:
 http://learn.javascript.ru/array-iteration
 https://learn.javascript.ru/template-lodash
 */
// Написать так: sale = promo = recommended = []; и спросить, почему ошибка (ссылка на один и тот же массив)


$.ajax({
    url: 'products.json'
}).done(function (products) {
    var sale = [],
        promo = [],
        recommended = [];

    products.forEach(function (product, index) {
        if (product.type === 'sale') {
            sale.push(product);
        } else if (product.type === 'promo') {
            promo.push(product);
        } else if (product.type === 'recommended') {
            recommended.push(product);
        }
    });

    var productTypes = ['sale', 'promo', 'recommended'];
    var productsByType = [];

    productTypes.forEach(function (type) {
        productsByType[type] = products.filter(function (product) {
            return product.type === type;
        });
    });

    var tmpl = _.template(document.getElementById('productTemplate').innerHTML);
    console.log(productsByType['sale']);
    var html = tmpl({items: productsByType['sale']});

    document.getElementById('sale').innerHTML = html;


});


