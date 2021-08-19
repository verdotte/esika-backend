import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv';

dotenv.config();

const { ALGOLIA_INDEX_NAME, ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY } = process.env;

const client = algoliasearch(`${ALGOLIA_APP_ID}`, `${ALGOLIA_ADMIN_KEY}`);
const index = client.initIndex(`${ALGOLIA_INDEX_NAME}`);

export default index;
