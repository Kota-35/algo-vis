import { Header } from '@/components/ui/header'
import { HeroContent } from '@/components/ui/here-content'
import { ShaderBackground } from '@/components/ui/shader-background'

export default function Home() {
  return (
    <ShaderBackground>
      <Header />
      <HeroContent />
    </ShaderBackground>
  )
}
