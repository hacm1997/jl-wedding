import Banner from "@/components/banner";
import Clothing from "@/components/clothing";
import Counter from "@/components/counter";
import PhotoUpload from "@/components/photo-upload";
import WaitingForYou from "@/components/waiting-for-you";
import { Suspense } from "react";
import { CeremonyLocation } from "../components/ceremony-location";
import { Confirmation } from "../components/confirmation";
import { MusicPlayer } from "../components/music-player";
import { TimelineSection } from "../components/timeline";
import { WEDDING_PLACE_IMAGE } from "./constants/place-images";

export default function Home() {
  return (
    <>
      <MusicPlayer />
      <Banner />
      <Counter />
      <Suspense
        fallback={
          <div className="bg-white flex flex-col items-center justify-center pt-10 pb-28 min-h-[400px]">
            <div className="text-sage-light text-lg">Cargando...</div>
          </div>
        }
      >
        <Confirmation />
      </Suspense>
      <CeremonyLocation venueImages={WEDDING_PLACE_IMAGE} />
      <Clothing />
      <TimelineSection />
      <PhotoUpload />
      <WaitingForYou />
    </>
  );
}
