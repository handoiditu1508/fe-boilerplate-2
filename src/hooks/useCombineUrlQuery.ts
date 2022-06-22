import { StringDictionary, UrlHelper } from "../common";

/**
 * Combine a path and multiple queries into a single path, merge if query param is duplicated.
 * @param path Url or path. Example: "path/subpath?q=hello&s=world", "example.com/path".
 * @param queries Array of query strings. Example: "path/subpath?q=hello&s=world", "?q=hello&s=world".
 * @returns Combination of path and queries, overwrite duplication.
 */
export function useCombineUrlQuery(path: string, ...queries: string[]): string {
  const basePath = UrlHelper.extractUrl(path);

  queries.push(path);

  const finalQueryObject = queries.reduce<StringDictionary>((mergeQueryObject, rawQuery) => {
    const query = UrlHelper.formatQuery(rawQuery);
    const queryObject = UrlHelper.toStringDictionary(query);
    return {
      ...mergeQueryObject,
      ...queryObject
    }
  }, {});

  const finalQuery = UrlHelper.toQuery(finalQueryObject);

  return `${basePath}?${finalQuery}`;
}