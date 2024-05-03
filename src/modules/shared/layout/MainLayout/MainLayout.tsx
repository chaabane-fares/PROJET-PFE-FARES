import Header from '../../components/Header'
import Stars from '../../components/Stars'
import UniverseWrapper from '../UniverseWrapper'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <UniverseWrapper>
      <div className="main-layout">
        <Header />
        <Stars />
        {children}
        {/* <Canvas /> */}
      </div>
    </UniverseWrapper>
  )
}

export default MainLayout
