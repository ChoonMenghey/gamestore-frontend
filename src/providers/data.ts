import { BACKEND_BASE_URL } from "@/constants";
import { CreateResponse, ListResponse } from "@/types";
import { createDataProvider, CreateDataProviderOptions } from "@refinedev/rest";

if (!BACKEND_BASE_URL) {
  throw new Error("BACKEND_BASE_URL is not defined in environment variables");
}

const options: CreateDataProviderOptions = {
  getList: {

    getEndpoint: ({ resource }) => resource, // "posts" → "/posts"

    buildQueryParams: async ({ resource, pagination, filters }) => {
      const params: Record<string, string | number> = {};

      if (pagination?.mode !== "off") {
        const page = pagination?.currentPage ?? 1;
        const pageSize = pagination?.pageSize ?? 10;

        params.page = page;
        params.limit = pageSize;
      }
      filters?.forEach((filter) => {
        const field = 'field' in filter ? filter.field : '';

        const value = String(filter.value);

        if (resource === 'games') {
          if (field === 'genre') params.genre = value;
          if (field === 'name') params.search = value;
        }
      });

      return params;
    },

    mapResponse: async (response) => {
      const payload: ListResponse = await response.clone().json();
      return payload.data ?? [];
    },

    getTotalCount: async (response) => {
      const payload: ListResponse = await response.clone().json();
      return payload.pagination?.total ?? payload.data?.length ?? 0;
    }
  },
  create: {
    getEndpoint: ({ resource }) => resource,

    buildBodyParams: async ({ variables }) => variables,

    mapResponse: async (response) => {
      const json: CreateResponse = await response.json();
      return json.data ?? {};
    },
  },
};

const { dataProvider } = createDataProvider(
  BACKEND_BASE_URL,
  options,
);

export { dataProvider };