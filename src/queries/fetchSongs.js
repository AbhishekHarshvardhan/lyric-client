import { gql } from "@apollo/client";

export default gql`
  query fetchSongs {
    songs {
      id
      title
    }
  }
`;
