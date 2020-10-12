export default abstract class Util {
  /** ***********************************************
   * Method: existsOrError
   * Description: Check if object exists.
   * In: Value: Any (var, obj, arr), Msg: string
   * Out: void when is fine, throw Error case false
   * Author: Vinicius S. Alves
   * Date: 03/09/2020
   *************************************************/

  static existOrError(value: any, msg: string) {
    if (!value) throw new Error(msg);
    if (Array.isArray(value) && value.length === 0 && value === undefined) throw new Error(msg);
    if (typeof value === 'string' && !value.trim()) throw new Error(msg);
  }

  /** ***********************************************
   * Method: notExistOrError
   * Description: Check if object doesn't exist.
   * In: Value: Any (var, obj, arr), msg: string
   * Out: void when is fine, throw Error case false
   * Author: Vinicius S. Alves
   * Date: 03/09/2020
   *************************************************/

  static notExistOrError(value: any, msg: string) {
    try {
      this.existOrError(value, msg);
    } catch (e) {
      return;
    }

    throw new Error(msg);
  }

  /** ***********************************************
   * Method: equalsOrError
   * Description: Check if objects are equals.
   * In: ValueA: Any, ValueB: Any, msg: string
   * Out: void when is fine, throw Error case false
   * Author: Vinicius S. Alves
   * Date: 03/09/2020
   *************************************************/

  static equalsOrError(valueA, valueB, msg) {
    if (valueA !== valueB) throw new Error(msg);
  }

  /** ***********************************************
   * Method: isEmail
   * Description: Check if objects is a valid email address.
   * In: email: string, msg: string
   * Out: boolean
   * Author: Vinicius S. Alves
   * Date: 03/09/2020
   *************************************************/

  static isEmail(email: string, msg: string): boolean {
    if (email) {
      if (email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
      ) {
        return true;
      } else {
        throw new Error(msg);
      }
    }
  }

  static sanitizeString(str: string): string {
    return str
      .replace(/\s/g, '-')
      // eslint-disable-next-line no-useless-escape
      .replace('/[^a-z0-9\./gi', '-')
      .replace('/-{2,}/g', '-')
      .toLowerCase();
  }
}
