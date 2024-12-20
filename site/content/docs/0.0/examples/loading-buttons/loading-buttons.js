(() => {
  'use strict'
  // Indeterminate loading time
  const statusMessage = document.querySelector('#update1')
  const loadingButton = document.querySelector('#load1')
  let updateStatusMessageCall
  loadingButton.addEventListener('click', () => {
    // Change button's look by adding a loading icon and disable it
    loadingButton.classList.add('loading-indeterminate')
    loadingButton.setAttribute('disabled', '')
    // Update indeterminate loading status every 3 seconds
    statusMessage.innerHTML = 'Downloading file 1'
    updateStatusMessageCall = setInterval(() => {
      statusMessage.innerHTML = `${statusMessage.innerHTML}.`
    }, 3000)
    // stop loading after 10 secondes for this demo
    setTimeout(() => {
      clearTimeout(updateStatusMessageCall)
      statusMessage.innerHTML = 'End of downloading file 1'
      loadingButton.classList.remove('loading-indeterminate')
      loadingButton.removeAttribute('disabled')
    }, 10000)
  })

  // Bootstrap compatibility for indeterminate loading time
  const statusMessage3 = document.querySelector('#update3')
  const loadingButton3 = document.querySelector('#load3')
  let updateStatusMessageCall3
  loadingButton3.addEventListener('click', () => {
    // Change button's look by adding a loading icon and disable it
    loadingButton3.setAttribute('disabled', '')
    loadingButton3.innerHTML += '<span class="loader-indeterminate-span" id="loader3" aria-hidden="true"></span>'
    // Update indeterminate loading status every 3 seconds
    statusMessage3.innerHTML = 'Downloading file 3'
    updateStatusMessageCall3 = setInterval(() => {
      statusMessage3.innerHTML = `${statusMessage3.innerHTML}.`
    }, 3000)
    // stop loading after 10 secondes for this demo
    setTimeout(() => {
      clearTimeout(updateStatusMessageCall3)
      statusMessage3.innerHTML = 'End of downloading file 3'
      const span3 = document.querySelector('#loader3')
      span3.remove()
      loadingButton3.removeAttribute('disabled')
    }, 10000)
  })

  // Determinate loading time
  const statusMessage2 = document.querySelector('#update2')
  const loadingButton2 = document.querySelector('#load2')
  const loadingTime = getComputedStyle(loadingButton2).getPropertyValue('--bs-button-loading-time')
  let updateStatusMessageCall2
  const interval = 3000
  loadingButton2.addEventListener('click', () => {
    let counter = 0
    // Change button's look by adding a loading icon and disable it
    loadingButton2.classList.add('loading-determinate')
    loadingButton2.setAttribute('disabled', '')
    // Update indeterminate loading status every 3 seconds
    statusMessage2.innerHTML = 'Downloading file 2 0%'
    updateStatusMessageCall2 = setInterval(() => {
      counter++
      const percentTime = counter * interval / 100
      statusMessage2.innerHTML = `File 2: ${percentTime}%`
    }, interval)
    // stop loading after 10 secondes for this demo
    setTimeout(() => {
      clearTimeout(updateStatusMessageCall2)
      statusMessage2.innerHTML = 'End of downloading file 2'
      loadingButton2.classList.remove('loading-determinate')
      loadingButton2.removeAttribute('disabled')
    }, (loadingTime * 1000))
  })
})()
