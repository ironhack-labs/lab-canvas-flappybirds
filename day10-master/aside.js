var Aside = {
    init: function () {
        var asideOpen = false;

        var asideButtonDOMEl = document.querySelector("#openClose")
        var asideDOMEl = document.querySelector("aside")
        var theRangeDOMEl = document.querySelector("#theRange")

        function onChangeHandler(e) {
            window.sepiaApplicationValue = +e.target.value
        }

        theRangeDOMEl.onchange = onChangeHandler
        // theRangeDOMEl2.onchange = onChangeHandler
        // theRangeDOMEl3.onchange = onChangeHandler

        asideButtonDOMEl.onclick = function () {
            asideOpen = !asideOpen;

            if (asideOpen) {
                asideButtonDOMEl.innerHTML = "open"
                asideButtonDOMEl.style.position = "relative"
                asideButtonDOMEl.style.left = "-100px"
                asideDOMEl.style.right = `-${asideDOMEl.offsetWidth}px`;
            } else {
                asideButtonDOMEl.innerHTML = "close"
                asideButtonDOMEl.style.left = "0"
                asideDOMEl.style.right = `0`;
            }
        }
    }
}
