import React from "react";
import { useQuery } from "@apollo/client";
import FETCH_SONG from "../queries/fetchSong";
import InputBox from "./InputBox";

const SongDetail = ({
  match: {
    params: { id },
  },
}) => {
  const { data, loading, error } = useQuery(FETCH_SONG, { variables: { id } });

  if (loading) return <h6>Loading...</h6>;
  if (error) return alert(error);

  return (
    <div>
      <h5>{data.song.title}</h5>
      {!data.song.lyrics.length && <p>There are no lyrics to the song.</p>}
      <ul className="collection">
        {data.song.lyrics.map((lyric) => (
          <li className="collection-item" key={lyric.id}>
            {lyric.content}
          </li>
        ))}
      </ul>
      <InputBox song={data.song} />
    </div>
  );
};

export default SongDetail;
