/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
   // @TODO: Расчет выручки от операции
}

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
    // @TODO: Расчет бонуса от позиции в рейтинге
}

/**
 * Функция для анализа данных продаж
 * @param data
 * @param options
 * @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
 */
function analyzeSalesData(data, options) {
    // @TODO: Проверка входных данных

    // @TODO: Проверка наличия опций

    // @TODO: Подготовка промежуточных данных для сбора статистики

    // @TODO: Индексация продавцов и товаров для быстрого доступа

    // @TODO: Расчет выручки и прибыли для каждого продавца

    // @TODO: Сортировка продавцов по прибыли

    // @TODO: Назначение премий на основе ранжирования

    // @TODO: Подготовка итоговой коллекции с нужными полями
}


/**
* Функция для анализа данных продаж
* @param data
* @param options
* @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
*/
function analyzeSalesData(data, options) {

    // Проверка входных данных
    dataValidation(data);

    // Проверка наличия опций
/* if (typeof options != "object" || typeof calculateRevenue != "function") {
    throw new Error('Чего-то не хватает в options функции analyzeSalesData');
    }*/



    // Подготовка промежуточных данных для сбора статистики
    const sellerStats = data.sellers.map(seller => {
        return {
            'id': seller.id, // Строка, идентификатор продавца
            'name': `${seller.first_name} ${seller.last_name}`, // Строка, имя продавца
            'revenue': 0.00, // Число с двумя знаками после точки, выручка продавца
            'profit': 0.00, // Число с двумя знаками после точки, прибыль продавца
            'sales_count': 0, // Целое число, количество продаж продавца
            'products_sold': {}
        };
    }); 
// console.table(sellerStats);



    // Индексация продавцов для быстрого доступа
    // Ключ - id, значение — запись из sellerStats
    const sellerIndex = sellerStats.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    },{});
// console.log(sellerIndex);


    // Индексация товаров для быстрого доступа
    // Ключом будет sku, значением — запись из data.products
    const productIndex = data.products.reduce((acc, item) => {
        acc[item.sku] = item;
        return acc;
    },{});
// console.log(productIndex);



    // @TODO: Расчет выручки и прибыли для каждого продавца
    data.purchase_records.forEach(record => {
        const seller = sellerIndex[record.id];
        seller.sales_count += 1;
        seller.revenue += record.total_amount;

        // Расчёт прибыли для каждого товара
        record.items.forEach(item => {
            const product = productIndex[item.sku]; // Товар

            // Cебестоимость (cost) товара как product.purchase_price, умноженную на количество товаров из чека

            const cost = 12;

            // Посчитать выручку (revenue) с учётом скидки через функцию calculateRevenue

            // Посчитать прибыль: выручка минус себестоимость

            // Увеличить общую накопленную прибыль (profit) у продавца



            // Учёт количества проданных товаров
            if (!seller.products_sold[item.sku]) {
                seller.products_sold[item.sku] = 0;
            }

            // По артикулу товара увеличить его проданное количество у продавца

        });
    }); 



    // @TODO: Сортировка продавцов по прибыли

    // @TODO: Назначение премий на основе ранжирования

    // @TODO: Подготовка итоговой коллекции с нужными полями

    console.log('лох');
}