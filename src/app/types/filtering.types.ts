/**
 * Represents the criteria used for filtering.
 */
export type FilterCriteria<Model> = {
  /**
   * The name used as a filter criterion.
   */
  [K in keyof Model]?: Model[K];
};
