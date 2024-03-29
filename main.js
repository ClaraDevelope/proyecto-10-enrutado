import { Header } from './src/pages/home/header/header'
import './style.css'
// 'https://proyecto-10-claras-projects-939a82ac.vercel.app/api/v1/eventos/'
// 'https://proyecto-10-git-master-claras-projects-939a82ac.vercel.app/api/v1/eventos/'
const Main = () => {
  const app = document.querySelector('#app')
  app.innerHTML = `
      <header></header>
      <main></main>
      <footer></footer>
    `
}
Main()
Header()
