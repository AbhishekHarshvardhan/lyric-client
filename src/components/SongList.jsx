import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import fetchSongs from "../queries/fetchSongs";
import DELETE_SONG from "../queries/deleteSong";

const SongList = () => {
  const { data, loading, error } = useQuery(fetchSongs);
  const [deleteSong] = useMutation(DELETE_SONG);

  const onDeleteClick = (id) => {
    deleteSong({
      variables: { id },
      update: function (cache) {
        cache.modify({
          fields: {
            songs: function (songs, { readField }) {
              // return songs.filter((s) => s.id !== id);
              return songs.filter((taskRef) => id !== readField("id", taskRef));
            },
          },
        });
      },
      optimisticResponse: {
        __typename: "Mutation",
        deleteSong: { id: null, title: null, __typename: "SongType" },
      },
    });
  };

  if (loading) return null;
  if (error) return alert(error);

  return (
    <div>
      {!data.songs.length && <p>There are no songs</p>}
      <ul className="collection">
        {data.songs.map((song) => (
          <li className="collection-item" key={song.id}>
            <Link to={`/songs/${song.id}`}>{song.title}</Link>
            <i
              onClick={() => onDeleteClick(song.id)}
              className="material-icons pointer right"
            >
              cancel
            </i>
          </li>
        ))}
      </ul>
      <Link to="/songs/new" className="btn-floating right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default SongList;
