import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ELabelSuccess from '@/components/elabel/ELabelSuccess'

export default function ELabelSuccessPage() {
  return (
    <>
      <Header />
      <main className="pt-14 min-h-screen bg-bg">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <ELabelSuccess />
        </div>
      </main>
      <Footer />
    </>
  )
}
