import { useState, useEffect } from "react";

import { getTopArtists } from "../../spotify";
import { catchErrors } from "../../utils";
import {
  ArtistGrid,
  SectionWrapper,
  TimeRangeButtons,
  Loader,
} from "../../components";

import "./top-artists.styles.scss";

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState("long");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopArtists(`${activeRange}_term`);
      setTopArtists(data);
    };
    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <main>
      <SectionWrapper title="Top Artists" breadcrumb={true}>
        <TimeRangeButtons
          activeRange={activeRange}
          setActiveRange={setActiveRange}
        />

        {topArtists && topArtists.items ? (
          <ArtistGrid artists={topArtists.items} />
        ) : (
          <Loader />
        )}
      </SectionWrapper>
    </main>
  );
};

export default TopArtists;
