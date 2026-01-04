import Banner from "@/components/banner";
import Counter from "@/components/counter";
import { CeremonyLocation } from "../components/ceremony-location";
import PhotoGallery from "../components/photo-gallery";
import { WEDDING_PLACE_IMAGE } from "./constants/place-images";
import Clothing from "@/components/clothing";
import PhotoUpload from "@/components/photo-upload";
import Confirmation from "@/components/confirmation";
import WaitingForYou from "@/components/waiting-for-you";

export default function Home() {
  return (
    <>
      <Banner />
      <Counter />
      <CeremonyLocation venueImages={WEDDING_PLACE_IMAGE} />
      <Clothing />
      <PhotoGallery />
      <PhotoUpload />
      <Confirmation />
      <WaitingForYou />
    </>
  );
}
