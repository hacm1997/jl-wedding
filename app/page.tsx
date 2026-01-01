import Banner from "@/components/banner";
import Counter from "@/components/counter";
import { CeremonyLocation } from "../components/ceremony-location";
import PhotoGallery from "../components/photo-gallery";
import { WEDDING_PLACE_IMAGE } from "./constants/place-images";

export default function Home() {
  return (
    <>
      <Banner />
      <Counter />
      <CeremonyLocation venueImages={WEDDING_PLACE_IMAGE} />
      <PhotoGallery />
    </>
  );
}
