import { Header, Hero, Highlights, Model, Features, Chip, Footer } from "./components"
import * as Sentry from "@sentry/react"

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Model />
        <Features />
        <Chip />
        <Footer />
      </main>
    </>
  )
}

export default Sentry.withProfiler(App)
