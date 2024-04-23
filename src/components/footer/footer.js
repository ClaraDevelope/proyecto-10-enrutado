import './footer.css'
export const Footer = () => {
  const footer = document.querySelector('footer')
  const pFooter = document.createElement('p')
  pFooter.innerText = 'Creado por Clara Manzano Corona 💟 {RockTheCode}'
  footer.appendChild(pFooter)
}
