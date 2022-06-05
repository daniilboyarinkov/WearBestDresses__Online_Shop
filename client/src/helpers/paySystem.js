export const detectPaySystem = (number) => {
    let re = new RegExp('^4')
    if (number.match(re) != null) return 'visa'

    re = new RegExp('^(34|37)')
    if (number.match(re) != null) return 'amex'

    re = new RegExp('^5[1-5]')
    if (number.match(re) != null) return 'mastercard'

    re = new RegExp('^6011')
    if (number.match(re) != null) return 'discover'

    re = new RegExp('^9792')
    if (number.match(re) != null) return 'troy'

    return 'visa'
}
