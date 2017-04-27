function optionsRender(id) {
    var select = document.getElementById(id),
        options,
        parentBlock = select.parentNode,
        optionsBlock = document.createElement('div'),
        ul = document.createElement('ul');

    // Click on dropdown
    function dropdown() {
        var ul = this.children[0];
        ul.classList.toggle('dropdownList-visible');

        if (event.target !== this) {

            for (var i = 0; i < ul.children.length; i++) {
                select.getElementsByTagName('option')[i].removeAttribute('selected');
                if (ul.children[i] === event.target) {
                    select.getElementsByTagName('option')[i].setAttribute('selected', 'selected');
                    optionsBlock.innerHTML = select.children[i].innerText + defaultHTML;
                    optionsBlock.children[0].children[i].classList.add('selected');
                }
            }
        }

    }

    select.style.display = 'none';
    optionsBlock.id = 'optionsBlock';
    ul.id = 'dropdownList';
    ul.className = 'dropdownList';
    parentBlock.appendChild(optionsBlock);
    optionsBlock.appendChild(ul);
    optionsBlock.className = 'dropdown';
    // костыль
    if (id === 'legalEntity') optionsBlock.classList.add('dropdown-ok');
    // --
    optionsBlock.tabIndex = 0;
    optionsBlock.addEventListener('click', dropdown);
    options = select.children;

    for (var key in options) {
        if (key < options.length) {
            var newOption = document.createElement('li');
            newOption.innerText = options[key].innerText.replace(/\n/g, '');
            ul.appendChild(newOption);
        }
    }

    var defaultHTML = optionsBlock.innerHTML;
}

optionsRender('contract');
optionsRender('legalEntity');

// optionRender('direction');