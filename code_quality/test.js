describe("pow", function () {

    // instead of writing it blocks manually we can generate them with a foor loop.

    describe("raises x to power 3", function () {

        function makeTest(x) {
            let expected = x * x * x;

            it(`${x} in the power 3 is ${expected}`, function () {
                assert.equal(pow(x, 3), expected);
            });
        }

        for (let x = 0; x <= 5; x++) {
            makeTest(x);
        }

    });

    it("for negative n the result is NaN", function () {
        assert.isNaN(pow(2, -1));
    });

    it("for non-integer n the result is NaN", function () {
        assert.isNaN(pow(2, 1.5));
    });

    // ... more tests to follow here, both describe and it can be added.


});