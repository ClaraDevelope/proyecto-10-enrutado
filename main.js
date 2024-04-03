import { HeaderRender } from './src/components/header/header'
import { Home } from './src/pages/home/main/home'
import { User } from './src/utils/variables'
import './style.css'
const Main = () => {
  const app = document.querySelector('#app')
  app.innerHTML = `
      <header></header>
      <main></main>
      <footer></footer>
    `
}
Main()
HeaderRender(User)
Home()
