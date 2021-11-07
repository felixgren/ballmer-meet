// @ts-nocheck
import dynamic from "next/dynamic";
import TestText from "@/components/dom/TestText";

// Dynamic import is used to prevent r3f adding big initial JS load.
// WARNING ! errors might get obfuscated w/ dynamic import. If error, go back to static.
// https://github.com/pmndrs/react-three-next/issues/49
const Box = dynamic(() => import("@/components/canvas/Box"), {
  ssr: false,
});
// import Box from '@/components/canvas/Box'

const DOM = () => {
  return (
    <TestText />
  );
};

const R3F = () => {
  return (
    <>
      <Box route="/box" />
    </>
  );
};

const Page = () => {
  return (
    <>
      <DOM />
      <R3F r3f />
    </>
  );
};

export default Page;

export async function getStaticProps() {
  return {
    props: {
      title: "index",
    },
  };
}
