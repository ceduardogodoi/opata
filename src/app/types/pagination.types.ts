/**
 * Represents pagination information.
 *
 * @property {number} [page=1] - The current page number. Defaults to 1.
 * @property {number} [pageSize=10] - The number of items per page. Defaults to 10.
 */
export type Pageable = {
  /**
   * The current page number. Defaults to 1.
   */
  page?: number;

  /**
   The number of items per page. Defaults to 10.
   */
  pageSize?: number;
};

/**
 * Represents a paginated response.
 *
 * @template Model - The type of the items in the paginated response.
 * @property {Model[]} items - The list of items on the current page.
 * @property {number} totalItems - The total number of items across all pages.
 * @property {number} totalPages - The total number of pages.
 * @property {number} currentPage - The current page number.
 */
export type Paged<Model> = {
  /**
   * The list of items on the current page.
   */
  items: Model[];

  /**
   * The total number of items across all pages.
   */
  totalItems: number;

  /**
   * The total number of pages.
   */
  totalPages: number;

  /**
   * The current page number.
   */
  currentPage: number;
};
