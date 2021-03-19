
window.onload = function () {
    let hova = document.getElementById("ide");
    for (var s = 0; s < 1; s++) {
        let sor = document.createElement("div");
        sor.classList.add("sor");
        hova.appendChild(sor);

        for (var o = 0; o < 10; o++) {
            let szam = document.createElement("div");
            szam.classList.add("elem");
            sor.appendChild(szam);
            szam.style.background = `rgb(${255 - (255 / 10 * o)},0,0)`

        }
    }

    let where = document.getElementById("here");

    for (let row = 0; row < 10; row++) {
        let r = document.createElement("div");
        r.classList.add("row");
        where.appendChild(r);
        for (let col = 0; col < row; col++) {
            let c = document.createElement("div");
            var faktorialis = (n) => {
                if (n === 0 || n === 1) {
                    return 1;
                }
                else {
                    return n * faktorialis(n - 1);
                }
            }
            c.innerText =
                faktorialis(row) / (faktorialis(col) * faktorialis(row - col));
            c.classList.add("elem");
            r.appendChild(c);
        }
    }
}
