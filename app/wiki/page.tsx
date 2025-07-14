import { loadWildlifeDataFromCSV, riverPolygon, Species } from "@/data/data";
import WikiPage from "@/components/WikiPage";

export default async function Page() {
  const wildlifeData: Species[] = await loadWildlifeDataFromCSV();

  return <WikiPage wildlifeData={wildlifeData} riverPolygon={riverPolygon} />;
}
