export type WithFetchedAt<T extends Record<string, unknown>> = {
  fetchedAt: Date;
} & T;

// to update in the future

export type GlobalAppData = {};
