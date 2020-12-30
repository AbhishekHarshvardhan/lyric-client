import React from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_SONG = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

const SongForm = ({ history }) => {
  let input;
  const [addSong] = useMutation(ADD_SONG, {
    update: function (cache, { data: { addSong } }) {
      cache.modify({
        fields: {
          songs: function (songs) {
            return [...songs, addSong];
          },
        },
      });
    },
  });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    addSong({
      variables: { title: input.value },
      optimisticResponse: {
        __typename: "Mutation",
        addSong: {
          id: String(Math.floor(Math.random() * 1000)),
          title: input.value,
          __typename: "SongType",
        },
      },
    });
    history.push("/");
  };

  return (
    <form onSubmit={onFormSubmit}>
      <br />
      <br />
      <div className="input-field col s6">
        <input
          required
          ref={(node) => {
            input = node;
          }}
          placeholder="Add a song"
          type="text"
          className="validate"
        />
      </div>
      <button className="btn btn-small">Submit</button>
    </form>
  );
};

export default SongForm;
