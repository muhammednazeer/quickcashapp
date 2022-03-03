function currencyConverter(from, to, amount) {
    const rates = {
        NGN: 0.0024,
        EUR: 0.90,
        USD: 1.0
    };
    let amt = Number(amount);
    let conversion = 0;
    if (from == 'USD' && to == 'EUR') {
        conversion = amt * rates.EUR;

    } else if (from == 'EUR' && to == 'USD') {
        conversion = amt / rates.EUR;
    }
     else if (from == 'USD' && to == 'NGN') {
        conversion = amt / rates.NGN;

    } else if (from == 'NGN' && to == 'USD') {
        conversion = amt * rates.NGN;
    }
    else if (from == 'EUR' && to == 'NGN') {
        conversion = amt / rates.NGN;

    } else if (from == 'NGN' && to == 'EUR') {
        conversion = amt * rates.NGN;
    }

    return conversion;
}

module.exports = currencyConverter;