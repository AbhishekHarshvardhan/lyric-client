import React from "react";
import { useMutation } from "@apollo/client";
import ADD_LYRIC_TO_SONG from "../queries/addLyricToSong";
import FETCH_SONG from "../queries/fetchSong";

const InputBox = ({ song }) => {
  const { id, title, lyrics } = song;
  const [addLyrics] = useMutation(ADD_LYRIC_TO_SONG, {
    update(cache, { data: { addLyricToSong } }) {
      cache.writeQuery({
        query: FETCH_SONG,
        data: { song: addLyricToSong },
        variables: { id },
      });
    },
  });

  let input;

  const onFormSubmit = (e) => {
    e.preventDefault();
    addLyrics({
      variables: { songId: id, content: input.value },
      optimisticResponse: {
        __typename: "Mutation",
        addLyricToSong: {
          id,
          title,
          lyrics: [
            ...lyrics,
            { id: String(Math.random()), content: input.value },
          ],
        },
      },
    });
    input.value = "";
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="input-field col s6">
        <input
          required
          ref={(node) => {
            input = node;
          }}
          placeholder="Add a lyric"
          type="text"
          className="validate"
        />
      </div>
      <button className="btn btn-small">Submit</button>
    </form>
  );
};

export default InputBox;
