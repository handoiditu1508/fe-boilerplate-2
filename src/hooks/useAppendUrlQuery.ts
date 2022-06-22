import { StringsDictionary, UrlHelper } from "../common";

/**
 * Append a path and multiple queries into a single path, merge if query param is duplicated.
 * @param path Url or path. Example: "path/subpath?q=hello&s=world", "example.com/path".
 * @param queries Array of query strings. Example: "path/subpath?q=hello&s=world", "?q=hello&s=world".
 * @returns Combination of path and queries, append duplication.
 */
export function useAppendUrlQuery(path: string, ...queries: string[]): string {
  const basePath = UrlHelper.extractUrl(path);

  queries.push(path);

  const finalParamsDict = queries.reduce<StringsDictionary>((paramsDict, rawQuery) => {
    const query = UrlHelper.formatQuery(rawQuery);
    const params = query.split("&");
    for (const param in params) {
      const splitedParam = UrlHelper.splitParam(param);
      if (splitedParam) {
        if (!paramsDict[splitedParam.key]) {
          paramsDict[splitedParam.key] = [];
        }
        paramsDict[splitedParam.key].push(splitedParam.value);
      }
    }
    return paramsDict;
  }, {});

  const finalQuery = UrlHelper.toQuery(finalParamsDict);

  return `${basePath}?${finalQuery}`;
}