// @ts-nocheck
import TestText from "@/components/dom/TestText";
import dynamic from "next/dynamic";

const Box = dynamic(() => import("@/components/canvas/Box"), {
  ssr: false,
});

const DOM = () => {
  return <TestText />;
};

const R3F = () => {
  return (
    <>
      <Box route="/" />
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
      title: "Index",
    },
  };
}
