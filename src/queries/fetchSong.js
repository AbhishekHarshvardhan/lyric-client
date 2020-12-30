import { gql } from "@apollo/client";

const FETCH_SONG = gql`
  query FetchSong($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
      }
    }
  }
`;

export default FETCH_SONG;
