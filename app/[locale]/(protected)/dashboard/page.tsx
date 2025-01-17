import HasAuthorizationServer from "@/components/auth/HasAutorizationServer";
import IsForbidenServer from "@/components/auth/IsForbidenServer";
// import Pricing from "@/components/Pricing";
import ProductPage from "@/components/TestGeneration";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Pricing /> */}
      <HasAuthorizationServer plans={["Premium"]}>
        <div className="bg-red-500 p-4">This is a premium content</div>
      </HasAuthorizationServer>

      <ProductPage params={{ productName: "generate image" }} />

      <HasAuthorizationServer plans={["Basic plus"]}>
        <div className="bg-red-500 p-4">This is a basic plus content</div>
      </HasAuthorizationServer>

      <IsForbidenServer plans={["Premium"]}>
        <div className="bg-red-500 p-4">your have not the premium plan</div>
      </IsForbidenServer>
    </main>
  );
}
