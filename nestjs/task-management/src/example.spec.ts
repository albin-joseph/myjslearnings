const addNumbers = (num1, num2) => {
    return num1 + num2
}

describe('Example test', () => {
    it('equals is true', () => {
        expect(true).toEqual(true)
    })
})

describe('Add Two Numbers', () => {
    it('adds two numbers', () => {
        expect(addNumbers(2,2)).toEqual(4)
    })
})