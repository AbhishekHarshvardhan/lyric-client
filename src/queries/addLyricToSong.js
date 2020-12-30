import { gql } from "@apollo/client";

const ADD_LYRIC_TO_SONG = gql`
  mutation AddLyricToSong($songId: ID, $content: String) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      title
      lyrics {
        id
        content
      }
    }
  }
`;

export default ADD_LYRIC_TO_SONG;
