let contactSubject = document.getElementById('ContactFormSubject');
let contactForm = document.getElementById('CustomContactForm');
let dropdownList = document.querySelectorAll('.dropdown-select__menu li');
let dropdownButton = document.getElementsByClassName('dropdown-select__button')[0];
let subject = dropdownButton.textContent.trim();
let fields = document.getElementsByClassName('contact--field');

function clearDropdown() {
    for(var i = 0;i < dropdownList.length;i++) {
        dropdownList[i].classList.remove('active');
    }
}

for(var i = 0;i < dropdownList.length;i++) {
    dropdownList[i].addEventListener('click', function(e){
        e.stopPropagation();
        subject = this.getAttribute('rel');
        clearDropdown();
        this.classList.add('active');
        dropdownButton.textContent = subject;
        contactSubject.querySelectorAll(`option[value="${subject}"]`)[0].selected = 'selected';
    });
}

document.getElementsByClassName('dropdown-select')[0].addEventListener('click', function(e){
    e.stopPropagation();
});

document.body.addEventListener('click', function(){
    document.getElementsByClassName('dropdown-select__input')[0].checked = false;
});