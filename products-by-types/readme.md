 С сервера приходит [JSON с товарами](products.json), их картинками и типами: скидки, промо или рекомендуемые.

Необходимо вывести эти товары по типам: сначала те, которые на распродаже (sale), потом те, которые участвуют в промо-акции (promo) и в рекомендуемые (recommended).

Для генерации разметки нужно использовать шаблонизатор `lodash`.
Для индикации ajax-pагрузки `$.fancybox.showLoading|hideLoading`.

Материалы по теме:
* [Массив: перебирающие методы](http://learn.javascript.ru/array-iteration)
* [Шаблонизатор LoDash](https://learn.javascript.ru/template-lodash)
