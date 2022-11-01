if (document.body.classList.contains('logged-in')) {
    var searchInterval = setInterval(searchElement, 500);
    function stopSearch() {
        clearInterval(searchInterval);
    }

    function searchElement() {
        if (document.querySelector('.lion-loyalty-panel-sidebar__points-value')) {
            stopSearch();
            document.querySelectorAll('.reward__buttons .reward__button').forEach(button=>{
                button.addEventListener('click', function(e){
                    e.preventDefault();
                    const target = this.dataset.target;
                    const scrollPos = document.querySelector(`.${target}`).offsetTop;
                    $("html, body").animate({ scrollTop: scrollPos }, "slow");
                });
            });


            const points = document.querySelector('.lion-loyalty-panel-sidebar__points-value').textContent;
            const tierInfo = document.querySelector('.lion-loyalty-panel-sidebar__tier-info-name').textContent;
            document.getElementById('reward_points').textContent = points;
            document.getElementById('reward_tier').textContent = tierInfo;

            document.querySelector('.reward__account').style.display = 'block';
            const parentDiv = document.querySelector('.lion-account-history').parentNode;
            parentDiv.insertBefore(document.querySelector('.custom-rewards__tiers'), document.querySelector('.lion-account-history'));
        }
    }

    setTimeout(function(){
        stopSearch();
    },60000);
}