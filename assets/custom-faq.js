const labels = document.querySelectorAll('.faq__question');
labels.forEach(label=>{
    label.addEventListener('click', function(){
        const _this = this;
        labels.forEach(item=>{
            if (_this != item) {
                item.previousElementSibling.checked = false;
            }
        });
    });
});