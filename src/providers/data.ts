import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";

import { mockGames } from "@/data/data";

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({ resource }:
    GetListParams): Promise<GetListResponse<TData>> => {
    if (resource !== 'games') return { data: [] as TData[], total: 0 };

    return {
      data: mockGames as unknown as TData[],
      total: mockGames.length
    }
  },

  getOne: async () => { throw new Error('This function is not present in mock')},
  create: async () => { throw new Error('This function is not present in mock')},
  update: async () => { throw new Error('This function is not present in mock')},
  deleteOne: async () => { throw new Error('This function is not present in mock')},

  getApiUrl: () => '',
}