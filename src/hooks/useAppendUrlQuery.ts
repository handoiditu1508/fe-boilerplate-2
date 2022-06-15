export function useAppendUrlQuery(path: string, ...queries: string[]): string {
  const basePath = extractBasePath(path);

  queries.push(path);

  const finalParamsDict = queries.reduce<StringsDictionary>((paramsDict, rawQuery) => {
    const query = formatQuery(rawQuery);
    const params = query.split("&");
    for (const param in params) {
      const splitedParam = splitParam(param);
      if (splitedParam) {
        if (!paramsDict[splitedParam.key]) {
          paramsDict[splitedParam.key] = [];
        }
        paramsDict[splitedParam.key].push(splitedParam.value);
      }
    }
    return paramsDict;
  }, {});

  const finalQuery = toQuery(finalParamsDict);

  return `${basePath}?${finalQuery}`;
}

type StringsDictionary = { [id: string]: string[]; };

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

function toQuery(dictionary: StringsDictionary): string {
  let query = "";

  for (const key in dictionary) {
    for (const value in dictionary[key]) {
      query += `${key}=${value}&`
    }
  }

  if (query) {
    query = query.substring(0, query.length - 1);
  }

  return query;
}