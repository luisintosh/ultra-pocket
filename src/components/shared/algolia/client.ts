import algoliasearch from "algoliasearch";

import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from "@/constants/constants";

export const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
