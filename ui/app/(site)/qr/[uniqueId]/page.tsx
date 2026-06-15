import { notFound, redirect } from "next/navigation";
import { getQRCode } from "@/lib/api/qrCodes";
import { ApiError } from "@/lib/api/client";

type QRLandingPageProps = {
  params: Promise<{ uniqueId: string }>;
};

export default async function QRLandingPage({ params }: QRLandingPageProps) {
  const { uniqueId } = await params;
  let artworkId: string;

  try {
    const qrCode = await getQRCode(uniqueId);
    artworkId = qrCode.artwork_detail.artwork_id;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  redirect(`/artwork/${artworkId}`);
}
