document.getElementById('menu-drawer__disclosure-button').addEventListener('click', function(){
    if (this.closest('.disclosure').classList.toString().indexOf('active') > -1) {
        this.closest('.disclosure').classList.remove('active');
    } else {
        this.closest('.disclosure').classList.add('active');
    }
});

for(var i = 0;i < document.getElementsByClassName('mega-menu').length;i++) {
    document.getElementsByClassName('mega-menu')[i].addEventListener('mouseenter', function(){
        this.setAttribute('open','');
        this.querySelectorAll('.header__menu-item')[0].setAttribute('aria-expanded', true);
        document.getElementById('over-back').classList.add('active');
    });
}

for(var i = 0;i < document.getElementsByClassName('mega-menu__content').length;i++) {
    document.getElementsByClassName('mega-menu__content')[i].addEventListener('mouseleave', function(e){
        setTimeout(() => {
            e.preventDefault();
            const openDetailsElement = e.target.closest('details[open]');
            if (!openDetailsElement) return;
    
            const summaryElement = openDetailsElement.querySelector('summary');
            openDetailsElement.removeAttribute('open');
            summaryElement.setAttribute('aria-expanded', false);
            document.getElementById('over-back').classList.remove('active');
          }, 50);
    });
}

for(var i = 0;i < document.getElementsByClassName('menu-drawer__menu-item--submenu-title').length;i++) {
    document.getElementsByClassName('menu-drawer__menu-item--submenu-title')[i].addEventListener('click', function(){
        this.closest('.menu-drawer__menu-item--submenu').classList.toggle('active');
    });
}