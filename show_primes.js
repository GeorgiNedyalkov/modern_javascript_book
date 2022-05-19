function showPrimes(n) {
    for (let i = 0; i < n; i++) {
        if (!isPrime(i)) continue;

        console.log(i);
    }
}

function isPrime(n) {
    for (let i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }

    return true;
}

showPrimes(100);


function showPrimesBad(n) {
    nextPrime:
    for (let i = 2; i < n; i++) {

        // check if i is a prime number
        for (let j = 2; j < i; j++) {
            if (i % j == 0) continue nextPrime;
        }

        alert(i);
    }
}