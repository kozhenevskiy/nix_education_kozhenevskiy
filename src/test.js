import { Calculator } from "./calculator.js";
import * as assert from 'assert';

describe("calculator test", function() {
    it("should be able to sum numbers", function() {
        let calc = new Calculator;
        assert.strictEqual(calc.sum(5, 10), 15);
    });

    it("should be able to deduct numbers", function() {
        let calc = new Calculator;
        assert.strictEqual(calc.deduct(10, 5), 5);
    });

    it("should be able to multiply numbers", function() {
        let calc = new Calculator;
        assert.strictEqual(calc.multiply(5, 10), 50);
    });

    it("should be able to division numbers", function() {
        let calc = new Calculator;
        assert.strictEqual(calc.division(10, 5), 2);
    });
});
