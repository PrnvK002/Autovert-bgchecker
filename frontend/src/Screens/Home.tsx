import BackgroundVerification from "./BackgroundVerification";
import Themeprovider from "../Provider/Themeprovider";

export default function Home() {
  return (
    <>
      <Themeprovider>
        <BackgroundVerification />
      </Themeprovider>
    </>
  );
}
