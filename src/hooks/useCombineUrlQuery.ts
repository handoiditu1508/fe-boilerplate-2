/**
 * @description Combine a path and multiple queries into a single path, merge if query param is duplicated.
 * @param {string} path Url or path. Example: "path/subpath?q=hello&s=world", "example.com/path".
 * @param {string[]} queries Array of query strings. Example: "path/subpath?q=hello&s=world", "?q=hello&s=world".
 * 
 * @returns {string} Combination of path and queries.
 */
export function useCombineUrlQuery(path: string, ...queries: string[]): string {
  const basePath = extractBasePath(path);

  queries.push(path);

  const finalQueryObject = queries.reduce<StringDictionary>((mergeQueryObject, rawQuery) => {
    const query = formatQuery(rawQuery);
    const queryObject = toQueryObject(query);
    return {
      ...mergeQueryObject,
      ...queryObject
    }
  }, {});

  const finalQuery = toQuery(finalQueryObject);

  return `${basePath}?${finalQuery}`;
}

type StringDictionary = { [id: string] : string; };

/**
 * @description Transform string likes this "path/subpath?q=hello&s=world" to "path/subpath".
 */
function extractBasePath(path: string): string {
  const questionMarkIndex = path.lastIndexOf("?");
  return questionMarkIndex !== -1 ? path.substring(0, questionMarkIndex) : path;
}

/**
 * @description Transform string likes this "path/subpath?q=hello&s=world" to "q=hello&s=world".
*/
function formatQuery(rawQuery: string): string {
  const questionMarkIndex = rawQuery.lastIndexOf("?");
  return questionMarkIndex !== -1 ? rawQuery.substring(questionMarkIndex + 1) : rawQuery;
}

function toQueryObject(query: string): StringDictionary {
  let dictionary: StringDictionary = {};
  const params = query.split("&");
  params.forEach(param => {
    const splitedParam = splitParam(param);
    if (splitedParam) {
      dictionary[splitedParam.key] = splitedParam.value;
    }
  });

  return dictionary;
}

function splitParam(queryParam: string): { key: string, value: string } | undefined {
  const equalSignIndex = queryParam.indexOf("=");
  if (equalSignIndex !== -1) {
    return {
      key: queryParam.substring(0, equalSignIndex),
      value: queryParam.substring(equalSignIndex + 1)
    };
  } else {
    return undefined;
  }
}

function toQuery(queryObject: StringDictionary) {
  let query = "";

  for (const key in queryObject) {
    query += `${key}=${queryObject[key]}&`;
  }

  if (query) {
    query = query.substring(0, query.length - 1);
  }

  return query;
}