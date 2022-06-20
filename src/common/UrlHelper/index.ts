export class UrlHelper {
  /**
   * Extract url part from a full url string.
   * @param url An url string. Example: "path/subpath?q=hello&s=world" or "example.com/path?q=hello"
   * @returns An url after losing the query part. Example: "path/subpath" or "example.com/path"
   */
  static extractUrl(url: string): string {
    const questionMarkIndex = url.lastIndexOf("?");
    return questionMarkIndex !== -1 ? url.substring(0, questionMarkIndex) : url;
  }

  /**
   * Remove non-query string from a raw url query string.
   * @param rawQuery A raw url query with non-query string. Example: "path/subpath?q=hello&s=world".
   * @returns An url query after losing the non-query string. Example: "q=hello&s=world".
   */
  static formatQuery(rawQuery: string): string {
    const questionMarkIndex = rawQuery.lastIndexOf("?");
    return questionMarkIndex !== -1 ? rawQuery.substring(questionMarkIndex + 1) : rawQuery;
  }

  /**
   * Turn a single url param to an object of key and value.
   * @param queryParam A single url param. Example: "filter=technology".
   * @returns An object of key value. Example:
   * {
   *  key: "filter",
   *  value: "technology"
   * }
   */
  static splitParam(queryParam: string): { key: string, value: string } | undefined {
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

  /**
   * Append a dictionary of key string and value string[] to an url query string.
   * @param dictionary A dictionary of string[]. Example:
   * {
   *  category: ["technology", "furniture"],
   *  price: [200]
   * }
   * @returns An url query string. Example: "category=technology&category=furniture&price=200"
   */
  static toQueryFromStringsDictionary(dictionary: StringsDictionary): string {
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

  /**
   * Combine a dictionary of key string and value string to an url query string.
   * @param queryObject A dictionary of string. Example:
   * {
   *  category: "technology",
   *  price: "200"
   * }
   * @returns An url query string. Example: "category=technology&price=200"
   */
  static toQueryFromStringDictionary(queryDictionary: StringDictionary) {
    let query = "";
  
    for (const key in queryDictionary) {
      query += `${key}=${queryDictionary[key]}&`;
    }
  
    if (query) {
      query = query.substring(0, query.length - 1);
    }
  
    return query;
  }

  /**
   * Transaform an url query to a dictionary of string key and string value.
   * @param query An url query string. Example: "category=technology&category=furniture&price=200"
   * @returns A string dictionary of the url query. Example:
   * {
   *  category: "furniture",
   *  price: "200"
   * }
   */
  static toStringDictionary(query: string): StringDictionary {
    let dictionary: StringDictionary = {};
    const params = query.split("&");
    params.forEach(param => {
      const splitedParam = this.splitParam(param);
      if (splitedParam) {
        dictionary[splitedParam.key] = splitedParam.value;
      }
    });

    return dictionary;
  }
}

export type StringDictionary = { [key: string]: string; };
export type StringsDictionary = { [key: string]: string[]; };