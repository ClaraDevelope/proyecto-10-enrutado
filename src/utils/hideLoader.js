export const hideLoader = (element) => {
  const loader = element.querySelector('.loader')
  if (loader) {
    loader.remove()
  }
}
