const sidebar=document.getElementById('sidebar');
const openBtn=document.getElementById('sidebar-open');
const closeBtn=document.getElementById('sidebar-close');
openBtn.addEventListener('click',()=>sidebar.classList.add('open'));
closeBtn.addEventListener('click',()=>sidebar.classList.remove('open'));