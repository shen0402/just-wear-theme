const showWhatIsVisible = (element)=>{
  let elementRect = element.getBoundingClientRect();
  let theTop = -200;
  if(elementRect.top - window.innerHeight < theTop){
    return true;
  }else{
    return false;
  }
}

const showSectionElement_WhenInView = ()=>{
  document.querySelectorAll('.animation-mode').forEach(item=>{
    if(showWhatIsVisible(item)){
      item.classList.add('come-in')
    }
  });
}

document.querySelectorAll('.animation-mode').forEach(item=>{
  if(showWhatIsVisible(item)){
    item.classList.add('come-in')
  }
});

document.addEventListener('scroll', showSectionElement_WhenInView);

var disclosureButtons = document.querySelectorAll('.disclosure__button');
var disclosureList = document.querySelectorAll('.disclosure__list-wrapper');

document.body.addEventListener('click', function(){
  document.querySelectorAll('.disclosure__button').forEach(item=>{
    item.setAttribute('aria-expanded', false);
  });
  document.querySelectorAll('.disclosure__list-wrapper').forEach(item=>{
    item.setAttribute('hidden', false);
  });
  document.querySelectorAll('[name="package-info"]').forEach(item => {
    item.checked = false;
  });
});

document.querySelectorAll('.disclosure__button').forEach(item=>{
  item.addEventListener('click', function(e){
    e.stopPropagation();
  });
});

document.querySelectorAll('.trigger-chat-box').forEach(item=>{
  item.addEventListener('click', function(e){
    e.preventDefault();
    GorgiasChat.open();
  })
});

document.querySelectorAll('.icon-info').forEach(item => {
  item.addEventListener('click', function(e){
      e.stopPropagation();
  });
});