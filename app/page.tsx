import Banner from "@/components/banner";
import Counter from "@/components/counter";
import { CeremonyLocation } from "../components/ceremony-location";
import PhotoGallery from "../components/photo-gallery";
import { WEDDING_PLACE_IMAGE } from "./constants/place-images";
import Clothing from "@/components/clothing";
import PhotoUpload from "@/components/photo-upload";
import WaitingForYou from "@/components/waiting-for-you";
import { Confirmation } from "../components/confirmation";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Banner />
      <Counter />
      <CeremonyLocation venueImages={WEDDING_PLACE_IMAGE} />
      <Clothing />
      <PhotoGallery />
      <PhotoUpload />
      <Suspense fallback={<div className="bg-white flex flex-col items-center justify-center pt-10 pb-28 min-h-[400px]">
        <div className="text-sage-light text-lg">Cargando...</div>
      </div>}>
        <Confirmation />
      </Suspense>
      <WaitingForYou />
    </>
  );
}
