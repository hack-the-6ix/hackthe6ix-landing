/**
 * queryConfig hook yearsOfStudy
 * @typedef {Object} queryConfig
 * @property {object} variables - Query variables
 */

/**
 *
 * @param {string} query - Key for GraphQL query
 * @param {queryConfig} config - Configuration for query
 */
export const query = async (query, variables = {}, token) => {
  const api_url =
    process.env.VUE_APP_GRAPHQL_API || 'https://api.hackthe6ix.com/graphql';
  const raw = await fetch(api_url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? {'Ht6-Access-Token': token} : undefined),
    },
    method: 'POST',
    body: JSON.stringify({query, variables}),
  });
  const res = await raw.json();
  if (res.errors) throw new Error(res.errors[0].message);
  return res.data[Object.keys(res.data)[0]];
};
