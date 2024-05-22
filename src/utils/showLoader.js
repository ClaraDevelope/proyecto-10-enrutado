export const showLoader = (parentElement) => {
  const loader = document.createElement('div')
  loader.className = 'loader'
  const loaderImg = document.createElement('img')
  loaderImg.src =
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWZueTR0bWJka3loMzByaGJzOTdndDJnOG95eHRranU5a2V6dHBoZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/iJIqVpSHvF3S9C2JV3/giphy.gif'
  loaderImg.alt = 'Cargando...'
  loaderImg.loading = 'lazy'
  loader.appendChild(loaderImg)
  parentElement.appendChild(loader)
}
