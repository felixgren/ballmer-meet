import dynamic from 'next/dynamic'
// Step 5 - delete Instructions components
import Instructions from '@/components/dom/Instructions'

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})


// dom components goes here
// we can benefit from putting any of multiple dom components here, basically reusable yeah!
const DOM = () => {
  return (
    // Step 5 - delete Instructions components
    <Instructions />
  )
}

// canvas components goes here
// shader contains its own box
const R3F = () => {
  return (
    <>
      <Box route='/box' />
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
