import Currency from 'currency.js'

export const useCurrency = () => {
    const format = (number: number) => {
        return Currency(number).format()
    }

    return {
        format
    }
}