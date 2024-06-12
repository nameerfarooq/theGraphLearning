import React, { useEffect, useState } from "react";
import { createClient } from "urql";
function App() {
  const [tokens, setTokens] = useState([]);
  const queryURL =
    "https://gateway-arbitrum.network.thegraph.com/api/59cbcf4cbc25bafba47664d7fe5c3710/subgraphs/id/HUZDsRpEVP2AvzDCyzDHtdc64dyDxx8FQjzsmqSg4H3B";
  const query = `{
  tokens(first: 5) {
    id
    name
    symbol
  }
}`;
  const client = createClient({
    url: queryURL,
  });
  useEffect(() => {
    const getTokens = async () => {
      const { data } = await client.query(query).toPromise();
      setTokens(data.tokens);
      console.log(data.tokens);
    };
    getTokens();
  }, []);
  return (
    <div>
      <h2>Tokens Information</h2>
      {tokens &&
        tokens.length > 0 &&
        tokens.map((token) => (
          <div key={token.id}>
            {token.name} : {token.id}
          </div>
        ))}
    </div>
  );
}

export default App;
