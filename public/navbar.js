let navBar = document.querySelector('#navbar')
console.log(navBar)
console.log(navBar.style)



window.addEventListener('scroll',()=>{
  
  if (window.scrollY>55) {
    console.log(window.scrollY)
    navBar.style.backgroundColor= 'rgba(1,130,130,0.5)'
  }
  else{
    navBar.style.backgroundColor= 'rgba(0,0,0,0)'

  }

})