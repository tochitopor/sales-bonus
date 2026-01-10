/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
   const discount = 1 - purchase.discount / 100; // % -> десятичное значение
   return purchase.sale_price * purchase.quantity * discount;
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
    /*
        15% — для продавца, который принёс наибольшую прибыль.
        10% — для продавцов, которые по прибыли находятся на втором и третьем месте.
        5% — для всех остальных продавцов, кроме самого последнего.
        0% — для продавца на последнем месте.
    */
}

/**
 * Функция для проверки валидности входящих данных
 * @param data коллекция входящих данных
 */
function dataValidation(data) {
    if (!data
        || typeof data != 'object'
        || data.length === 0
        || !Array.isArray(data.customers)
        || data.customers.length === 0
        || !Array.isArray(data.products)
        || data.products.length === 0
        || !Array.isArray(data.sellers)
        || data.sellers.length === 0
        || !Array.isArray(data.purchase_records)
        || data.purchase_records.length === 0
    ) {
        throw new Error('Некорректные входные данные');
    } 
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
    const { calculateRevenue, calculateBonus } = options; 
    if (typeof options != "object" 
        || typeof calculateRevenue != "function" 
        || typeof calculateBonus != "function") {
        throw new Error('Чего-то не хватает в options функции analyzeSalesData');
    }

    // Подготовка промежуточных данных для сбора статистики
    const sellerStats = data.sellers.map(seller => {
        return {
            'id': seller.id, // Строка, идентификатор продавца
            'name': `${seller.first_name} ${seller.last_name}`, // Строка, имя продавца
            'revenue': 0.00, // Число с двумя знаками после точки, выручка продавца
            'profit': 0.00, // Число с двумя знаками после точки, прибыль продавца
            'sales_count': 0, // Целое число, количество продаж продавца
            'products_sold': {} // ключ - артикул товара, значение - количество
        };
    }); 

//   console.table(sellerStats);

    // Индексация продавцов и товаров для быстрого доступа

    // Ключ - id, значение — запись из sellerStats
    const sellerIndex = sellerStats.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    },{});
//    console.log(`sellerIndex`, sellerIndex);

    // Ключом будет sku, значением — запись из data.products 
    const productIndex = data.products.reduce((acc, item) => {
        acc[item.sku] = item;
        return acc;
    },{});
//    console.log(`productIndex`, productIndex);

    // Расчет выручки и прибыли для каждого продавца
    data.purchase_records.forEach(record => {
        const seller = sellerIndex[record.seller_id];
        // Увеличить количество продаж 
        seller.sales_count += 1;
        // Увеличить общую сумму выручки всех продаж
        seller.revenue += record.total_amount;

        // Расчёт прибыли для каждого товара
        record.items.forEach(item => {
            const product = productIndex[item.sku]; // Товар
            // Cебестоимость (cost) товара как product.purchase_price, умноженную на количество товаров из чека
            const cost = product.purchase_price * item.quantity;
            // Посчитать выручку (revenue) с учётом скидки через функцию calculateRevenue
            const revenue = calculateRevenue(item, product); 
            // Посчитать прибыль: выручка минус себестоимость
            const profit = revenue - cost;
            // Увеличить общую накопленную прибыль (profit) у продавца  
            seller.profit += profit;

            // Учёт количества проданных товаров
            if (!seller.products_sold[item.sku]) {
                seller.products_sold[item.sku] = 0;
            }
            // По артикулу товара увеличить его проданное количество у продавца
            seller.products_sold[item.sku] += item.quantity;
        });
    }); 

//    console.log(`sellerIndex2`, sellerIndex);

    // @TODO: Сортировка продавцов по прибыли

    // @TODO: Назначение премий на основе ранжирования

    // @TODO: Подготовка итоговой коллекции с нужными полями

    console.log('лох');
}
