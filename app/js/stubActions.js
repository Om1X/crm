function stub () {
    if (!document.getElementById('stubAct')) return;
    var input = document.getElementById('stubAct'),
        stubActBlock = document.getElementById('stubActBlock');

    function stubAct() {
        stubActBlock.classList.toggle('stubActBlock-active');
    }

    input.addEventListener('change', stubAct);
}

stub();