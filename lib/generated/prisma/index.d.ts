
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Store
 * 
 */
export type Store = $Result.DefaultSelection<Prisma.$StorePayload>
/**
 * Model Sale
 * 
 */
export type Sale = $Result.DefaultSelection<Prisma.$SalePayload>
/**
 * Model Stock
 * 
 */
export type Stock = $Result.DefaultSelection<Prisma.$StockPayload>
/**
 * Model Exchange
 * 
 */
export type Exchange = $Result.DefaultSelection<Prisma.$ExchangePayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  STORE: 'STORE'
};

export type Role = (typeof Role)[keyof typeof Role]


export const StoreStatus: {
  BAND: 'BAND',
  ACTIVE: 'ACTIVE',
  SUSPEND: 'SUSPEND'
};

export type StoreStatus = (typeof StoreStatus)[keyof typeof StoreStatus]


export const CurrencyType: {
  USD: 'USD',
  SYP: 'SYP'
};

export type CurrencyType = (typeof CurrencyType)[keyof typeof CurrencyType]


export const PaymentType: {
  CASH: 'CASH',
  SHAM_CASH: 'SHAM_CASH',
  OTHER: 'OTHER'
};

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType]


export const StockType: {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
};

export type StockType = (typeof StockType)[keyof typeof StockType]


export const GoldType: {
  GOLD_14: 'GOLD_14',
  GOLD_18: 'GOLD_18',
  GOLD_21: 'GOLD_21',
  GOLD_24: 'GOLD_24'
};

export type GoldType = (typeof GoldType)[keyof typeof GoldType]


export const DayStatus: {
  Opening: 'Opening',
  Closed: 'Closed'
};

export type DayStatus = (typeof DayStatus)[keyof typeof DayStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type StoreStatus = $Enums.StoreStatus

export const StoreStatus: typeof $Enums.StoreStatus

export type CurrencyType = $Enums.CurrencyType

export const CurrencyType: typeof $Enums.CurrencyType

export type PaymentType = $Enums.PaymentType

export const PaymentType: typeof $Enums.PaymentType

export type StockType = $Enums.StockType

export const StockType: typeof $Enums.StockType

export type GoldType = $Enums.GoldType

export const GoldType: typeof $Enums.GoldType

export type DayStatus = $Enums.DayStatus

export const DayStatus: typeof $Enums.DayStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.store`: Exposes CRUD operations for the **Store** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stores
    * const stores = await prisma.store.findMany()
    * ```
    */
  get store(): Prisma.StoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sale`: Exposes CRUD operations for the **Sale** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sales
    * const sales = await prisma.sale.findMany()
    * ```
    */
  get sale(): Prisma.SaleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stock`: Exposes CRUD operations for the **Stock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stocks
    * const stocks = await prisma.stock.findMany()
    * ```
    */
  get stock(): Prisma.StockDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exchange`: Exposes CRUD operations for the **Exchange** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exchanges
    * const exchanges = await prisma.exchange.findMany()
    * ```
    */
  get exchange(): Prisma.ExchangeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Store: 'Store',
    Sale: 'Sale',
    Stock: 'Stock',
    Exchange: 'Exchange',
    Report: 'Report'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "store" | "sale" | "stock" | "exchange" | "report"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Store: {
        payload: Prisma.$StorePayload<ExtArgs>
        fields: Prisma.StoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          findFirst: {
            args: Prisma.StoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          findMany: {
            args: Prisma.StoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>[]
          }
          create: {
            args: Prisma.StoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          createMany: {
            args: Prisma.StoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>[]
          }
          delete: {
            args: Prisma.StoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          update: {
            args: Prisma.StoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          deleteMany: {
            args: Prisma.StoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>[]
          }
          upsert: {
            args: Prisma.StoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          aggregate: {
            args: Prisma.StoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStore>
          }
          groupBy: {
            args: Prisma.StoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<StoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.StoreCountArgs<ExtArgs>
            result: $Utils.Optional<StoreCountAggregateOutputType> | number
          }
        }
      }
      Sale: {
        payload: Prisma.$SalePayload<ExtArgs>
        fields: Prisma.SaleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SaleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SaleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findFirst: {
            args: Prisma.SaleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SaleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          findMany: {
            args: Prisma.SaleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          create: {
            args: Prisma.SaleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          createMany: {
            args: Prisma.SaleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SaleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          delete: {
            args: Prisma.SaleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          update: {
            args: Prisma.SaleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          deleteMany: {
            args: Prisma.SaleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SaleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SaleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>[]
          }
          upsert: {
            args: Prisma.SaleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalePayload>
          }
          aggregate: {
            args: Prisma.SaleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSale>
          }
          groupBy: {
            args: Prisma.SaleGroupByArgs<ExtArgs>
            result: $Utils.Optional<SaleGroupByOutputType>[]
          }
          count: {
            args: Prisma.SaleCountArgs<ExtArgs>
            result: $Utils.Optional<SaleCountAggregateOutputType> | number
          }
        }
      }
      Stock: {
        payload: Prisma.$StockPayload<ExtArgs>
        fields: Prisma.StockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findFirst: {
            args: Prisma.StockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findMany: {
            args: Prisma.StockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          create: {
            args: Prisma.StockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          createMany: {
            args: Prisma.StockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          delete: {
            args: Prisma.StockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          update: {
            args: Prisma.StockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          deleteMany: {
            args: Prisma.StockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StockUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          upsert: {
            args: Prisma.StockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          aggregate: {
            args: Prisma.StockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStock>
          }
          groupBy: {
            args: Prisma.StockGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockCountArgs<ExtArgs>
            result: $Utils.Optional<StockCountAggregateOutputType> | number
          }
        }
      }
      Exchange: {
        payload: Prisma.$ExchangePayload<ExtArgs>
        fields: Prisma.ExchangeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExchangeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExchangeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangePayload>
          }
          findFirst: {
            args: Prisma.ExchangeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExchangeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangePayload>
          }
          findMany: {
            args: Prisma.ExchangeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangePayload>[]
          }
          create: {
            args: Prisma.ExchangeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangePayload>
          }
          createMany: {
            args: Prisma.ExchangeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExchangeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangePayload>[]
          }
          delete: {
            args: Prisma.ExchangeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangePayload>
          }
          update: {
            args: Prisma.ExchangeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangePayload>
          }
          deleteMany: {
            args: Prisma.ExchangeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExchangeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExchangeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangePayload>[]
          }
          upsert: {
            args: Prisma.ExchangeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangePayload>
          }
          aggregate: {
            args: Prisma.ExchangeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExchange>
          }
          groupBy: {
            args: Prisma.ExchangeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExchangeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExchangeCountArgs<ExtArgs>
            result: $Utils.Optional<ExchangeCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    store?: StoreOmit
    sale?: SaleOmit
    stock?: StockOmit
    exchange?: ExchangeOmit
    report?: ReportOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    stores: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stores?: boolean | UserCountOutputTypeCountStoresArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreWhereInput
  }


  /**
   * Count Type StoreCountOutputType
   */

  export type StoreCountOutputType = {
    sales: number
    stocks: number
    exchanges: number
    reports: number
  }

  export type StoreCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | StoreCountOutputTypeCountSalesArgs
    stocks?: boolean | StoreCountOutputTypeCountStocksArgs
    exchanges?: boolean | StoreCountOutputTypeCountExchangesArgs
    reports?: boolean | StoreCountOutputTypeCountReportsArgs
  }

  // Custom InputTypes
  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreCountOutputType
     */
    select?: StoreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountSalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountStocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockWhereInput
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountExchangesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeWhereInput
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }


  /**
   * Count Type ReportCountOutputType
   */

  export type ReportCountOutputType = {
    sales: number
    stocks: number
    exchanges: number
  }

  export type ReportCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sales?: boolean | ReportCountOutputTypeCountSalesArgs
    stocks?: boolean | ReportCountOutputTypeCountStocksArgs
    exchanges?: boolean | ReportCountOutputTypeCountExchangesArgs
  }

  // Custom InputTypes
  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportCountOutputType
     */
    select?: ReportCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountSalesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
  }

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountStocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockWhereInput
  }

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountExchangesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.Role | null
    phoneNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    role: $Enums.Role | null
    phoneNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    role: number
    phoneNumber: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    phoneNumber?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    phoneNumber?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    role?: true
    phoneNumber?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string | null
    role: $Enums.Role
    phoneNumber: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    phoneNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stores?: boolean | User$storesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    phoneNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    phoneNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    role?: boolean
    phoneNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "role" | "phoneNumber" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stores?: boolean | User$storesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      stores: Prisma.$StorePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      role: $Enums.Role
      phoneNumber: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stores<T extends User$storesArgs<ExtArgs> = {}>(args?: Subset<T, User$storesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.stores
   */
  export type User$storesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    where?: StoreWhereInput
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    cursor?: StoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Store
   */

  export type AggregateStore = {
    _count: StoreCountAggregateOutputType | null
    _avg: StoreAvgAggregateOutputType | null
    _sum: StoreSumAggregateOutputType | null
    _min: StoreMinAggregateOutputType | null
    _max: StoreMaxAggregateOutputType | null
  }

  export type StoreAvgAggregateOutputType = {
    currentGold14: number | null
    currentGold18: number | null
    currentGold21: number | null
    currentGold24: number | null
    currentUSD: number | null
    currentSYP: number | null
    priceGold14USD: number | null
    priceGold18USD: number | null
    priceGold21USD: number | null
    priceGold24USD: number | null
    exchangeRateUSDtoSYP: number | null
  }

  export type StoreSumAggregateOutputType = {
    currentGold14: number | null
    currentGold18: number | null
    currentGold21: number | null
    currentGold24: number | null
    currentUSD: number | null
    currentSYP: number | null
    priceGold14USD: number | null
    priceGold18USD: number | null
    priceGold21USD: number | null
    priceGold24USD: number | null
    exchangeRateUSDtoSYP: number | null
  }

  export type StoreMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    city: string | null
    logoUrl: string | null
    primaryPhoneNumber: string | null
    secondaryPhoneNumber: string | null
    status: $Enums.StoreStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    currentGold14: number | null
    currentGold18: number | null
    currentGold21: number | null
    currentGold24: number | null
    currentUSD: number | null
    currentSYP: number | null
    priceGold14USD: number | null
    priceGold18USD: number | null
    priceGold21USD: number | null
    priceGold24USD: number | null
    exchangeRateUSDtoSYP: number | null
    ownerId: string | null
  }

  export type StoreMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    city: string | null
    logoUrl: string | null
    primaryPhoneNumber: string | null
    secondaryPhoneNumber: string | null
    status: $Enums.StoreStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    currentGold14: number | null
    currentGold18: number | null
    currentGold21: number | null
    currentGold24: number | null
    currentUSD: number | null
    currentSYP: number | null
    priceGold14USD: number | null
    priceGold18USD: number | null
    priceGold21USD: number | null
    priceGold24USD: number | null
    exchangeRateUSDtoSYP: number | null
    ownerId: string | null
  }

  export type StoreCountAggregateOutputType = {
    id: number
    name: number
    address: number
    city: number
    logoUrl: number
    primaryPhoneNumber: number
    secondaryPhoneNumber: number
    status: number
    createdAt: number
    updatedAt: number
    currentGold14: number
    currentGold18: number
    currentGold21: number
    currentGold24: number
    currentUSD: number
    currentSYP: number
    priceGold14USD: number
    priceGold18USD: number
    priceGold21USD: number
    priceGold24USD: number
    exchangeRateUSDtoSYP: number
    ownerId: number
    _all: number
  }


  export type StoreAvgAggregateInputType = {
    currentGold14?: true
    currentGold18?: true
    currentGold21?: true
    currentGold24?: true
    currentUSD?: true
    currentSYP?: true
    priceGold14USD?: true
    priceGold18USD?: true
    priceGold21USD?: true
    priceGold24USD?: true
    exchangeRateUSDtoSYP?: true
  }

  export type StoreSumAggregateInputType = {
    currentGold14?: true
    currentGold18?: true
    currentGold21?: true
    currentGold24?: true
    currentUSD?: true
    currentSYP?: true
    priceGold14USD?: true
    priceGold18USD?: true
    priceGold21USD?: true
    priceGold24USD?: true
    exchangeRateUSDtoSYP?: true
  }

  export type StoreMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    city?: true
    logoUrl?: true
    primaryPhoneNumber?: true
    secondaryPhoneNumber?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    currentGold14?: true
    currentGold18?: true
    currentGold21?: true
    currentGold24?: true
    currentUSD?: true
    currentSYP?: true
    priceGold14USD?: true
    priceGold18USD?: true
    priceGold21USD?: true
    priceGold24USD?: true
    exchangeRateUSDtoSYP?: true
    ownerId?: true
  }

  export type StoreMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    city?: true
    logoUrl?: true
    primaryPhoneNumber?: true
    secondaryPhoneNumber?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    currentGold14?: true
    currentGold18?: true
    currentGold21?: true
    currentGold24?: true
    currentUSD?: true
    currentSYP?: true
    priceGold14USD?: true
    priceGold18USD?: true
    priceGold21USD?: true
    priceGold24USD?: true
    exchangeRateUSDtoSYP?: true
    ownerId?: true
  }

  export type StoreCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    city?: true
    logoUrl?: true
    primaryPhoneNumber?: true
    secondaryPhoneNumber?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    currentGold14?: true
    currentGold18?: true
    currentGold21?: true
    currentGold24?: true
    currentUSD?: true
    currentSYP?: true
    priceGold14USD?: true
    priceGold18USD?: true
    priceGold21USD?: true
    priceGold24USD?: true
    exchangeRateUSDtoSYP?: true
    ownerId?: true
    _all?: true
  }

  export type StoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Store to aggregate.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stores
    **/
    _count?: true | StoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoreMaxAggregateInputType
  }

  export type GetStoreAggregateType<T extends StoreAggregateArgs> = {
        [P in keyof T & keyof AggregateStore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStore[P]>
      : GetScalarType<T[P], AggregateStore[P]>
  }




  export type StoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreWhereInput
    orderBy?: StoreOrderByWithAggregationInput | StoreOrderByWithAggregationInput[]
    by: StoreScalarFieldEnum[] | StoreScalarFieldEnum
    having?: StoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoreCountAggregateInputType | true
    _avg?: StoreAvgAggregateInputType
    _sum?: StoreSumAggregateInputType
    _min?: StoreMinAggregateInputType
    _max?: StoreMaxAggregateInputType
  }

  export type StoreGroupByOutputType = {
    id: string
    name: string
    address: string | null
    city: string | null
    logoUrl: string | null
    primaryPhoneNumber: string | null
    secondaryPhoneNumber: string | null
    status: $Enums.StoreStatus
    createdAt: Date
    updatedAt: Date
    currentGold14: number
    currentGold18: number
    currentGold21: number
    currentGold24: number
    currentUSD: number
    currentSYP: number
    priceGold14USD: number
    priceGold18USD: number
    priceGold21USD: number
    priceGold24USD: number
    exchangeRateUSDtoSYP: number
    ownerId: string
    _count: StoreCountAggregateOutputType | null
    _avg: StoreAvgAggregateOutputType | null
    _sum: StoreSumAggregateOutputType | null
    _min: StoreMinAggregateOutputType | null
    _max: StoreMaxAggregateOutputType | null
  }

  type GetStoreGroupByPayload<T extends StoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoreGroupByOutputType[P]>
            : GetScalarType<T[P], StoreGroupByOutputType[P]>
        }
      >
    >


  export type StoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    logoUrl?: boolean
    primaryPhoneNumber?: boolean
    secondaryPhoneNumber?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    currentGold14?: boolean
    currentGold18?: boolean
    currentGold21?: boolean
    currentGold24?: boolean
    currentUSD?: boolean
    currentSYP?: boolean
    priceGold14USD?: boolean
    priceGold18USD?: boolean
    priceGold21USD?: boolean
    priceGold24USD?: boolean
    exchangeRateUSDtoSYP?: boolean
    ownerId?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    sales?: boolean | Store$salesArgs<ExtArgs>
    stocks?: boolean | Store$stocksArgs<ExtArgs>
    exchanges?: boolean | Store$exchangesArgs<ExtArgs>
    reports?: boolean | Store$reportsArgs<ExtArgs>
    _count?: boolean | StoreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["store"]>

  export type StoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    logoUrl?: boolean
    primaryPhoneNumber?: boolean
    secondaryPhoneNumber?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    currentGold14?: boolean
    currentGold18?: boolean
    currentGold21?: boolean
    currentGold24?: boolean
    currentUSD?: boolean
    currentSYP?: boolean
    priceGold14USD?: boolean
    priceGold18USD?: boolean
    priceGold21USD?: boolean
    priceGold24USD?: boolean
    exchangeRateUSDtoSYP?: boolean
    ownerId?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["store"]>

  export type StoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    logoUrl?: boolean
    primaryPhoneNumber?: boolean
    secondaryPhoneNumber?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    currentGold14?: boolean
    currentGold18?: boolean
    currentGold21?: boolean
    currentGold24?: boolean
    currentUSD?: boolean
    currentSYP?: boolean
    priceGold14USD?: boolean
    priceGold18USD?: boolean
    priceGold21USD?: boolean
    priceGold24USD?: boolean
    exchangeRateUSDtoSYP?: boolean
    ownerId?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["store"]>

  export type StoreSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    logoUrl?: boolean
    primaryPhoneNumber?: boolean
    secondaryPhoneNumber?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    currentGold14?: boolean
    currentGold18?: boolean
    currentGold21?: boolean
    currentGold24?: boolean
    currentUSD?: boolean
    currentSYP?: boolean
    priceGold14USD?: boolean
    priceGold18USD?: boolean
    priceGold21USD?: boolean
    priceGold24USD?: boolean
    exchangeRateUSDtoSYP?: boolean
    ownerId?: boolean
  }

  export type StoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "city" | "logoUrl" | "primaryPhoneNumber" | "secondaryPhoneNumber" | "status" | "createdAt" | "updatedAt" | "currentGold14" | "currentGold18" | "currentGold21" | "currentGold24" | "currentUSD" | "currentSYP" | "priceGold14USD" | "priceGold18USD" | "priceGold21USD" | "priceGold24USD" | "exchangeRateUSDtoSYP" | "ownerId", ExtArgs["result"]["store"]>
  export type StoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    sales?: boolean | Store$salesArgs<ExtArgs>
    stocks?: boolean | Store$stocksArgs<ExtArgs>
    exchanges?: boolean | Store$exchangesArgs<ExtArgs>
    reports?: boolean | Store$reportsArgs<ExtArgs>
    _count?: boolean | StoreCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Store"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      sales: Prisma.$SalePayload<ExtArgs>[]
      stocks: Prisma.$StockPayload<ExtArgs>[]
      exchanges: Prisma.$ExchangePayload<ExtArgs>[]
      reports: Prisma.$ReportPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string | null
      city: string | null
      logoUrl: string | null
      primaryPhoneNumber: string | null
      secondaryPhoneNumber: string | null
      status: $Enums.StoreStatus
      createdAt: Date
      updatedAt: Date
      currentGold14: number
      currentGold18: number
      currentGold21: number
      currentGold24: number
      currentUSD: number
      currentSYP: number
      priceGold14USD: number
      priceGold18USD: number
      priceGold21USD: number
      priceGold24USD: number
      exchangeRateUSDtoSYP: number
      ownerId: string
    }, ExtArgs["result"]["store"]>
    composites: {}
  }

  type StoreGetPayload<S extends boolean | null | undefined | StoreDefaultArgs> = $Result.GetResult<Prisma.$StorePayload, S>

  type StoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StoreCountAggregateInputType | true
    }

  export interface StoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Store'], meta: { name: 'Store' } }
    /**
     * Find zero or one Store that matches the filter.
     * @param {StoreFindUniqueArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StoreFindUniqueArgs>(args: SelectSubset<T, StoreFindUniqueArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Store that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StoreFindUniqueOrThrowArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StoreFindUniqueOrThrowArgs>(args: SelectSubset<T, StoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindFirstArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StoreFindFirstArgs>(args?: SelectSubset<T, StoreFindFirstArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindFirstOrThrowArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StoreFindFirstOrThrowArgs>(args?: SelectSubset<T, StoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stores
     * const stores = await prisma.store.findMany()
     * 
     * // Get first 10 Stores
     * const stores = await prisma.store.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storeWithIdOnly = await prisma.store.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StoreFindManyArgs>(args?: SelectSubset<T, StoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Store.
     * @param {StoreCreateArgs} args - Arguments to create a Store.
     * @example
     * // Create one Store
     * const Store = await prisma.store.create({
     *   data: {
     *     // ... data to create a Store
     *   }
     * })
     * 
     */
    create<T extends StoreCreateArgs>(args: SelectSubset<T, StoreCreateArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stores.
     * @param {StoreCreateManyArgs} args - Arguments to create many Stores.
     * @example
     * // Create many Stores
     * const store = await prisma.store.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StoreCreateManyArgs>(args?: SelectSubset<T, StoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stores and returns the data saved in the database.
     * @param {StoreCreateManyAndReturnArgs} args - Arguments to create many Stores.
     * @example
     * // Create many Stores
     * const store = await prisma.store.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stores and only return the `id`
     * const storeWithIdOnly = await prisma.store.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StoreCreateManyAndReturnArgs>(args?: SelectSubset<T, StoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Store.
     * @param {StoreDeleteArgs} args - Arguments to delete one Store.
     * @example
     * // Delete one Store
     * const Store = await prisma.store.delete({
     *   where: {
     *     // ... filter to delete one Store
     *   }
     * })
     * 
     */
    delete<T extends StoreDeleteArgs>(args: SelectSubset<T, StoreDeleteArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Store.
     * @param {StoreUpdateArgs} args - Arguments to update one Store.
     * @example
     * // Update one Store
     * const store = await prisma.store.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StoreUpdateArgs>(args: SelectSubset<T, StoreUpdateArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stores.
     * @param {StoreDeleteManyArgs} args - Arguments to filter Stores to delete.
     * @example
     * // Delete a few Stores
     * const { count } = await prisma.store.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StoreDeleteManyArgs>(args?: SelectSubset<T, StoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stores
     * const store = await prisma.store.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StoreUpdateManyArgs>(args: SelectSubset<T, StoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stores and returns the data updated in the database.
     * @param {StoreUpdateManyAndReturnArgs} args - Arguments to update many Stores.
     * @example
     * // Update many Stores
     * const store = await prisma.store.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stores and only return the `id`
     * const storeWithIdOnly = await prisma.store.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StoreUpdateManyAndReturnArgs>(args: SelectSubset<T, StoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Store.
     * @param {StoreUpsertArgs} args - Arguments to update or create a Store.
     * @example
     * // Update or create a Store
     * const store = await prisma.store.upsert({
     *   create: {
     *     // ... data to create a Store
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Store we want to update
     *   }
     * })
     */
    upsert<T extends StoreUpsertArgs>(args: SelectSubset<T, StoreUpsertArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreCountArgs} args - Arguments to filter Stores to count.
     * @example
     * // Count the number of Stores
     * const count = await prisma.store.count({
     *   where: {
     *     // ... the filter for the Stores we want to count
     *   }
     * })
    **/
    count<T extends StoreCountArgs>(
      args?: Subset<T, StoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StoreAggregateArgs>(args: Subset<T, StoreAggregateArgs>): Prisma.PrismaPromise<GetStoreAggregateType<T>>

    /**
     * Group by Store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StoreGroupByArgs['orderBy'] }
        : { orderBy?: StoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Store model
   */
  readonly fields: StoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Store.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sales<T extends Store$salesArgs<ExtArgs> = {}>(args?: Subset<T, Store$salesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    stocks<T extends Store$stocksArgs<ExtArgs> = {}>(args?: Subset<T, Store$stocksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exchanges<T extends Store$exchangesArgs<ExtArgs> = {}>(args?: Subset<T, Store$exchangesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reports<T extends Store$reportsArgs<ExtArgs> = {}>(args?: Subset<T, Store$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Store model
   */
  interface StoreFieldRefs {
    readonly id: FieldRef<"Store", 'String'>
    readonly name: FieldRef<"Store", 'String'>
    readonly address: FieldRef<"Store", 'String'>
    readonly city: FieldRef<"Store", 'String'>
    readonly logoUrl: FieldRef<"Store", 'String'>
    readonly primaryPhoneNumber: FieldRef<"Store", 'String'>
    readonly secondaryPhoneNumber: FieldRef<"Store", 'String'>
    readonly status: FieldRef<"Store", 'StoreStatus'>
    readonly createdAt: FieldRef<"Store", 'DateTime'>
    readonly updatedAt: FieldRef<"Store", 'DateTime'>
    readonly currentGold14: FieldRef<"Store", 'Float'>
    readonly currentGold18: FieldRef<"Store", 'Float'>
    readonly currentGold21: FieldRef<"Store", 'Float'>
    readonly currentGold24: FieldRef<"Store", 'Float'>
    readonly currentUSD: FieldRef<"Store", 'Float'>
    readonly currentSYP: FieldRef<"Store", 'Float'>
    readonly priceGold14USD: FieldRef<"Store", 'Float'>
    readonly priceGold18USD: FieldRef<"Store", 'Float'>
    readonly priceGold21USD: FieldRef<"Store", 'Float'>
    readonly priceGold24USD: FieldRef<"Store", 'Float'>
    readonly exchangeRateUSDtoSYP: FieldRef<"Store", 'Float'>
    readonly ownerId: FieldRef<"Store", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Store findUnique
   */
  export type StoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store findUniqueOrThrow
   */
  export type StoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store findFirst
   */
  export type StoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stores.
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stores.
     */
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Store findFirstOrThrow
   */
  export type StoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stores.
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stores.
     */
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Store findMany
   */
  export type StoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Stores to fetch.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stores.
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Store create
   */
  export type StoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * The data needed to create a Store.
     */
    data: XOR<StoreCreateInput, StoreUncheckedCreateInput>
  }

  /**
   * Store createMany
   */
  export type StoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stores.
     */
    data: StoreCreateManyInput | StoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Store createManyAndReturn
   */
  export type StoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * The data used to create many Stores.
     */
    data: StoreCreateManyInput | StoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Store update
   */
  export type StoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * The data needed to update a Store.
     */
    data: XOR<StoreUpdateInput, StoreUncheckedUpdateInput>
    /**
     * Choose, which Store to update.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store updateMany
   */
  export type StoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stores.
     */
    data: XOR<StoreUpdateManyMutationInput, StoreUncheckedUpdateManyInput>
    /**
     * Filter which Stores to update
     */
    where?: StoreWhereInput
    /**
     * Limit how many Stores to update.
     */
    limit?: number
  }

  /**
   * Store updateManyAndReturn
   */
  export type StoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * The data used to update Stores.
     */
    data: XOR<StoreUpdateManyMutationInput, StoreUncheckedUpdateManyInput>
    /**
     * Filter which Stores to update
     */
    where?: StoreWhereInput
    /**
     * Limit how many Stores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Store upsert
   */
  export type StoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * The filter to search for the Store to update in case it exists.
     */
    where: StoreWhereUniqueInput
    /**
     * In case the Store found by the `where` argument doesn't exist, create a new Store with this data.
     */
    create: XOR<StoreCreateInput, StoreUncheckedCreateInput>
    /**
     * In case the Store was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StoreUpdateInput, StoreUncheckedUpdateInput>
  }

  /**
   * Store delete
   */
  export type StoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter which Store to delete.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store deleteMany
   */
  export type StoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stores to delete
     */
    where?: StoreWhereInput
    /**
     * Limit how many Stores to delete.
     */
    limit?: number
  }

  /**
   * Store.sales
   */
  export type Store$salesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Store.stocks
   */
  export type Store$stocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    where?: StockWhereInput
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    cursor?: StockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Store.exchanges
   */
  export type Store$exchangesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exchange
     */
    select?: ExchangeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exchange
     */
    omit?: ExchangeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeInclude<ExtArgs> | null
    where?: ExchangeWhereInput
    orderBy?: ExchangeOrderByWithRelationInput | ExchangeOrderByWithRelationInput[]
    cursor?: ExchangeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExchangeScalarFieldEnum | ExchangeScalarFieldEnum[]
  }

  /**
   * Store.reports
   */
  export type Store$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Store without action
   */
  export type StoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
  }


  /**
   * Model Sale
   */

  export type AggregateSale = {
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  export type SaleAvgAggregateOutputType = {
    weight: number | null
    pricePerGramUSD: number | null
    pricePerGramSYP: number | null
    totalUSD: number | null
    totalSYP: number | null
    amountPaid: number | null
    profitUSD: number | null
    profitSYP: number | null
  }

  export type SaleSumAggregateOutputType = {
    weight: number | null
    pricePerGramUSD: number | null
    pricePerGramSYP: number | null
    totalUSD: number | null
    totalSYP: number | null
    amountPaid: number | null
    profitUSD: number | null
    profitSYP: number | null
  }

  export type SaleMinAggregateOutputType = {
    id: string | null
    invoiceNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
    weight: number | null
    goldType: $Enums.GoldType | null
    pricePerGramUSD: number | null
    pricePerGramSYP: number | null
    totalUSD: number | null
    totalSYP: number | null
    currency: $Enums.CurrencyType | null
    paymentType: $Enums.PaymentType | null
    amountPaid: number | null
    customerName: string | null
    customerPhone: string | null
    description: string | null
    reportId: string | null
    storeId: string | null
    profitUSD: number | null
    profitSYP: number | null
  }

  export type SaleMaxAggregateOutputType = {
    id: string | null
    invoiceNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
    weight: number | null
    goldType: $Enums.GoldType | null
    pricePerGramUSD: number | null
    pricePerGramSYP: number | null
    totalUSD: number | null
    totalSYP: number | null
    currency: $Enums.CurrencyType | null
    paymentType: $Enums.PaymentType | null
    amountPaid: number | null
    customerName: string | null
    customerPhone: string | null
    description: string | null
    reportId: string | null
    storeId: string | null
    profitUSD: number | null
    profitSYP: number | null
  }

  export type SaleCountAggregateOutputType = {
    id: number
    invoiceNumber: number
    createdAt: number
    updatedAt: number
    weight: number
    goldType: number
    pricePerGramUSD: number
    pricePerGramSYP: number
    totalUSD: number
    totalSYP: number
    currency: number
    paymentType: number
    amountPaid: number
    customerName: number
    customerPhone: number
    description: number
    reportId: number
    storeId: number
    profitUSD: number
    profitSYP: number
    _all: number
  }


  export type SaleAvgAggregateInputType = {
    weight?: true
    pricePerGramUSD?: true
    pricePerGramSYP?: true
    totalUSD?: true
    totalSYP?: true
    amountPaid?: true
    profitUSD?: true
    profitSYP?: true
  }

  export type SaleSumAggregateInputType = {
    weight?: true
    pricePerGramUSD?: true
    pricePerGramSYP?: true
    totalUSD?: true
    totalSYP?: true
    amountPaid?: true
    profitUSD?: true
    profitSYP?: true
  }

  export type SaleMinAggregateInputType = {
    id?: true
    invoiceNumber?: true
    createdAt?: true
    updatedAt?: true
    weight?: true
    goldType?: true
    pricePerGramUSD?: true
    pricePerGramSYP?: true
    totalUSD?: true
    totalSYP?: true
    currency?: true
    paymentType?: true
    amountPaid?: true
    customerName?: true
    customerPhone?: true
    description?: true
    reportId?: true
    storeId?: true
    profitUSD?: true
    profitSYP?: true
  }

  export type SaleMaxAggregateInputType = {
    id?: true
    invoiceNumber?: true
    createdAt?: true
    updatedAt?: true
    weight?: true
    goldType?: true
    pricePerGramUSD?: true
    pricePerGramSYP?: true
    totalUSD?: true
    totalSYP?: true
    currency?: true
    paymentType?: true
    amountPaid?: true
    customerName?: true
    customerPhone?: true
    description?: true
    reportId?: true
    storeId?: true
    profitUSD?: true
    profitSYP?: true
  }

  export type SaleCountAggregateInputType = {
    id?: true
    invoiceNumber?: true
    createdAt?: true
    updatedAt?: true
    weight?: true
    goldType?: true
    pricePerGramUSD?: true
    pricePerGramSYP?: true
    totalUSD?: true
    totalSYP?: true
    currency?: true
    paymentType?: true
    amountPaid?: true
    customerName?: true
    customerPhone?: true
    description?: true
    reportId?: true
    storeId?: true
    profitUSD?: true
    profitSYP?: true
    _all?: true
  }

  export type SaleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sale to aggregate.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sales
    **/
    _count?: true | SaleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SaleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SaleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SaleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SaleMaxAggregateInputType
  }

  export type GetSaleAggregateType<T extends SaleAggregateArgs> = {
        [P in keyof T & keyof AggregateSale]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSale[P]>
      : GetScalarType<T[P], AggregateSale[P]>
  }




  export type SaleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithAggregationInput | SaleOrderByWithAggregationInput[]
    by: SaleScalarFieldEnum[] | SaleScalarFieldEnum
    having?: SaleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SaleCountAggregateInputType | true
    _avg?: SaleAvgAggregateInputType
    _sum?: SaleSumAggregateInputType
    _min?: SaleMinAggregateInputType
    _max?: SaleMaxAggregateInputType
  }

  export type SaleGroupByOutputType = {
    id: string
    invoiceNumber: string
    createdAt: Date
    updatedAt: Date
    weight: number
    goldType: $Enums.GoldType
    pricePerGramUSD: number
    pricePerGramSYP: number
    totalUSD: number
    totalSYP: number
    currency: $Enums.CurrencyType
    paymentType: $Enums.PaymentType
    amountPaid: number
    customerName: string | null
    customerPhone: string | null
    description: string | null
    reportId: string | null
    storeId: string
    profitUSD: number
    profitSYP: number
    _count: SaleCountAggregateOutputType | null
    _avg: SaleAvgAggregateOutputType | null
    _sum: SaleSumAggregateOutputType | null
    _min: SaleMinAggregateOutputType | null
    _max: SaleMaxAggregateOutputType | null
  }

  type GetSaleGroupByPayload<T extends SaleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SaleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SaleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SaleGroupByOutputType[P]>
            : GetScalarType<T[P], SaleGroupByOutputType[P]>
        }
      >
    >


  export type SaleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    weight?: boolean
    goldType?: boolean
    pricePerGramUSD?: boolean
    pricePerGramSYP?: boolean
    totalUSD?: boolean
    totalSYP?: boolean
    currency?: boolean
    paymentType?: boolean
    amountPaid?: boolean
    customerName?: boolean
    customerPhone?: boolean
    description?: boolean
    reportId?: boolean
    storeId?: boolean
    profitUSD?: boolean
    profitSYP?: boolean
    report?: boolean | Sale$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    weight?: boolean
    goldType?: boolean
    pricePerGramUSD?: boolean
    pricePerGramSYP?: boolean
    totalUSD?: boolean
    totalSYP?: boolean
    currency?: boolean
    paymentType?: boolean
    amountPaid?: boolean
    customerName?: boolean
    customerPhone?: boolean
    description?: boolean
    reportId?: boolean
    storeId?: boolean
    profitUSD?: boolean
    profitSYP?: boolean
    report?: boolean | Sale$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    weight?: boolean
    goldType?: boolean
    pricePerGramUSD?: boolean
    pricePerGramSYP?: boolean
    totalUSD?: boolean
    totalSYP?: boolean
    currency?: boolean
    paymentType?: boolean
    amountPaid?: boolean
    customerName?: boolean
    customerPhone?: boolean
    description?: boolean
    reportId?: boolean
    storeId?: boolean
    profitUSD?: boolean
    profitSYP?: boolean
    report?: boolean | Sale$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sale"]>

  export type SaleSelectScalar = {
    id?: boolean
    invoiceNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    weight?: boolean
    goldType?: boolean
    pricePerGramUSD?: boolean
    pricePerGramSYP?: boolean
    totalUSD?: boolean
    totalSYP?: boolean
    currency?: boolean
    paymentType?: boolean
    amountPaid?: boolean
    customerName?: boolean
    customerPhone?: boolean
    description?: boolean
    reportId?: boolean
    storeId?: boolean
    profitUSD?: boolean
    profitSYP?: boolean
  }

  export type SaleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invoiceNumber" | "createdAt" | "updatedAt" | "weight" | "goldType" | "pricePerGramUSD" | "pricePerGramSYP" | "totalUSD" | "totalSYP" | "currency" | "paymentType" | "amountPaid" | "customerName" | "customerPhone" | "description" | "reportId" | "storeId" | "profitUSD" | "profitSYP", ExtArgs["result"]["sale"]>
  export type SaleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | Sale$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type SaleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | Sale$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type SaleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | Sale$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }

  export type $SalePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sale"
    objects: {
      report: Prisma.$ReportPayload<ExtArgs> | null
      store: Prisma.$StorePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      invoiceNumber: string
      createdAt: Date
      updatedAt: Date
      weight: number
      goldType: $Enums.GoldType
      pricePerGramUSD: number
      pricePerGramSYP: number
      totalUSD: number
      totalSYP: number
      currency: $Enums.CurrencyType
      paymentType: $Enums.PaymentType
      amountPaid: number
      customerName: string | null
      customerPhone: string | null
      description: string | null
      reportId: string | null
      storeId: string
      profitUSD: number
      profitSYP: number
    }, ExtArgs["result"]["sale"]>
    composites: {}
  }

  type SaleGetPayload<S extends boolean | null | undefined | SaleDefaultArgs> = $Result.GetResult<Prisma.$SalePayload, S>

  type SaleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SaleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SaleCountAggregateInputType | true
    }

  export interface SaleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sale'], meta: { name: 'Sale' } }
    /**
     * Find zero or one Sale that matches the filter.
     * @param {SaleFindUniqueArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SaleFindUniqueArgs>(args: SelectSubset<T, SaleFindUniqueArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sale that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SaleFindUniqueOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SaleFindUniqueOrThrowArgs>(args: SelectSubset<T, SaleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sale that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SaleFindFirstArgs>(args?: SelectSubset<T, SaleFindFirstArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sale that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindFirstOrThrowArgs} args - Arguments to find a Sale
     * @example
     * // Get one Sale
     * const sale = await prisma.sale.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SaleFindFirstOrThrowArgs>(args?: SelectSubset<T, SaleFindFirstOrThrowArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sales that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sales
     * const sales = await prisma.sale.findMany()
     * 
     * // Get first 10 Sales
     * const sales = await prisma.sale.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const saleWithIdOnly = await prisma.sale.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SaleFindManyArgs>(args?: SelectSubset<T, SaleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sale.
     * @param {SaleCreateArgs} args - Arguments to create a Sale.
     * @example
     * // Create one Sale
     * const Sale = await prisma.sale.create({
     *   data: {
     *     // ... data to create a Sale
     *   }
     * })
     * 
     */
    create<T extends SaleCreateArgs>(args: SelectSubset<T, SaleCreateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sales.
     * @param {SaleCreateManyArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SaleCreateManyArgs>(args?: SelectSubset<T, SaleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sales and returns the data saved in the database.
     * @param {SaleCreateManyAndReturnArgs} args - Arguments to create many Sales.
     * @example
     * // Create many Sales
     * const sale = await prisma.sale.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sales and only return the `id`
     * const saleWithIdOnly = await prisma.sale.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SaleCreateManyAndReturnArgs>(args?: SelectSubset<T, SaleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sale.
     * @param {SaleDeleteArgs} args - Arguments to delete one Sale.
     * @example
     * // Delete one Sale
     * const Sale = await prisma.sale.delete({
     *   where: {
     *     // ... filter to delete one Sale
     *   }
     * })
     * 
     */
    delete<T extends SaleDeleteArgs>(args: SelectSubset<T, SaleDeleteArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sale.
     * @param {SaleUpdateArgs} args - Arguments to update one Sale.
     * @example
     * // Update one Sale
     * const sale = await prisma.sale.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SaleUpdateArgs>(args: SelectSubset<T, SaleUpdateArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sales.
     * @param {SaleDeleteManyArgs} args - Arguments to filter Sales to delete.
     * @example
     * // Delete a few Sales
     * const { count } = await prisma.sale.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SaleDeleteManyArgs>(args?: SelectSubset<T, SaleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sales
     * const sale = await prisma.sale.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SaleUpdateManyArgs>(args: SelectSubset<T, SaleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sales and returns the data updated in the database.
     * @param {SaleUpdateManyAndReturnArgs} args - Arguments to update many Sales.
     * @example
     * // Update many Sales
     * const sale = await prisma.sale.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sales and only return the `id`
     * const saleWithIdOnly = await prisma.sale.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SaleUpdateManyAndReturnArgs>(args: SelectSubset<T, SaleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sale.
     * @param {SaleUpsertArgs} args - Arguments to update or create a Sale.
     * @example
     * // Update or create a Sale
     * const sale = await prisma.sale.upsert({
     *   create: {
     *     // ... data to create a Sale
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sale we want to update
     *   }
     * })
     */
    upsert<T extends SaleUpsertArgs>(args: SelectSubset<T, SaleUpsertArgs<ExtArgs>>): Prisma__SaleClient<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleCountArgs} args - Arguments to filter Sales to count.
     * @example
     * // Count the number of Sales
     * const count = await prisma.sale.count({
     *   where: {
     *     // ... the filter for the Sales we want to count
     *   }
     * })
    **/
    count<T extends SaleCountArgs>(
      args?: Subset<T, SaleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SaleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SaleAggregateArgs>(args: Subset<T, SaleAggregateArgs>): Prisma.PrismaPromise<GetSaleAggregateType<T>>

    /**
     * Group by Sale.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SaleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SaleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SaleGroupByArgs['orderBy'] }
        : { orderBy?: SaleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SaleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSaleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sale model
   */
  readonly fields: SaleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sale.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SaleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    report<T extends Sale$reportArgs<ExtArgs> = {}>(args?: Subset<T, Sale$reportArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sale model
   */
  interface SaleFieldRefs {
    readonly id: FieldRef<"Sale", 'String'>
    readonly invoiceNumber: FieldRef<"Sale", 'String'>
    readonly createdAt: FieldRef<"Sale", 'DateTime'>
    readonly updatedAt: FieldRef<"Sale", 'DateTime'>
    readonly weight: FieldRef<"Sale", 'Float'>
    readonly goldType: FieldRef<"Sale", 'GoldType'>
    readonly pricePerGramUSD: FieldRef<"Sale", 'Float'>
    readonly pricePerGramSYP: FieldRef<"Sale", 'Float'>
    readonly totalUSD: FieldRef<"Sale", 'Float'>
    readonly totalSYP: FieldRef<"Sale", 'Float'>
    readonly currency: FieldRef<"Sale", 'CurrencyType'>
    readonly paymentType: FieldRef<"Sale", 'PaymentType'>
    readonly amountPaid: FieldRef<"Sale", 'Float'>
    readonly customerName: FieldRef<"Sale", 'String'>
    readonly customerPhone: FieldRef<"Sale", 'String'>
    readonly description: FieldRef<"Sale", 'String'>
    readonly reportId: FieldRef<"Sale", 'String'>
    readonly storeId: FieldRef<"Sale", 'String'>
    readonly profitUSD: FieldRef<"Sale", 'Float'>
    readonly profitSYP: FieldRef<"Sale", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Sale findUnique
   */
  export type SaleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findUniqueOrThrow
   */
  export type SaleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale findFirst
   */
  export type SaleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findFirstOrThrow
   */
  export type SaleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sale to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sales.
     */
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale findMany
   */
  export type SaleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter, which Sales to fetch.
     */
    where?: SaleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sales to fetch.
     */
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sales.
     */
    cursor?: SaleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sales.
     */
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Sale create
   */
  export type SaleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to create a Sale.
     */
    data: XOR<SaleCreateInput, SaleUncheckedCreateInput>
  }

  /**
   * Sale createMany
   */
  export type SaleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sales.
     */
    data: SaleCreateManyInput | SaleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sale createManyAndReturn
   */
  export type SaleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * The data used to create many Sales.
     */
    data: SaleCreateManyInput | SaleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sale update
   */
  export type SaleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The data needed to update a Sale.
     */
    data: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
    /**
     * Choose, which Sale to update.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale updateMany
   */
  export type SaleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sales.
     */
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyInput>
    /**
     * Filter which Sales to update
     */
    where?: SaleWhereInput
    /**
     * Limit how many Sales to update.
     */
    limit?: number
  }

  /**
   * Sale updateManyAndReturn
   */
  export type SaleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * The data used to update Sales.
     */
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyInput>
    /**
     * Filter which Sales to update
     */
    where?: SaleWhereInput
    /**
     * Limit how many Sales to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sale upsert
   */
  export type SaleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * The filter to search for the Sale to update in case it exists.
     */
    where: SaleWhereUniqueInput
    /**
     * In case the Sale found by the `where` argument doesn't exist, create a new Sale with this data.
     */
    create: XOR<SaleCreateInput, SaleUncheckedCreateInput>
    /**
     * In case the Sale was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SaleUpdateInput, SaleUncheckedUpdateInput>
  }

  /**
   * Sale delete
   */
  export type SaleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    /**
     * Filter which Sale to delete.
     */
    where: SaleWhereUniqueInput
  }

  /**
   * Sale deleteMany
   */
  export type SaleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sales to delete
     */
    where?: SaleWhereInput
    /**
     * Limit how many Sales to delete.
     */
    limit?: number
  }

  /**
   * Sale.report
   */
  export type Sale$reportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
  }

  /**
   * Sale without action
   */
  export type SaleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
  }


  /**
   * Model Stock
   */

  export type AggregateStock = {
    _count: StockCountAggregateOutputType | null
    _avg: StockAvgAggregateOutputType | null
    _sum: StockSumAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  export type StockAvgAggregateOutputType = {
    quantity: number | null
    balanceAfter: number | null
    costPerGramUSD: number | null
    totalCostUSD: number | null
    totalCostSYP: number | null
  }

  export type StockSumAggregateOutputType = {
    quantity: number | null
    balanceAfter: number | null
    costPerGramUSD: number | null
    totalCostUSD: number | null
    totalCostSYP: number | null
  }

  export type StockMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    goldType: $Enums.GoldType | null
    quantity: number | null
    type: $Enums.StockType | null
    balanceAfter: number | null
    costPerGramUSD: number | null
    totalCostUSD: number | null
    totalCostSYP: number | null
    supplier: string | null
    invoiceRef: string | null
    note: string | null
    reportId: string | null
    storeId: string | null
  }

  export type StockMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    goldType: $Enums.GoldType | null
    quantity: number | null
    type: $Enums.StockType | null
    balanceAfter: number | null
    costPerGramUSD: number | null
    totalCostUSD: number | null
    totalCostSYP: number | null
    supplier: string | null
    invoiceRef: string | null
    note: string | null
    reportId: string | null
    storeId: string | null
  }

  export type StockCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    goldType: number
    quantity: number
    type: number
    balanceAfter: number
    costPerGramUSD: number
    totalCostUSD: number
    totalCostSYP: number
    supplier: number
    invoiceRef: number
    note: number
    reportId: number
    storeId: number
    _all: number
  }


  export type StockAvgAggregateInputType = {
    quantity?: true
    balanceAfter?: true
    costPerGramUSD?: true
    totalCostUSD?: true
    totalCostSYP?: true
  }

  export type StockSumAggregateInputType = {
    quantity?: true
    balanceAfter?: true
    costPerGramUSD?: true
    totalCostUSD?: true
    totalCostSYP?: true
  }

  export type StockMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    goldType?: true
    quantity?: true
    type?: true
    balanceAfter?: true
    costPerGramUSD?: true
    totalCostUSD?: true
    totalCostSYP?: true
    supplier?: true
    invoiceRef?: true
    note?: true
    reportId?: true
    storeId?: true
  }

  export type StockMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    goldType?: true
    quantity?: true
    type?: true
    balanceAfter?: true
    costPerGramUSD?: true
    totalCostUSD?: true
    totalCostSYP?: true
    supplier?: true
    invoiceRef?: true
    note?: true
    reportId?: true
    storeId?: true
  }

  export type StockCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    goldType?: true
    quantity?: true
    type?: true
    balanceAfter?: true
    costPerGramUSD?: true
    totalCostUSD?: true
    totalCostSYP?: true
    supplier?: true
    invoiceRef?: true
    note?: true
    reportId?: true
    storeId?: true
    _all?: true
  }

  export type StockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stock to aggregate.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stocks
    **/
    _count?: true | StockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockMaxAggregateInputType
  }

  export type GetStockAggregateType<T extends StockAggregateArgs> = {
        [P in keyof T & keyof AggregateStock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStock[P]>
      : GetScalarType<T[P], AggregateStock[P]>
  }




  export type StockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockWhereInput
    orderBy?: StockOrderByWithAggregationInput | StockOrderByWithAggregationInput[]
    by: StockScalarFieldEnum[] | StockScalarFieldEnum
    having?: StockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockCountAggregateInputType | true
    _avg?: StockAvgAggregateInputType
    _sum?: StockSumAggregateInputType
    _min?: StockMinAggregateInputType
    _max?: StockMaxAggregateInputType
  }

  export type StockGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    goldType: $Enums.GoldType
    quantity: number
    type: $Enums.StockType
    balanceAfter: number
    costPerGramUSD: number | null
    totalCostUSD: number | null
    totalCostSYP: number | null
    supplier: string | null
    invoiceRef: string | null
    note: string | null
    reportId: string | null
    storeId: string
    _count: StockCountAggregateOutputType | null
    _avg: StockAvgAggregateOutputType | null
    _sum: StockSumAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  type GetStockGroupByPayload<T extends StockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockGroupByOutputType[P]>
            : GetScalarType<T[P], StockGroupByOutputType[P]>
        }
      >
    >


  export type StockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goldType?: boolean
    quantity?: boolean
    type?: boolean
    balanceAfter?: boolean
    costPerGramUSD?: boolean
    totalCostUSD?: boolean
    totalCostSYP?: boolean
    supplier?: boolean
    invoiceRef?: boolean
    note?: boolean
    reportId?: boolean
    storeId?: boolean
    report?: boolean | Stock$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stock"]>

  export type StockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goldType?: boolean
    quantity?: boolean
    type?: boolean
    balanceAfter?: boolean
    costPerGramUSD?: boolean
    totalCostUSD?: boolean
    totalCostSYP?: boolean
    supplier?: boolean
    invoiceRef?: boolean
    note?: boolean
    reportId?: boolean
    storeId?: boolean
    report?: boolean | Stock$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stock"]>

  export type StockSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goldType?: boolean
    quantity?: boolean
    type?: boolean
    balanceAfter?: boolean
    costPerGramUSD?: boolean
    totalCostUSD?: boolean
    totalCostSYP?: boolean
    supplier?: boolean
    invoiceRef?: boolean
    note?: boolean
    reportId?: boolean
    storeId?: boolean
    report?: boolean | Stock$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stock"]>

  export type StockSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    goldType?: boolean
    quantity?: boolean
    type?: boolean
    balanceAfter?: boolean
    costPerGramUSD?: boolean
    totalCostUSD?: boolean
    totalCostSYP?: boolean
    supplier?: boolean
    invoiceRef?: boolean
    note?: boolean
    reportId?: boolean
    storeId?: boolean
  }

  export type StockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "goldType" | "quantity" | "type" | "balanceAfter" | "costPerGramUSD" | "totalCostUSD" | "totalCostSYP" | "supplier" | "invoiceRef" | "note" | "reportId" | "storeId", ExtArgs["result"]["stock"]>
  export type StockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | Stock$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type StockIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | Stock$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type StockIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | Stock$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }

  export type $StockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stock"
    objects: {
      report: Prisma.$ReportPayload<ExtArgs> | null
      store: Prisma.$StorePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      goldType: $Enums.GoldType
      quantity: number
      type: $Enums.StockType
      balanceAfter: number
      costPerGramUSD: number | null
      totalCostUSD: number | null
      totalCostSYP: number | null
      supplier: string | null
      invoiceRef: string | null
      note: string | null
      reportId: string | null
      storeId: string
    }, ExtArgs["result"]["stock"]>
    composites: {}
  }

  type StockGetPayload<S extends boolean | null | undefined | StockDefaultArgs> = $Result.GetResult<Prisma.$StockPayload, S>

  type StockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockCountAggregateInputType | true
    }

  export interface StockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stock'], meta: { name: 'Stock' } }
    /**
     * Find zero or one Stock that matches the filter.
     * @param {StockFindUniqueArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockFindUniqueArgs>(args: SelectSubset<T, StockFindUniqueArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stock that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockFindUniqueOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockFindUniqueOrThrowArgs>(args: SelectSubset<T, StockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockFindFirstArgs>(args?: SelectSubset<T, StockFindFirstArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockFindFirstOrThrowArgs>(args?: SelectSubset<T, StockFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stocks
     * const stocks = await prisma.stock.findMany()
     * 
     * // Get first 10 Stocks
     * const stocks = await prisma.stock.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockWithIdOnly = await prisma.stock.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockFindManyArgs>(args?: SelectSubset<T, StockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stock.
     * @param {StockCreateArgs} args - Arguments to create a Stock.
     * @example
     * // Create one Stock
     * const Stock = await prisma.stock.create({
     *   data: {
     *     // ... data to create a Stock
     *   }
     * })
     * 
     */
    create<T extends StockCreateArgs>(args: SelectSubset<T, StockCreateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stocks.
     * @param {StockCreateManyArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stock = await prisma.stock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockCreateManyArgs>(args?: SelectSubset<T, StockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stocks and returns the data saved in the database.
     * @param {StockCreateManyAndReturnArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stock = await prisma.stock.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stocks and only return the `id`
     * const stockWithIdOnly = await prisma.stock.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockCreateManyAndReturnArgs>(args?: SelectSubset<T, StockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Stock.
     * @param {StockDeleteArgs} args - Arguments to delete one Stock.
     * @example
     * // Delete one Stock
     * const Stock = await prisma.stock.delete({
     *   where: {
     *     // ... filter to delete one Stock
     *   }
     * })
     * 
     */
    delete<T extends StockDeleteArgs>(args: SelectSubset<T, StockDeleteArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stock.
     * @param {StockUpdateArgs} args - Arguments to update one Stock.
     * @example
     * // Update one Stock
     * const stock = await prisma.stock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockUpdateArgs>(args: SelectSubset<T, StockUpdateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stocks.
     * @param {StockDeleteManyArgs} args - Arguments to filter Stocks to delete.
     * @example
     * // Delete a few Stocks
     * const { count } = await prisma.stock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockDeleteManyArgs>(args?: SelectSubset<T, StockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stocks
     * const stock = await prisma.stock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockUpdateManyArgs>(args: SelectSubset<T, StockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stocks and returns the data updated in the database.
     * @param {StockUpdateManyAndReturnArgs} args - Arguments to update many Stocks.
     * @example
     * // Update many Stocks
     * const stock = await prisma.stock.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stocks and only return the `id`
     * const stockWithIdOnly = await prisma.stock.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StockUpdateManyAndReturnArgs>(args: SelectSubset<T, StockUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Stock.
     * @param {StockUpsertArgs} args - Arguments to update or create a Stock.
     * @example
     * // Update or create a Stock
     * const stock = await prisma.stock.upsert({
     *   create: {
     *     // ... data to create a Stock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stock we want to update
     *   }
     * })
     */
    upsert<T extends StockUpsertArgs>(args: SelectSubset<T, StockUpsertArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockCountArgs} args - Arguments to filter Stocks to count.
     * @example
     * // Count the number of Stocks
     * const count = await prisma.stock.count({
     *   where: {
     *     // ... the filter for the Stocks we want to count
     *   }
     * })
    **/
    count<T extends StockCountArgs>(
      args?: Subset<T, StockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockAggregateArgs>(args: Subset<T, StockAggregateArgs>): Prisma.PrismaPromise<GetStockAggregateType<T>>

    /**
     * Group by Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockGroupByArgs['orderBy'] }
        : { orderBy?: StockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stock model
   */
  readonly fields: StockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    report<T extends Stock$reportArgs<ExtArgs> = {}>(args?: Subset<T, Stock$reportArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stock model
   */
  interface StockFieldRefs {
    readonly id: FieldRef<"Stock", 'String'>
    readonly createdAt: FieldRef<"Stock", 'DateTime'>
    readonly updatedAt: FieldRef<"Stock", 'DateTime'>
    readonly goldType: FieldRef<"Stock", 'GoldType'>
    readonly quantity: FieldRef<"Stock", 'Float'>
    readonly type: FieldRef<"Stock", 'StockType'>
    readonly balanceAfter: FieldRef<"Stock", 'Float'>
    readonly costPerGramUSD: FieldRef<"Stock", 'Float'>
    readonly totalCostUSD: FieldRef<"Stock", 'Float'>
    readonly totalCostSYP: FieldRef<"Stock", 'Float'>
    readonly supplier: FieldRef<"Stock", 'String'>
    readonly invoiceRef: FieldRef<"Stock", 'String'>
    readonly note: FieldRef<"Stock", 'String'>
    readonly reportId: FieldRef<"Stock", 'String'>
    readonly storeId: FieldRef<"Stock", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Stock findUnique
   */
  export type StockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findUniqueOrThrow
   */
  export type StockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findFirst
   */
  export type StockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findFirstOrThrow
   */
  export type StockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findMany
   */
  export type StockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stocks to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock create
   */
  export type StockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The data needed to create a Stock.
     */
    data: XOR<StockCreateInput, StockUncheckedCreateInput>
  }

  /**
   * Stock createMany
   */
  export type StockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stocks.
     */
    data: StockCreateManyInput | StockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stock createManyAndReturn
   */
  export type StockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * The data used to create many Stocks.
     */
    data: StockCreateManyInput | StockCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stock update
   */
  export type StockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The data needed to update a Stock.
     */
    data: XOR<StockUpdateInput, StockUncheckedUpdateInput>
    /**
     * Choose, which Stock to update.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock updateMany
   */
  export type StockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stocks.
     */
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyInput>
    /**
     * Filter which Stocks to update
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to update.
     */
    limit?: number
  }

  /**
   * Stock updateManyAndReturn
   */
  export type StockUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * The data used to update Stocks.
     */
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyInput>
    /**
     * Filter which Stocks to update
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stock upsert
   */
  export type StockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The filter to search for the Stock to update in case it exists.
     */
    where: StockWhereUniqueInput
    /**
     * In case the Stock found by the `where` argument doesn't exist, create a new Stock with this data.
     */
    create: XOR<StockCreateInput, StockUncheckedCreateInput>
    /**
     * In case the Stock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockUpdateInput, StockUncheckedUpdateInput>
  }

  /**
   * Stock delete
   */
  export type StockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter which Stock to delete.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock deleteMany
   */
  export type StockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stocks to delete
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to delete.
     */
    limit?: number
  }

  /**
   * Stock.report
   */
  export type Stock$reportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
  }

  /**
   * Stock without action
   */
  export type StockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
  }


  /**
   * Model Exchange
   */

  export type AggregateExchange = {
    _count: ExchangeCountAggregateOutputType | null
    _avg: ExchangeAvgAggregateOutputType | null
    _sum: ExchangeSumAggregateOutputType | null
    _min: ExchangeMinAggregateOutputType | null
    _max: ExchangeMaxAggregateOutputType | null
  }

  export type ExchangeAvgAggregateOutputType = {
    exchangeRate: number | null
    amountFrom: number | null
    amountTo: number | null
    balanceUSDAfter: number | null
    balanceSYPAfter: number | null
  }

  export type ExchangeSumAggregateOutputType = {
    exchangeRate: number | null
    amountFrom: number | null
    amountTo: number | null
    balanceUSDAfter: number | null
    balanceSYPAfter: number | null
  }

  export type ExchangeMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    fromCurrency: $Enums.CurrencyType | null
    toCurrency: $Enums.CurrencyType | null
    exchangeRate: number | null
    amountFrom: number | null
    amountTo: number | null
    balanceUSDAfter: number | null
    balanceSYPAfter: number | null
    reportId: string | null
    storeId: string | null
  }

  export type ExchangeMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    fromCurrency: $Enums.CurrencyType | null
    toCurrency: $Enums.CurrencyType | null
    exchangeRate: number | null
    amountFrom: number | null
    amountTo: number | null
    balanceUSDAfter: number | null
    balanceSYPAfter: number | null
    reportId: string | null
    storeId: string | null
  }

  export type ExchangeCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    fromCurrency: number
    toCurrency: number
    exchangeRate: number
    amountFrom: number
    amountTo: number
    balanceUSDAfter: number
    balanceSYPAfter: number
    reportId: number
    storeId: number
    _all: number
  }


  export type ExchangeAvgAggregateInputType = {
    exchangeRate?: true
    amountFrom?: true
    amountTo?: true
    balanceUSDAfter?: true
    balanceSYPAfter?: true
  }

  export type ExchangeSumAggregateInputType = {
    exchangeRate?: true
    amountFrom?: true
    amountTo?: true
    balanceUSDAfter?: true
    balanceSYPAfter?: true
  }

  export type ExchangeMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    fromCurrency?: true
    toCurrency?: true
    exchangeRate?: true
    amountFrom?: true
    amountTo?: true
    balanceUSDAfter?: true
    balanceSYPAfter?: true
    reportId?: true
    storeId?: true
  }

  export type ExchangeMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    fromCurrency?: true
    toCurrency?: true
    exchangeRate?: true
    amountFrom?: true
    amountTo?: true
    balanceUSDAfter?: true
    balanceSYPAfter?: true
    reportId?: true
    storeId?: true
  }

  export type ExchangeCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    fromCurrency?: true
    toCurrency?: true
    exchangeRate?: true
    amountFrom?: true
    amountTo?: true
    balanceUSDAfter?: true
    balanceSYPAfter?: true
    reportId?: true
    storeId?: true
    _all?: true
  }

  export type ExchangeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exchange to aggregate.
     */
    where?: ExchangeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exchanges to fetch.
     */
    orderBy?: ExchangeOrderByWithRelationInput | ExchangeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExchangeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exchanges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exchanges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exchanges
    **/
    _count?: true | ExchangeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExchangeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExchangeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExchangeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExchangeMaxAggregateInputType
  }

  export type GetExchangeAggregateType<T extends ExchangeAggregateArgs> = {
        [P in keyof T & keyof AggregateExchange]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExchange[P]>
      : GetScalarType<T[P], AggregateExchange[P]>
  }




  export type ExchangeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeWhereInput
    orderBy?: ExchangeOrderByWithAggregationInput | ExchangeOrderByWithAggregationInput[]
    by: ExchangeScalarFieldEnum[] | ExchangeScalarFieldEnum
    having?: ExchangeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExchangeCountAggregateInputType | true
    _avg?: ExchangeAvgAggregateInputType
    _sum?: ExchangeSumAggregateInputType
    _min?: ExchangeMinAggregateInputType
    _max?: ExchangeMaxAggregateInputType
  }

  export type ExchangeGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    fromCurrency: $Enums.CurrencyType | null
    toCurrency: $Enums.CurrencyType | null
    exchangeRate: number | null
    amountFrom: number | null
    amountTo: number | null
    balanceUSDAfter: number
    balanceSYPAfter: number
    reportId: string | null
    storeId: string
    _count: ExchangeCountAggregateOutputType | null
    _avg: ExchangeAvgAggregateOutputType | null
    _sum: ExchangeSumAggregateOutputType | null
    _min: ExchangeMinAggregateOutputType | null
    _max: ExchangeMaxAggregateOutputType | null
  }

  type GetExchangeGroupByPayload<T extends ExchangeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExchangeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExchangeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExchangeGroupByOutputType[P]>
            : GetScalarType<T[P], ExchangeGroupByOutputType[P]>
        }
      >
    >


  export type ExchangeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fromCurrency?: boolean
    toCurrency?: boolean
    exchangeRate?: boolean
    amountFrom?: boolean
    amountTo?: boolean
    balanceUSDAfter?: boolean
    balanceSYPAfter?: boolean
    reportId?: boolean
    storeId?: boolean
    report?: boolean | Exchange$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchange"]>

  export type ExchangeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fromCurrency?: boolean
    toCurrency?: boolean
    exchangeRate?: boolean
    amountFrom?: boolean
    amountTo?: boolean
    balanceUSDAfter?: boolean
    balanceSYPAfter?: boolean
    reportId?: boolean
    storeId?: boolean
    report?: boolean | Exchange$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchange"]>

  export type ExchangeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fromCurrency?: boolean
    toCurrency?: boolean
    exchangeRate?: boolean
    amountFrom?: boolean
    amountTo?: boolean
    balanceUSDAfter?: boolean
    balanceSYPAfter?: boolean
    reportId?: boolean
    storeId?: boolean
    report?: boolean | Exchange$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchange"]>

  export type ExchangeSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    fromCurrency?: boolean
    toCurrency?: boolean
    exchangeRate?: boolean
    amountFrom?: boolean
    amountTo?: boolean
    balanceUSDAfter?: boolean
    balanceSYPAfter?: boolean
    reportId?: boolean
    storeId?: boolean
  }

  export type ExchangeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "fromCurrency" | "toCurrency" | "exchangeRate" | "amountFrom" | "amountTo" | "balanceUSDAfter" | "balanceSYPAfter" | "reportId" | "storeId", ExtArgs["result"]["exchange"]>
  export type ExchangeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | Exchange$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type ExchangeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | Exchange$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type ExchangeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | Exchange$reportArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }

  export type $ExchangePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Exchange"
    objects: {
      report: Prisma.$ReportPayload<ExtArgs> | null
      store: Prisma.$StorePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      fromCurrency: $Enums.CurrencyType | null
      toCurrency: $Enums.CurrencyType | null
      exchangeRate: number | null
      amountFrom: number | null
      amountTo: number | null
      balanceUSDAfter: number
      balanceSYPAfter: number
      reportId: string | null
      storeId: string
    }, ExtArgs["result"]["exchange"]>
    composites: {}
  }

  type ExchangeGetPayload<S extends boolean | null | undefined | ExchangeDefaultArgs> = $Result.GetResult<Prisma.$ExchangePayload, S>

  type ExchangeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExchangeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExchangeCountAggregateInputType | true
    }

  export interface ExchangeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Exchange'], meta: { name: 'Exchange' } }
    /**
     * Find zero or one Exchange that matches the filter.
     * @param {ExchangeFindUniqueArgs} args - Arguments to find a Exchange
     * @example
     * // Get one Exchange
     * const exchange = await prisma.exchange.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExchangeFindUniqueArgs>(args: SelectSubset<T, ExchangeFindUniqueArgs<ExtArgs>>): Prisma__ExchangeClient<$Result.GetResult<Prisma.$ExchangePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Exchange that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExchangeFindUniqueOrThrowArgs} args - Arguments to find a Exchange
     * @example
     * // Get one Exchange
     * const exchange = await prisma.exchange.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExchangeFindUniqueOrThrowArgs>(args: SelectSubset<T, ExchangeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExchangeClient<$Result.GetResult<Prisma.$ExchangePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exchange that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeFindFirstArgs} args - Arguments to find a Exchange
     * @example
     * // Get one Exchange
     * const exchange = await prisma.exchange.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExchangeFindFirstArgs>(args?: SelectSubset<T, ExchangeFindFirstArgs<ExtArgs>>): Prisma__ExchangeClient<$Result.GetResult<Prisma.$ExchangePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exchange that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeFindFirstOrThrowArgs} args - Arguments to find a Exchange
     * @example
     * // Get one Exchange
     * const exchange = await prisma.exchange.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExchangeFindFirstOrThrowArgs>(args?: SelectSubset<T, ExchangeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExchangeClient<$Result.GetResult<Prisma.$ExchangePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Exchanges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exchanges
     * const exchanges = await prisma.exchange.findMany()
     * 
     * // Get first 10 Exchanges
     * const exchanges = await prisma.exchange.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exchangeWithIdOnly = await prisma.exchange.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExchangeFindManyArgs>(args?: SelectSubset<T, ExchangeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Exchange.
     * @param {ExchangeCreateArgs} args - Arguments to create a Exchange.
     * @example
     * // Create one Exchange
     * const Exchange = await prisma.exchange.create({
     *   data: {
     *     // ... data to create a Exchange
     *   }
     * })
     * 
     */
    create<T extends ExchangeCreateArgs>(args: SelectSubset<T, ExchangeCreateArgs<ExtArgs>>): Prisma__ExchangeClient<$Result.GetResult<Prisma.$ExchangePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Exchanges.
     * @param {ExchangeCreateManyArgs} args - Arguments to create many Exchanges.
     * @example
     * // Create many Exchanges
     * const exchange = await prisma.exchange.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExchangeCreateManyArgs>(args?: SelectSubset<T, ExchangeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Exchanges and returns the data saved in the database.
     * @param {ExchangeCreateManyAndReturnArgs} args - Arguments to create many Exchanges.
     * @example
     * // Create many Exchanges
     * const exchange = await prisma.exchange.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Exchanges and only return the `id`
     * const exchangeWithIdOnly = await prisma.exchange.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExchangeCreateManyAndReturnArgs>(args?: SelectSubset<T, ExchangeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Exchange.
     * @param {ExchangeDeleteArgs} args - Arguments to delete one Exchange.
     * @example
     * // Delete one Exchange
     * const Exchange = await prisma.exchange.delete({
     *   where: {
     *     // ... filter to delete one Exchange
     *   }
     * })
     * 
     */
    delete<T extends ExchangeDeleteArgs>(args: SelectSubset<T, ExchangeDeleteArgs<ExtArgs>>): Prisma__ExchangeClient<$Result.GetResult<Prisma.$ExchangePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Exchange.
     * @param {ExchangeUpdateArgs} args - Arguments to update one Exchange.
     * @example
     * // Update one Exchange
     * const exchange = await prisma.exchange.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExchangeUpdateArgs>(args: SelectSubset<T, ExchangeUpdateArgs<ExtArgs>>): Prisma__ExchangeClient<$Result.GetResult<Prisma.$ExchangePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Exchanges.
     * @param {ExchangeDeleteManyArgs} args - Arguments to filter Exchanges to delete.
     * @example
     * // Delete a few Exchanges
     * const { count } = await prisma.exchange.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExchangeDeleteManyArgs>(args?: SelectSubset<T, ExchangeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exchanges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exchanges
     * const exchange = await prisma.exchange.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExchangeUpdateManyArgs>(args: SelectSubset<T, ExchangeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exchanges and returns the data updated in the database.
     * @param {ExchangeUpdateManyAndReturnArgs} args - Arguments to update many Exchanges.
     * @example
     * // Update many Exchanges
     * const exchange = await prisma.exchange.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Exchanges and only return the `id`
     * const exchangeWithIdOnly = await prisma.exchange.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExchangeUpdateManyAndReturnArgs>(args: SelectSubset<T, ExchangeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Exchange.
     * @param {ExchangeUpsertArgs} args - Arguments to update or create a Exchange.
     * @example
     * // Update or create a Exchange
     * const exchange = await prisma.exchange.upsert({
     *   create: {
     *     // ... data to create a Exchange
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exchange we want to update
     *   }
     * })
     */
    upsert<T extends ExchangeUpsertArgs>(args: SelectSubset<T, ExchangeUpsertArgs<ExtArgs>>): Prisma__ExchangeClient<$Result.GetResult<Prisma.$ExchangePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Exchanges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeCountArgs} args - Arguments to filter Exchanges to count.
     * @example
     * // Count the number of Exchanges
     * const count = await prisma.exchange.count({
     *   where: {
     *     // ... the filter for the Exchanges we want to count
     *   }
     * })
    **/
    count<T extends ExchangeCountArgs>(
      args?: Subset<T, ExchangeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExchangeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exchange.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExchangeAggregateArgs>(args: Subset<T, ExchangeAggregateArgs>): Prisma.PrismaPromise<GetExchangeAggregateType<T>>

    /**
     * Group by Exchange.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExchangeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExchangeGroupByArgs['orderBy'] }
        : { orderBy?: ExchangeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExchangeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExchangeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Exchange model
   */
  readonly fields: ExchangeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exchange.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExchangeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    report<T extends Exchange$reportArgs<ExtArgs> = {}>(args?: Subset<T, Exchange$reportArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Exchange model
   */
  interface ExchangeFieldRefs {
    readonly id: FieldRef<"Exchange", 'String'>
    readonly createdAt: FieldRef<"Exchange", 'DateTime'>
    readonly updatedAt: FieldRef<"Exchange", 'DateTime'>
    readonly fromCurrency: FieldRef<"Exchange", 'CurrencyType'>
    readonly toCurrency: FieldRef<"Exchange", 'CurrencyType'>
    readonly exchangeRate: FieldRef<"Exchange", 'Float'>
    readonly amountFrom: FieldRef<"Exchange", 'Float'>
    readonly amountTo: FieldRef<"Exchange", 'Float'>
    readonly balanceUSDAfter: FieldRef<"Exchange", 'Float'>
    readonly balanceSYPAfter: FieldRef<"Exchange", 'Float'>
    readonly reportId: FieldRef<"Exchange", 'String'>
    readonly storeId: FieldRef<"Exchange", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Exchange findUnique
   */
  export type ExchangeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exchange
     */
    select?: ExchangeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exchange
     */
    omit?: ExchangeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeInclude<ExtArgs> | null
    /**
     * Filter, which Exchange to fetch.
     */
    where: ExchangeWhereUniqueInput
  }

  /**
   * Exchange findUniqueOrThrow
   */
  export type ExchangeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exchange
     */
    select?: ExchangeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exchange
     */
    omit?: ExchangeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeInclude<ExtArgs> | null
    /**
     * Filter, which Exchange to fetch.
     */
    where: ExchangeWhereUniqueInput
  }

  /**
   * Exchange findFirst
   */
  export type ExchangeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exchange
     */
    select?: ExchangeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exchange
     */
    omit?: ExchangeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeInclude<ExtArgs> | null
    /**
     * Filter, which Exchange to fetch.
     */
    where?: ExchangeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exchanges to fetch.
     */
    orderBy?: ExchangeOrderByWithRelationInput | ExchangeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exchanges.
     */
    cursor?: ExchangeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exchanges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exchanges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exchanges.
     */
    distinct?: ExchangeScalarFieldEnum | ExchangeScalarFieldEnum[]
  }

  /**
   * Exchange findFirstOrThrow
   */
  export type ExchangeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exchange
     */
    select?: ExchangeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exchange
     */
    omit?: ExchangeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeInclude<ExtArgs> | null
    /**
     * Filter, which Exchange to fetch.
     */
    where?: ExchangeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exchanges to fetch.
     */
    orderBy?: ExchangeOrderByWithRelationInput | ExchangeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exchanges.
     */
    cursor?: ExchangeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exchanges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exchanges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exchanges.
     */
    distinct?: ExchangeScalarFieldEnum | ExchangeScalarFieldEnum[]
  }

  /**
   * Exchange findMany
   */
  export type ExchangeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exchange
     */
    select?: ExchangeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exchange
     */
    omit?: ExchangeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeInclude<ExtArgs> | null
    /**
     * Filter, which Exchanges to fetch.
     */
    where?: ExchangeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exchanges to fetch.
     */
    orderBy?: ExchangeOrderByWithRelationInput | ExchangeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exchanges.
     */
    cursor?: ExchangeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exchanges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exchanges.
     */
    skip?: number
    distinct?: ExchangeScalarFieldEnum | ExchangeScalarFieldEnum[]
  }

  /**
   * Exchange create
   */
  export type ExchangeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exchange
     */
    select?: ExchangeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exchange
     */
    omit?: ExchangeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeInclude<ExtArgs> | null
    /**
     * The data needed to create a Exchange.
     */
    data: XOR<ExchangeCreateInput, ExchangeUncheckedCreateInput>
  }

  /**
   * Exchange createMany
   */
  export type ExchangeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Exchanges.
     */
    data: ExchangeCreateManyInput | ExchangeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Exchange createManyAndReturn
   */
  export type ExchangeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exchange
     */
    select?: ExchangeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exchange
     */
    omit?: ExchangeOmit<ExtArgs> | null
    /**
     * The data used to create many Exchanges.
     */
    data: ExchangeCreateManyInput | ExchangeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exchange update
   */
  export type ExchangeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exchange
     */
    select?: ExchangeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exchange
     */
    omit?: ExchangeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeInclude<ExtArgs> | null
    /**
     * The data needed to update a Exchange.
     */
    data: XOR<ExchangeUpdateInput, ExchangeUncheckedUpdateInput>
    /**
     * Choose, which Exchange to update.
     */
    where: ExchangeWhereUniqueInput
  }

  /**
   * Exchange updateMany
   */
  export type ExchangeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Exchanges.
     */
    data: XOR<ExchangeUpdateManyMutationInput, ExchangeUncheckedUpdateManyInput>
    /**
     * Filter which Exchanges to update
     */
    where?: ExchangeWhereInput
    /**
     * Limit how many Exchanges to update.
     */
    limit?: number
  }

  /**
   * Exchange updateManyAndReturn
   */
  export type ExchangeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exchange
     */
    select?: ExchangeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exchange
     */
    omit?: ExchangeOmit<ExtArgs> | null
    /**
     * The data used to update Exchanges.
     */
    data: XOR<ExchangeUpdateManyMutationInput, ExchangeUncheckedUpdateManyInput>
    /**
     * Filter which Exchanges to update
     */
    where?: ExchangeWhereInput
    /**
     * Limit how many Exchanges to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exchange upsert
   */
  export type ExchangeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exchange
     */
    select?: ExchangeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exchange
     */
    omit?: ExchangeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeInclude<ExtArgs> | null
    /**
     * The filter to search for the Exchange to update in case it exists.
     */
    where: ExchangeWhereUniqueInput
    /**
     * In case the Exchange found by the `where` argument doesn't exist, create a new Exchange with this data.
     */
    create: XOR<ExchangeCreateInput, ExchangeUncheckedCreateInput>
    /**
     * In case the Exchange was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExchangeUpdateInput, ExchangeUncheckedUpdateInput>
  }

  /**
   * Exchange delete
   */
  export type ExchangeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exchange
     */
    select?: ExchangeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exchange
     */
    omit?: ExchangeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeInclude<ExtArgs> | null
    /**
     * Filter which Exchange to delete.
     */
    where: ExchangeWhereUniqueInput
  }

  /**
   * Exchange deleteMany
   */
  export type ExchangeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exchanges to delete
     */
    where?: ExchangeWhereInput
    /**
     * Limit how many Exchanges to delete.
     */
    limit?: number
  }

  /**
   * Exchange.report
   */
  export type Exchange$reportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
  }

  /**
   * Exchange without action
   */
  export type ExchangeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exchange
     */
    select?: ExchangeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exchange
     */
    omit?: ExchangeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeInclude<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportAvgAggregateOutputType = {
    openingUSD: number | null
    closingUSD: number | null
    openingSYP: number | null
    closingSYP: number | null
    openingGold14: number | null
    closingGold14: number | null
    openingGold18: number | null
    closingGold18: number | null
    openingGold21: number | null
    closingGold21: number | null
    openingGold24: number | null
    closingGold24: number | null
    priceGold14USD: number | null
    priceGold18USD: number | null
    priceGold21USD: number | null
    priceGold24USD: number | null
    priceGold14SYP: number | null
    priceGold18SYP: number | null
    priceGold21SYP: number | null
    priceGold24SYP: number | null
    exchangeRateUSDtoSYP: number | null
    totalGoldSold: number | null
    totalSalesUSD: number | null
    totalSalesSYP: number | null
    profitUSD: number | null
    profitSYP: number | null
  }

  export type ReportSumAggregateOutputType = {
    openingUSD: number | null
    closingUSD: number | null
    openingSYP: number | null
    closingSYP: number | null
    openingGold14: number | null
    closingGold14: number | null
    openingGold18: number | null
    closingGold18: number | null
    openingGold21: number | null
    closingGold21: number | null
    openingGold24: number | null
    closingGold24: number | null
    priceGold14USD: number | null
    priceGold18USD: number | null
    priceGold21USD: number | null
    priceGold24USD: number | null
    priceGold14SYP: number | null
    priceGold18SYP: number | null
    priceGold21SYP: number | null
    priceGold24SYP: number | null
    exchangeRateUSDtoSYP: number | null
    totalGoldSold: number | null
    totalSalesUSD: number | null
    totalSalesSYP: number | null
    profitUSD: number | null
    profitSYP: number | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    date: Date | null
    openingUSD: number | null
    closingUSD: number | null
    openingSYP: number | null
    closingSYP: number | null
    openingGold14: number | null
    closingGold14: number | null
    openingGold18: number | null
    closingGold18: number | null
    openingGold21: number | null
    closingGold21: number | null
    openingGold24: number | null
    closingGold24: number | null
    priceGold14USD: number | null
    priceGold18USD: number | null
    priceGold21USD: number | null
    priceGold24USD: number | null
    priceGold14SYP: number | null
    priceGold18SYP: number | null
    priceGold21SYP: number | null
    priceGold24SYP: number | null
    exchangeRateUSDtoSYP: number | null
    totalGoldSold: number | null
    totalSalesUSD: number | null
    totalSalesSYP: number | null
    profitUSD: number | null
    profitSYP: number | null
    notes: string | null
    status: $Enums.DayStatus | null
    createdAt: Date | null
    storeId: string | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    openingUSD: number | null
    closingUSD: number | null
    openingSYP: number | null
    closingSYP: number | null
    openingGold14: number | null
    closingGold14: number | null
    openingGold18: number | null
    closingGold18: number | null
    openingGold21: number | null
    closingGold21: number | null
    openingGold24: number | null
    closingGold24: number | null
    priceGold14USD: number | null
    priceGold18USD: number | null
    priceGold21USD: number | null
    priceGold24USD: number | null
    priceGold14SYP: number | null
    priceGold18SYP: number | null
    priceGold21SYP: number | null
    priceGold24SYP: number | null
    exchangeRateUSDtoSYP: number | null
    totalGoldSold: number | null
    totalSalesUSD: number | null
    totalSalesSYP: number | null
    profitUSD: number | null
    profitSYP: number | null
    notes: string | null
    status: $Enums.DayStatus | null
    createdAt: Date | null
    storeId: string | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    date: number
    openingUSD: number
    closingUSD: number
    openingSYP: number
    closingSYP: number
    openingGold14: number
    closingGold14: number
    openingGold18: number
    closingGold18: number
    openingGold21: number
    closingGold21: number
    openingGold24: number
    closingGold24: number
    priceGold14USD: number
    priceGold18USD: number
    priceGold21USD: number
    priceGold24USD: number
    priceGold14SYP: number
    priceGold18SYP: number
    priceGold21SYP: number
    priceGold24SYP: number
    exchangeRateUSDtoSYP: number
    totalGoldSold: number
    totalSalesUSD: number
    totalSalesSYP: number
    profitUSD: number
    profitSYP: number
    notes: number
    status: number
    createdAt: number
    storeId: number
    _all: number
  }


  export type ReportAvgAggregateInputType = {
    openingUSD?: true
    closingUSD?: true
    openingSYP?: true
    closingSYP?: true
    openingGold14?: true
    closingGold14?: true
    openingGold18?: true
    closingGold18?: true
    openingGold21?: true
    closingGold21?: true
    openingGold24?: true
    closingGold24?: true
    priceGold14USD?: true
    priceGold18USD?: true
    priceGold21USD?: true
    priceGold24USD?: true
    priceGold14SYP?: true
    priceGold18SYP?: true
    priceGold21SYP?: true
    priceGold24SYP?: true
    exchangeRateUSDtoSYP?: true
    totalGoldSold?: true
    totalSalesUSD?: true
    totalSalesSYP?: true
    profitUSD?: true
    profitSYP?: true
  }

  export type ReportSumAggregateInputType = {
    openingUSD?: true
    closingUSD?: true
    openingSYP?: true
    closingSYP?: true
    openingGold14?: true
    closingGold14?: true
    openingGold18?: true
    closingGold18?: true
    openingGold21?: true
    closingGold21?: true
    openingGold24?: true
    closingGold24?: true
    priceGold14USD?: true
    priceGold18USD?: true
    priceGold21USD?: true
    priceGold24USD?: true
    priceGold14SYP?: true
    priceGold18SYP?: true
    priceGold21SYP?: true
    priceGold24SYP?: true
    exchangeRateUSDtoSYP?: true
    totalGoldSold?: true
    totalSalesUSD?: true
    totalSalesSYP?: true
    profitUSD?: true
    profitSYP?: true
  }

  export type ReportMinAggregateInputType = {
    id?: true
    date?: true
    openingUSD?: true
    closingUSD?: true
    openingSYP?: true
    closingSYP?: true
    openingGold14?: true
    closingGold14?: true
    openingGold18?: true
    closingGold18?: true
    openingGold21?: true
    closingGold21?: true
    openingGold24?: true
    closingGold24?: true
    priceGold14USD?: true
    priceGold18USD?: true
    priceGold21USD?: true
    priceGold24USD?: true
    priceGold14SYP?: true
    priceGold18SYP?: true
    priceGold21SYP?: true
    priceGold24SYP?: true
    exchangeRateUSDtoSYP?: true
    totalGoldSold?: true
    totalSalesUSD?: true
    totalSalesSYP?: true
    profitUSD?: true
    profitSYP?: true
    notes?: true
    status?: true
    createdAt?: true
    storeId?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    date?: true
    openingUSD?: true
    closingUSD?: true
    openingSYP?: true
    closingSYP?: true
    openingGold14?: true
    closingGold14?: true
    openingGold18?: true
    closingGold18?: true
    openingGold21?: true
    closingGold21?: true
    openingGold24?: true
    closingGold24?: true
    priceGold14USD?: true
    priceGold18USD?: true
    priceGold21USD?: true
    priceGold24USD?: true
    priceGold14SYP?: true
    priceGold18SYP?: true
    priceGold21SYP?: true
    priceGold24SYP?: true
    exchangeRateUSDtoSYP?: true
    totalGoldSold?: true
    totalSalesUSD?: true
    totalSalesSYP?: true
    profitUSD?: true
    profitSYP?: true
    notes?: true
    status?: true
    createdAt?: true
    storeId?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    date?: true
    openingUSD?: true
    closingUSD?: true
    openingSYP?: true
    closingSYP?: true
    openingGold14?: true
    closingGold14?: true
    openingGold18?: true
    closingGold18?: true
    openingGold21?: true
    closingGold21?: true
    openingGold24?: true
    closingGold24?: true
    priceGold14USD?: true
    priceGold18USD?: true
    priceGold21USD?: true
    priceGold24USD?: true
    priceGold14SYP?: true
    priceGold18SYP?: true
    priceGold21SYP?: true
    priceGold24SYP?: true
    exchangeRateUSDtoSYP?: true
    totalGoldSold?: true
    totalSalesUSD?: true
    totalSalesSYP?: true
    profitUSD?: true
    profitSYP?: true
    notes?: true
    status?: true
    createdAt?: true
    storeId?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _avg?: ReportAvgAggregateInputType
    _sum?: ReportSumAggregateInputType
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: string
    date: Date
    openingUSD: number
    closingUSD: number
    openingSYP: number
    closingSYP: number
    openingGold14: number
    closingGold14: number
    openingGold18: number
    closingGold18: number
    openingGold21: number
    closingGold21: number
    openingGold24: number
    closingGold24: number
    priceGold14USD: number
    priceGold18USD: number
    priceGold21USD: number
    priceGold24USD: number
    priceGold14SYP: number
    priceGold18SYP: number
    priceGold21SYP: number
    priceGold24SYP: number
    exchangeRateUSDtoSYP: number
    totalGoldSold: number
    totalSalesUSD: number
    totalSalesSYP: number
    profitUSD: number
    profitSYP: number
    notes: string | null
    status: $Enums.DayStatus
    createdAt: Date
    storeId: string
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    openingUSD?: boolean
    closingUSD?: boolean
    openingSYP?: boolean
    closingSYP?: boolean
    openingGold14?: boolean
    closingGold14?: boolean
    openingGold18?: boolean
    closingGold18?: boolean
    openingGold21?: boolean
    closingGold21?: boolean
    openingGold24?: boolean
    closingGold24?: boolean
    priceGold14USD?: boolean
    priceGold18USD?: boolean
    priceGold21USD?: boolean
    priceGold24USD?: boolean
    priceGold14SYP?: boolean
    priceGold18SYP?: boolean
    priceGold21SYP?: boolean
    priceGold24SYP?: boolean
    exchangeRateUSDtoSYP?: boolean
    totalGoldSold?: boolean
    totalSalesUSD?: boolean
    totalSalesSYP?: boolean
    profitUSD?: boolean
    profitSYP?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    storeId?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
    sales?: boolean | Report$salesArgs<ExtArgs>
    stocks?: boolean | Report$stocksArgs<ExtArgs>
    exchanges?: boolean | Report$exchangesArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    openingUSD?: boolean
    closingUSD?: boolean
    openingSYP?: boolean
    closingSYP?: boolean
    openingGold14?: boolean
    closingGold14?: boolean
    openingGold18?: boolean
    closingGold18?: boolean
    openingGold21?: boolean
    closingGold21?: boolean
    openingGold24?: boolean
    closingGold24?: boolean
    priceGold14USD?: boolean
    priceGold18USD?: boolean
    priceGold21USD?: boolean
    priceGold24USD?: boolean
    priceGold14SYP?: boolean
    priceGold18SYP?: boolean
    priceGold21SYP?: boolean
    priceGold24SYP?: boolean
    exchangeRateUSDtoSYP?: boolean
    totalGoldSold?: boolean
    totalSalesUSD?: boolean
    totalSalesSYP?: boolean
    profitUSD?: boolean
    profitSYP?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    storeId?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    openingUSD?: boolean
    closingUSD?: boolean
    openingSYP?: boolean
    closingSYP?: boolean
    openingGold14?: boolean
    closingGold14?: boolean
    openingGold18?: boolean
    closingGold18?: boolean
    openingGold21?: boolean
    closingGold21?: boolean
    openingGold24?: boolean
    closingGold24?: boolean
    priceGold14USD?: boolean
    priceGold18USD?: boolean
    priceGold21USD?: boolean
    priceGold24USD?: boolean
    priceGold14SYP?: boolean
    priceGold18SYP?: boolean
    priceGold21SYP?: boolean
    priceGold24SYP?: boolean
    exchangeRateUSDtoSYP?: boolean
    totalGoldSold?: boolean
    totalSalesUSD?: boolean
    totalSalesSYP?: boolean
    profitUSD?: boolean
    profitSYP?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    storeId?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    date?: boolean
    openingUSD?: boolean
    closingUSD?: boolean
    openingSYP?: boolean
    closingSYP?: boolean
    openingGold14?: boolean
    closingGold14?: boolean
    openingGold18?: boolean
    closingGold18?: boolean
    openingGold21?: boolean
    closingGold21?: boolean
    openingGold24?: boolean
    closingGold24?: boolean
    priceGold14USD?: boolean
    priceGold18USD?: boolean
    priceGold21USD?: boolean
    priceGold24USD?: boolean
    priceGold14SYP?: boolean
    priceGold18SYP?: boolean
    priceGold21SYP?: boolean
    priceGold24SYP?: boolean
    exchangeRateUSDtoSYP?: boolean
    totalGoldSold?: boolean
    totalSalesUSD?: boolean
    totalSalesSYP?: boolean
    profitUSD?: boolean
    profitSYP?: boolean
    notes?: boolean
    status?: boolean
    createdAt?: boolean
    storeId?: boolean
  }

  export type ReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "openingUSD" | "closingUSD" | "openingSYP" | "closingSYP" | "openingGold14" | "closingGold14" | "openingGold18" | "closingGold18" | "openingGold21" | "closingGold21" | "openingGold24" | "closingGold24" | "priceGold14USD" | "priceGold18USD" | "priceGold21USD" | "priceGold24USD" | "priceGold14SYP" | "priceGold18SYP" | "priceGold21SYP" | "priceGold24SYP" | "exchangeRateUSDtoSYP" | "totalGoldSold" | "totalSalesUSD" | "totalSalesSYP" | "profitUSD" | "profitSYP" | "notes" | "status" | "createdAt" | "storeId", ExtArgs["result"]["report"]>
  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
    sales?: boolean | Report$salesArgs<ExtArgs>
    stocks?: boolean | Report$stocksArgs<ExtArgs>
    exchanges?: boolean | Report$exchangesArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type ReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      store: Prisma.$StorePayload<ExtArgs>
      sales: Prisma.$SalePayload<ExtArgs>[]
      stocks: Prisma.$StockPayload<ExtArgs>[]
      exchanges: Prisma.$ExchangePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      openingUSD: number
      closingUSD: number
      openingSYP: number
      closingSYP: number
      openingGold14: number
      closingGold14: number
      openingGold18: number
      closingGold18: number
      openingGold21: number
      closingGold21: number
      openingGold24: number
      closingGold24: number
      priceGold14USD: number
      priceGold18USD: number
      priceGold21USD: number
      priceGold24USD: number
      priceGold14SYP: number
      priceGold18SYP: number
      priceGold21SYP: number
      priceGold24SYP: number
      exchangeRateUSDtoSYP: number
      totalGoldSold: number
      totalSalesUSD: number
      totalSalesSYP: number
      profitUSD: number
      profitSYP: number
      notes: string | null
      status: $Enums.DayStatus
      createdAt: Date
      storeId: string
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reports and returns the data saved in the database.
     * @param {ReportCreateManyAndReturnArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports and returns the data updated in the database.
     * @param {ReportUpdateManyAndReturnArgs} args - Arguments to update many Reports.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sales<T extends Report$salesArgs<ExtArgs> = {}>(args?: Subset<T, Report$salesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    stocks<T extends Report$stocksArgs<ExtArgs> = {}>(args?: Subset<T, Report$stocksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exchanges<T extends Report$exchangesArgs<ExtArgs> = {}>(args?: Subset<T, Report$exchangesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Report model
   */
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'String'>
    readonly date: FieldRef<"Report", 'DateTime'>
    readonly openingUSD: FieldRef<"Report", 'Float'>
    readonly closingUSD: FieldRef<"Report", 'Float'>
    readonly openingSYP: FieldRef<"Report", 'Float'>
    readonly closingSYP: FieldRef<"Report", 'Float'>
    readonly openingGold14: FieldRef<"Report", 'Float'>
    readonly closingGold14: FieldRef<"Report", 'Float'>
    readonly openingGold18: FieldRef<"Report", 'Float'>
    readonly closingGold18: FieldRef<"Report", 'Float'>
    readonly openingGold21: FieldRef<"Report", 'Float'>
    readonly closingGold21: FieldRef<"Report", 'Float'>
    readonly openingGold24: FieldRef<"Report", 'Float'>
    readonly closingGold24: FieldRef<"Report", 'Float'>
    readonly priceGold14USD: FieldRef<"Report", 'Float'>
    readonly priceGold18USD: FieldRef<"Report", 'Float'>
    readonly priceGold21USD: FieldRef<"Report", 'Float'>
    readonly priceGold24USD: FieldRef<"Report", 'Float'>
    readonly priceGold14SYP: FieldRef<"Report", 'Float'>
    readonly priceGold18SYP: FieldRef<"Report", 'Float'>
    readonly priceGold21SYP: FieldRef<"Report", 'Float'>
    readonly priceGold24SYP: FieldRef<"Report", 'Float'>
    readonly exchangeRateUSDtoSYP: FieldRef<"Report", 'Float'>
    readonly totalGoldSold: FieldRef<"Report", 'Float'>
    readonly totalSalesUSD: FieldRef<"Report", 'Float'>
    readonly totalSalesSYP: FieldRef<"Report", 'Float'>
    readonly profitUSD: FieldRef<"Report", 'Float'>
    readonly profitSYP: FieldRef<"Report", 'Float'>
    readonly notes: FieldRef<"Report", 'String'>
    readonly status: FieldRef<"Report", 'DayStatus'>
    readonly createdAt: FieldRef<"Report", 'DateTime'>
    readonly storeId: FieldRef<"Report", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Report createManyAndReturn
   */
  export type ReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
  }

  /**
   * Report updateManyAndReturn
   */
  export type ReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to delete.
     */
    limit?: number
  }

  /**
   * Report.sales
   */
  export type Report$salesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sale
     */
    select?: SaleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sale
     */
    omit?: SaleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SaleInclude<ExtArgs> | null
    where?: SaleWhereInput
    orderBy?: SaleOrderByWithRelationInput | SaleOrderByWithRelationInput[]
    cursor?: SaleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SaleScalarFieldEnum | SaleScalarFieldEnum[]
  }

  /**
   * Report.stocks
   */
  export type Report$stocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    where?: StockWhereInput
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    cursor?: StockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Report.exchanges
   */
  export type Report$exchangesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exchange
     */
    select?: ExchangeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exchange
     */
    omit?: ExchangeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeInclude<ExtArgs> | null
    where?: ExchangeWhereInput
    orderBy?: ExchangeOrderByWithRelationInput | ExchangeOrderByWithRelationInput[]
    cursor?: ExchangeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExchangeScalarFieldEnum | ExchangeScalarFieldEnum[]
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    phoneNumber: 'phoneNumber',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StoreScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    city: 'city',
    logoUrl: 'logoUrl',
    primaryPhoneNumber: 'primaryPhoneNumber',
    secondaryPhoneNumber: 'secondaryPhoneNumber',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    currentGold14: 'currentGold14',
    currentGold18: 'currentGold18',
    currentGold21: 'currentGold21',
    currentGold24: 'currentGold24',
    currentUSD: 'currentUSD',
    currentSYP: 'currentSYP',
    priceGold14USD: 'priceGold14USD',
    priceGold18USD: 'priceGold18USD',
    priceGold21USD: 'priceGold21USD',
    priceGold24USD: 'priceGold24USD',
    exchangeRateUSDtoSYP: 'exchangeRateUSDtoSYP',
    ownerId: 'ownerId'
  };

  export type StoreScalarFieldEnum = (typeof StoreScalarFieldEnum)[keyof typeof StoreScalarFieldEnum]


  export const SaleScalarFieldEnum: {
    id: 'id',
    invoiceNumber: 'invoiceNumber',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    weight: 'weight',
    goldType: 'goldType',
    pricePerGramUSD: 'pricePerGramUSD',
    pricePerGramSYP: 'pricePerGramSYP',
    totalUSD: 'totalUSD',
    totalSYP: 'totalSYP',
    currency: 'currency',
    paymentType: 'paymentType',
    amountPaid: 'amountPaid',
    customerName: 'customerName',
    customerPhone: 'customerPhone',
    description: 'description',
    reportId: 'reportId',
    storeId: 'storeId',
    profitUSD: 'profitUSD',
    profitSYP: 'profitSYP'
  };

  export type SaleScalarFieldEnum = (typeof SaleScalarFieldEnum)[keyof typeof SaleScalarFieldEnum]


  export const StockScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    goldType: 'goldType',
    quantity: 'quantity',
    type: 'type',
    balanceAfter: 'balanceAfter',
    costPerGramUSD: 'costPerGramUSD',
    totalCostUSD: 'totalCostUSD',
    totalCostSYP: 'totalCostSYP',
    supplier: 'supplier',
    invoiceRef: 'invoiceRef',
    note: 'note',
    reportId: 'reportId',
    storeId: 'storeId'
  };

  export type StockScalarFieldEnum = (typeof StockScalarFieldEnum)[keyof typeof StockScalarFieldEnum]


  export const ExchangeScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    fromCurrency: 'fromCurrency',
    toCurrency: 'toCurrency',
    exchangeRate: 'exchangeRate',
    amountFrom: 'amountFrom',
    amountTo: 'amountTo',
    balanceUSDAfter: 'balanceUSDAfter',
    balanceSYPAfter: 'balanceSYPAfter',
    reportId: 'reportId',
    storeId: 'storeId'
  };

  export type ExchangeScalarFieldEnum = (typeof ExchangeScalarFieldEnum)[keyof typeof ExchangeScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    date: 'date',
    openingUSD: 'openingUSD',
    closingUSD: 'closingUSD',
    openingSYP: 'openingSYP',
    closingSYP: 'closingSYP',
    openingGold14: 'openingGold14',
    closingGold14: 'closingGold14',
    openingGold18: 'openingGold18',
    closingGold18: 'closingGold18',
    openingGold21: 'openingGold21',
    closingGold21: 'closingGold21',
    openingGold24: 'openingGold24',
    closingGold24: 'closingGold24',
    priceGold14USD: 'priceGold14USD',
    priceGold18USD: 'priceGold18USD',
    priceGold21USD: 'priceGold21USD',
    priceGold24USD: 'priceGold24USD',
    priceGold14SYP: 'priceGold14SYP',
    priceGold18SYP: 'priceGold18SYP',
    priceGold21SYP: 'priceGold21SYP',
    priceGold24SYP: 'priceGold24SYP',
    exchangeRateUSDtoSYP: 'exchangeRateUSDtoSYP',
    totalGoldSold: 'totalGoldSold',
    totalSalesUSD: 'totalSalesUSD',
    totalSalesSYP: 'totalSalesSYP',
    profitUSD: 'profitUSD',
    profitSYP: 'profitSYP',
    notes: 'notes',
    status: 'status',
    createdAt: 'createdAt',
    storeId: 'storeId'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'StoreStatus'
   */
  export type EnumStoreStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StoreStatus'>
    


  /**
   * Reference to a field of type 'StoreStatus[]'
   */
  export type ListEnumStoreStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StoreStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'GoldType'
   */
  export type EnumGoldTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GoldType'>
    


  /**
   * Reference to a field of type 'GoldType[]'
   */
  export type ListEnumGoldTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GoldType[]'>
    


  /**
   * Reference to a field of type 'CurrencyType'
   */
  export type EnumCurrencyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CurrencyType'>
    


  /**
   * Reference to a field of type 'CurrencyType[]'
   */
  export type ListEnumCurrencyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CurrencyType[]'>
    


  /**
   * Reference to a field of type 'PaymentType'
   */
  export type EnumPaymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentType'>
    


  /**
   * Reference to a field of type 'PaymentType[]'
   */
  export type ListEnumPaymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentType[]'>
    


  /**
   * Reference to a field of type 'StockType'
   */
  export type EnumStockTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StockType'>
    


  /**
   * Reference to a field of type 'StockType[]'
   */
  export type ListEnumStockTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StockType[]'>
    


  /**
   * Reference to a field of type 'DayStatus'
   */
  export type EnumDayStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayStatus'>
    


  /**
   * Reference to a field of type 'DayStatus[]'
   */
  export type ListEnumDayStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    phoneNumber?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    stores?: StoreListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stores?: StoreOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    phoneNumber?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    stores?: StoreListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StoreWhereInput = {
    AND?: StoreWhereInput | StoreWhereInput[]
    OR?: StoreWhereInput[]
    NOT?: StoreWhereInput | StoreWhereInput[]
    id?: StringFilter<"Store"> | string
    name?: StringFilter<"Store"> | string
    address?: StringNullableFilter<"Store"> | string | null
    city?: StringNullableFilter<"Store"> | string | null
    logoUrl?: StringNullableFilter<"Store"> | string | null
    primaryPhoneNumber?: StringNullableFilter<"Store"> | string | null
    secondaryPhoneNumber?: StringNullableFilter<"Store"> | string | null
    status?: EnumStoreStatusFilter<"Store"> | $Enums.StoreStatus
    createdAt?: DateTimeFilter<"Store"> | Date | string
    updatedAt?: DateTimeFilter<"Store"> | Date | string
    currentGold14?: FloatFilter<"Store"> | number
    currentGold18?: FloatFilter<"Store"> | number
    currentGold21?: FloatFilter<"Store"> | number
    currentGold24?: FloatFilter<"Store"> | number
    currentUSD?: FloatFilter<"Store"> | number
    currentSYP?: FloatFilter<"Store"> | number
    priceGold14USD?: FloatFilter<"Store"> | number
    priceGold18USD?: FloatFilter<"Store"> | number
    priceGold21USD?: FloatFilter<"Store"> | number
    priceGold24USD?: FloatFilter<"Store"> | number
    exchangeRateUSDtoSYP?: FloatFilter<"Store"> | number
    ownerId?: StringFilter<"Store"> | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    sales?: SaleListRelationFilter
    stocks?: StockListRelationFilter
    exchanges?: ExchangeListRelationFilter
    reports?: ReportListRelationFilter
  }

  export type StoreOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    primaryPhoneNumber?: SortOrderInput | SortOrder
    secondaryPhoneNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    currentGold14?: SortOrder
    currentGold18?: SortOrder
    currentGold21?: SortOrder
    currentGold24?: SortOrder
    currentUSD?: SortOrder
    currentSYP?: SortOrder
    priceGold14USD?: SortOrder
    priceGold18USD?: SortOrder
    priceGold21USD?: SortOrder
    priceGold24USD?: SortOrder
    exchangeRateUSDtoSYP?: SortOrder
    ownerId?: SortOrder
    owner?: UserOrderByWithRelationInput
    sales?: SaleOrderByRelationAggregateInput
    stocks?: StockOrderByRelationAggregateInput
    exchanges?: ExchangeOrderByRelationAggregateInput
    reports?: ReportOrderByRelationAggregateInput
  }

  export type StoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: StoreWhereInput | StoreWhereInput[]
    OR?: StoreWhereInput[]
    NOT?: StoreWhereInput | StoreWhereInput[]
    address?: StringNullableFilter<"Store"> | string | null
    city?: StringNullableFilter<"Store"> | string | null
    logoUrl?: StringNullableFilter<"Store"> | string | null
    primaryPhoneNumber?: StringNullableFilter<"Store"> | string | null
    secondaryPhoneNumber?: StringNullableFilter<"Store"> | string | null
    status?: EnumStoreStatusFilter<"Store"> | $Enums.StoreStatus
    createdAt?: DateTimeFilter<"Store"> | Date | string
    updatedAt?: DateTimeFilter<"Store"> | Date | string
    currentGold14?: FloatFilter<"Store"> | number
    currentGold18?: FloatFilter<"Store"> | number
    currentGold21?: FloatFilter<"Store"> | number
    currentGold24?: FloatFilter<"Store"> | number
    currentUSD?: FloatFilter<"Store"> | number
    currentSYP?: FloatFilter<"Store"> | number
    priceGold14USD?: FloatFilter<"Store"> | number
    priceGold18USD?: FloatFilter<"Store"> | number
    priceGold21USD?: FloatFilter<"Store"> | number
    priceGold24USD?: FloatFilter<"Store"> | number
    exchangeRateUSDtoSYP?: FloatFilter<"Store"> | number
    ownerId?: StringFilter<"Store"> | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    sales?: SaleListRelationFilter
    stocks?: StockListRelationFilter
    exchanges?: ExchangeListRelationFilter
    reports?: ReportListRelationFilter
  }, "id" | "name">

  export type StoreOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    primaryPhoneNumber?: SortOrderInput | SortOrder
    secondaryPhoneNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    currentGold14?: SortOrder
    currentGold18?: SortOrder
    currentGold21?: SortOrder
    currentGold24?: SortOrder
    currentUSD?: SortOrder
    currentSYP?: SortOrder
    priceGold14USD?: SortOrder
    priceGold18USD?: SortOrder
    priceGold21USD?: SortOrder
    priceGold24USD?: SortOrder
    exchangeRateUSDtoSYP?: SortOrder
    ownerId?: SortOrder
    _count?: StoreCountOrderByAggregateInput
    _avg?: StoreAvgOrderByAggregateInput
    _max?: StoreMaxOrderByAggregateInput
    _min?: StoreMinOrderByAggregateInput
    _sum?: StoreSumOrderByAggregateInput
  }

  export type StoreScalarWhereWithAggregatesInput = {
    AND?: StoreScalarWhereWithAggregatesInput | StoreScalarWhereWithAggregatesInput[]
    OR?: StoreScalarWhereWithAggregatesInput[]
    NOT?: StoreScalarWhereWithAggregatesInput | StoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Store"> | string
    name?: StringWithAggregatesFilter<"Store"> | string
    address?: StringNullableWithAggregatesFilter<"Store"> | string | null
    city?: StringNullableWithAggregatesFilter<"Store"> | string | null
    logoUrl?: StringNullableWithAggregatesFilter<"Store"> | string | null
    primaryPhoneNumber?: StringNullableWithAggregatesFilter<"Store"> | string | null
    secondaryPhoneNumber?: StringNullableWithAggregatesFilter<"Store"> | string | null
    status?: EnumStoreStatusWithAggregatesFilter<"Store"> | $Enums.StoreStatus
    createdAt?: DateTimeWithAggregatesFilter<"Store"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Store"> | Date | string
    currentGold14?: FloatWithAggregatesFilter<"Store"> | number
    currentGold18?: FloatWithAggregatesFilter<"Store"> | number
    currentGold21?: FloatWithAggregatesFilter<"Store"> | number
    currentGold24?: FloatWithAggregatesFilter<"Store"> | number
    currentUSD?: FloatWithAggregatesFilter<"Store"> | number
    currentSYP?: FloatWithAggregatesFilter<"Store"> | number
    priceGold14USD?: FloatWithAggregatesFilter<"Store"> | number
    priceGold18USD?: FloatWithAggregatesFilter<"Store"> | number
    priceGold21USD?: FloatWithAggregatesFilter<"Store"> | number
    priceGold24USD?: FloatWithAggregatesFilter<"Store"> | number
    exchangeRateUSDtoSYP?: FloatWithAggregatesFilter<"Store"> | number
    ownerId?: StringWithAggregatesFilter<"Store"> | string
  }

  export type SaleWhereInput = {
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    id?: StringFilter<"Sale"> | string
    invoiceNumber?: StringFilter<"Sale"> | string
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    updatedAt?: DateTimeFilter<"Sale"> | Date | string
    weight?: FloatFilter<"Sale"> | number
    goldType?: EnumGoldTypeFilter<"Sale"> | $Enums.GoldType
    pricePerGramUSD?: FloatFilter<"Sale"> | number
    pricePerGramSYP?: FloatFilter<"Sale"> | number
    totalUSD?: FloatFilter<"Sale"> | number
    totalSYP?: FloatFilter<"Sale"> | number
    currency?: EnumCurrencyTypeFilter<"Sale"> | $Enums.CurrencyType
    paymentType?: EnumPaymentTypeFilter<"Sale"> | $Enums.PaymentType
    amountPaid?: FloatFilter<"Sale"> | number
    customerName?: StringNullableFilter<"Sale"> | string | null
    customerPhone?: StringNullableFilter<"Sale"> | string | null
    description?: StringNullableFilter<"Sale"> | string | null
    reportId?: StringNullableFilter<"Sale"> | string | null
    storeId?: StringFilter<"Sale"> | string
    profitUSD?: FloatFilter<"Sale"> | number
    profitSYP?: FloatFilter<"Sale"> | number
    report?: XOR<ReportNullableScalarRelationFilter, ReportWhereInput> | null
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }

  export type SaleOrderByWithRelationInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    weight?: SortOrder
    goldType?: SortOrder
    pricePerGramUSD?: SortOrder
    pricePerGramSYP?: SortOrder
    totalUSD?: SortOrder
    totalSYP?: SortOrder
    currency?: SortOrder
    paymentType?: SortOrder
    amountPaid?: SortOrder
    customerName?: SortOrderInput | SortOrder
    customerPhone?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    reportId?: SortOrderInput | SortOrder
    storeId?: SortOrder
    profitUSD?: SortOrder
    profitSYP?: SortOrder
    report?: ReportOrderByWithRelationInput
    store?: StoreOrderByWithRelationInput
  }

  export type SaleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    invoiceNumber?: string
    AND?: SaleWhereInput | SaleWhereInput[]
    OR?: SaleWhereInput[]
    NOT?: SaleWhereInput | SaleWhereInput[]
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    updatedAt?: DateTimeFilter<"Sale"> | Date | string
    weight?: FloatFilter<"Sale"> | number
    goldType?: EnumGoldTypeFilter<"Sale"> | $Enums.GoldType
    pricePerGramUSD?: FloatFilter<"Sale"> | number
    pricePerGramSYP?: FloatFilter<"Sale"> | number
    totalUSD?: FloatFilter<"Sale"> | number
    totalSYP?: FloatFilter<"Sale"> | number
    currency?: EnumCurrencyTypeFilter<"Sale"> | $Enums.CurrencyType
    paymentType?: EnumPaymentTypeFilter<"Sale"> | $Enums.PaymentType
    amountPaid?: FloatFilter<"Sale"> | number
    customerName?: StringNullableFilter<"Sale"> | string | null
    customerPhone?: StringNullableFilter<"Sale"> | string | null
    description?: StringNullableFilter<"Sale"> | string | null
    reportId?: StringNullableFilter<"Sale"> | string | null
    storeId?: StringFilter<"Sale"> | string
    profitUSD?: FloatFilter<"Sale"> | number
    profitSYP?: FloatFilter<"Sale"> | number
    report?: XOR<ReportNullableScalarRelationFilter, ReportWhereInput> | null
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }, "id" | "invoiceNumber">

  export type SaleOrderByWithAggregationInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    weight?: SortOrder
    goldType?: SortOrder
    pricePerGramUSD?: SortOrder
    pricePerGramSYP?: SortOrder
    totalUSD?: SortOrder
    totalSYP?: SortOrder
    currency?: SortOrder
    paymentType?: SortOrder
    amountPaid?: SortOrder
    customerName?: SortOrderInput | SortOrder
    customerPhone?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    reportId?: SortOrderInput | SortOrder
    storeId?: SortOrder
    profitUSD?: SortOrder
    profitSYP?: SortOrder
    _count?: SaleCountOrderByAggregateInput
    _avg?: SaleAvgOrderByAggregateInput
    _max?: SaleMaxOrderByAggregateInput
    _min?: SaleMinOrderByAggregateInput
    _sum?: SaleSumOrderByAggregateInput
  }

  export type SaleScalarWhereWithAggregatesInput = {
    AND?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    OR?: SaleScalarWhereWithAggregatesInput[]
    NOT?: SaleScalarWhereWithAggregatesInput | SaleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sale"> | string
    invoiceNumber?: StringWithAggregatesFilter<"Sale"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Sale"> | Date | string
    weight?: FloatWithAggregatesFilter<"Sale"> | number
    goldType?: EnumGoldTypeWithAggregatesFilter<"Sale"> | $Enums.GoldType
    pricePerGramUSD?: FloatWithAggregatesFilter<"Sale"> | number
    pricePerGramSYP?: FloatWithAggregatesFilter<"Sale"> | number
    totalUSD?: FloatWithAggregatesFilter<"Sale"> | number
    totalSYP?: FloatWithAggregatesFilter<"Sale"> | number
    currency?: EnumCurrencyTypeWithAggregatesFilter<"Sale"> | $Enums.CurrencyType
    paymentType?: EnumPaymentTypeWithAggregatesFilter<"Sale"> | $Enums.PaymentType
    amountPaid?: FloatWithAggregatesFilter<"Sale"> | number
    customerName?: StringNullableWithAggregatesFilter<"Sale"> | string | null
    customerPhone?: StringNullableWithAggregatesFilter<"Sale"> | string | null
    description?: StringNullableWithAggregatesFilter<"Sale"> | string | null
    reportId?: StringNullableWithAggregatesFilter<"Sale"> | string | null
    storeId?: StringWithAggregatesFilter<"Sale"> | string
    profitUSD?: FloatWithAggregatesFilter<"Sale"> | number
    profitSYP?: FloatWithAggregatesFilter<"Sale"> | number
  }

  export type StockWhereInput = {
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    id?: StringFilter<"Stock"> | string
    createdAt?: DateTimeFilter<"Stock"> | Date | string
    updatedAt?: DateTimeFilter<"Stock"> | Date | string
    goldType?: EnumGoldTypeFilter<"Stock"> | $Enums.GoldType
    quantity?: FloatFilter<"Stock"> | number
    type?: EnumStockTypeFilter<"Stock"> | $Enums.StockType
    balanceAfter?: FloatFilter<"Stock"> | number
    costPerGramUSD?: FloatNullableFilter<"Stock"> | number | null
    totalCostUSD?: FloatNullableFilter<"Stock"> | number | null
    totalCostSYP?: FloatNullableFilter<"Stock"> | number | null
    supplier?: StringNullableFilter<"Stock"> | string | null
    invoiceRef?: StringNullableFilter<"Stock"> | string | null
    note?: StringNullableFilter<"Stock"> | string | null
    reportId?: StringNullableFilter<"Stock"> | string | null
    storeId?: StringFilter<"Stock"> | string
    report?: XOR<ReportNullableScalarRelationFilter, ReportWhereInput> | null
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }

  export type StockOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    goldType?: SortOrder
    quantity?: SortOrder
    type?: SortOrder
    balanceAfter?: SortOrder
    costPerGramUSD?: SortOrderInput | SortOrder
    totalCostUSD?: SortOrderInput | SortOrder
    totalCostSYP?: SortOrderInput | SortOrder
    supplier?: SortOrderInput | SortOrder
    invoiceRef?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    reportId?: SortOrderInput | SortOrder
    storeId?: SortOrder
    report?: ReportOrderByWithRelationInput
    store?: StoreOrderByWithRelationInput
  }

  export type StockWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    createdAt?: DateTimeFilter<"Stock"> | Date | string
    updatedAt?: DateTimeFilter<"Stock"> | Date | string
    goldType?: EnumGoldTypeFilter<"Stock"> | $Enums.GoldType
    quantity?: FloatFilter<"Stock"> | number
    type?: EnumStockTypeFilter<"Stock"> | $Enums.StockType
    balanceAfter?: FloatFilter<"Stock"> | number
    costPerGramUSD?: FloatNullableFilter<"Stock"> | number | null
    totalCostUSD?: FloatNullableFilter<"Stock"> | number | null
    totalCostSYP?: FloatNullableFilter<"Stock"> | number | null
    supplier?: StringNullableFilter<"Stock"> | string | null
    invoiceRef?: StringNullableFilter<"Stock"> | string | null
    note?: StringNullableFilter<"Stock"> | string | null
    reportId?: StringNullableFilter<"Stock"> | string | null
    storeId?: StringFilter<"Stock"> | string
    report?: XOR<ReportNullableScalarRelationFilter, ReportWhereInput> | null
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }, "id">

  export type StockOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    goldType?: SortOrder
    quantity?: SortOrder
    type?: SortOrder
    balanceAfter?: SortOrder
    costPerGramUSD?: SortOrderInput | SortOrder
    totalCostUSD?: SortOrderInput | SortOrder
    totalCostSYP?: SortOrderInput | SortOrder
    supplier?: SortOrderInput | SortOrder
    invoiceRef?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    reportId?: SortOrderInput | SortOrder
    storeId?: SortOrder
    _count?: StockCountOrderByAggregateInput
    _avg?: StockAvgOrderByAggregateInput
    _max?: StockMaxOrderByAggregateInput
    _min?: StockMinOrderByAggregateInput
    _sum?: StockSumOrderByAggregateInput
  }

  export type StockScalarWhereWithAggregatesInput = {
    AND?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    OR?: StockScalarWhereWithAggregatesInput[]
    NOT?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Stock"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Stock"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Stock"> | Date | string
    goldType?: EnumGoldTypeWithAggregatesFilter<"Stock"> | $Enums.GoldType
    quantity?: FloatWithAggregatesFilter<"Stock"> | number
    type?: EnumStockTypeWithAggregatesFilter<"Stock"> | $Enums.StockType
    balanceAfter?: FloatWithAggregatesFilter<"Stock"> | number
    costPerGramUSD?: FloatNullableWithAggregatesFilter<"Stock"> | number | null
    totalCostUSD?: FloatNullableWithAggregatesFilter<"Stock"> | number | null
    totalCostSYP?: FloatNullableWithAggregatesFilter<"Stock"> | number | null
    supplier?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    invoiceRef?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    note?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    reportId?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    storeId?: StringWithAggregatesFilter<"Stock"> | string
  }

  export type ExchangeWhereInput = {
    AND?: ExchangeWhereInput | ExchangeWhereInput[]
    OR?: ExchangeWhereInput[]
    NOT?: ExchangeWhereInput | ExchangeWhereInput[]
    id?: StringFilter<"Exchange"> | string
    createdAt?: DateTimeFilter<"Exchange"> | Date | string
    updatedAt?: DateTimeFilter<"Exchange"> | Date | string
    fromCurrency?: EnumCurrencyTypeNullableFilter<"Exchange"> | $Enums.CurrencyType | null
    toCurrency?: EnumCurrencyTypeNullableFilter<"Exchange"> | $Enums.CurrencyType | null
    exchangeRate?: FloatNullableFilter<"Exchange"> | number | null
    amountFrom?: FloatNullableFilter<"Exchange"> | number | null
    amountTo?: FloatNullableFilter<"Exchange"> | number | null
    balanceUSDAfter?: FloatFilter<"Exchange"> | number
    balanceSYPAfter?: FloatFilter<"Exchange"> | number
    reportId?: StringNullableFilter<"Exchange"> | string | null
    storeId?: StringFilter<"Exchange"> | string
    report?: XOR<ReportNullableScalarRelationFilter, ReportWhereInput> | null
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }

  export type ExchangeOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fromCurrency?: SortOrderInput | SortOrder
    toCurrency?: SortOrderInput | SortOrder
    exchangeRate?: SortOrderInput | SortOrder
    amountFrom?: SortOrderInput | SortOrder
    amountTo?: SortOrderInput | SortOrder
    balanceUSDAfter?: SortOrder
    balanceSYPAfter?: SortOrder
    reportId?: SortOrderInput | SortOrder
    storeId?: SortOrder
    report?: ReportOrderByWithRelationInput
    store?: StoreOrderByWithRelationInput
  }

  export type ExchangeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExchangeWhereInput | ExchangeWhereInput[]
    OR?: ExchangeWhereInput[]
    NOT?: ExchangeWhereInput | ExchangeWhereInput[]
    createdAt?: DateTimeFilter<"Exchange"> | Date | string
    updatedAt?: DateTimeFilter<"Exchange"> | Date | string
    fromCurrency?: EnumCurrencyTypeNullableFilter<"Exchange"> | $Enums.CurrencyType | null
    toCurrency?: EnumCurrencyTypeNullableFilter<"Exchange"> | $Enums.CurrencyType | null
    exchangeRate?: FloatNullableFilter<"Exchange"> | number | null
    amountFrom?: FloatNullableFilter<"Exchange"> | number | null
    amountTo?: FloatNullableFilter<"Exchange"> | number | null
    balanceUSDAfter?: FloatFilter<"Exchange"> | number
    balanceSYPAfter?: FloatFilter<"Exchange"> | number
    reportId?: StringNullableFilter<"Exchange"> | string | null
    storeId?: StringFilter<"Exchange"> | string
    report?: XOR<ReportNullableScalarRelationFilter, ReportWhereInput> | null
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }, "id">

  export type ExchangeOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fromCurrency?: SortOrderInput | SortOrder
    toCurrency?: SortOrderInput | SortOrder
    exchangeRate?: SortOrderInput | SortOrder
    amountFrom?: SortOrderInput | SortOrder
    amountTo?: SortOrderInput | SortOrder
    balanceUSDAfter?: SortOrder
    balanceSYPAfter?: SortOrder
    reportId?: SortOrderInput | SortOrder
    storeId?: SortOrder
    _count?: ExchangeCountOrderByAggregateInput
    _avg?: ExchangeAvgOrderByAggregateInput
    _max?: ExchangeMaxOrderByAggregateInput
    _min?: ExchangeMinOrderByAggregateInput
    _sum?: ExchangeSumOrderByAggregateInput
  }

  export type ExchangeScalarWhereWithAggregatesInput = {
    AND?: ExchangeScalarWhereWithAggregatesInput | ExchangeScalarWhereWithAggregatesInput[]
    OR?: ExchangeScalarWhereWithAggregatesInput[]
    NOT?: ExchangeScalarWhereWithAggregatesInput | ExchangeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Exchange"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Exchange"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Exchange"> | Date | string
    fromCurrency?: EnumCurrencyTypeNullableWithAggregatesFilter<"Exchange"> | $Enums.CurrencyType | null
    toCurrency?: EnumCurrencyTypeNullableWithAggregatesFilter<"Exchange"> | $Enums.CurrencyType | null
    exchangeRate?: FloatNullableWithAggregatesFilter<"Exchange"> | number | null
    amountFrom?: FloatNullableWithAggregatesFilter<"Exchange"> | number | null
    amountTo?: FloatNullableWithAggregatesFilter<"Exchange"> | number | null
    balanceUSDAfter?: FloatWithAggregatesFilter<"Exchange"> | number
    balanceSYPAfter?: FloatWithAggregatesFilter<"Exchange"> | number
    reportId?: StringNullableWithAggregatesFilter<"Exchange"> | string | null
    storeId?: StringWithAggregatesFilter<"Exchange"> | string
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: StringFilter<"Report"> | string
    date?: DateTimeFilter<"Report"> | Date | string
    openingUSD?: FloatFilter<"Report"> | number
    closingUSD?: FloatFilter<"Report"> | number
    openingSYP?: FloatFilter<"Report"> | number
    closingSYP?: FloatFilter<"Report"> | number
    openingGold14?: FloatFilter<"Report"> | number
    closingGold14?: FloatFilter<"Report"> | number
    openingGold18?: FloatFilter<"Report"> | number
    closingGold18?: FloatFilter<"Report"> | number
    openingGold21?: FloatFilter<"Report"> | number
    closingGold21?: FloatFilter<"Report"> | number
    openingGold24?: FloatFilter<"Report"> | number
    closingGold24?: FloatFilter<"Report"> | number
    priceGold14USD?: FloatFilter<"Report"> | number
    priceGold18USD?: FloatFilter<"Report"> | number
    priceGold21USD?: FloatFilter<"Report"> | number
    priceGold24USD?: FloatFilter<"Report"> | number
    priceGold14SYP?: FloatFilter<"Report"> | number
    priceGold18SYP?: FloatFilter<"Report"> | number
    priceGold21SYP?: FloatFilter<"Report"> | number
    priceGold24SYP?: FloatFilter<"Report"> | number
    exchangeRateUSDtoSYP?: FloatFilter<"Report"> | number
    totalGoldSold?: FloatFilter<"Report"> | number
    totalSalesUSD?: FloatFilter<"Report"> | number
    totalSalesSYP?: FloatFilter<"Report"> | number
    profitUSD?: FloatFilter<"Report"> | number
    profitSYP?: FloatFilter<"Report"> | number
    notes?: StringNullableFilter<"Report"> | string | null
    status?: EnumDayStatusFilter<"Report"> | $Enums.DayStatus
    createdAt?: DateTimeFilter<"Report"> | Date | string
    storeId?: StringFilter<"Report"> | string
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
    sales?: SaleListRelationFilter
    stocks?: StockListRelationFilter
    exchanges?: ExchangeListRelationFilter
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    openingUSD?: SortOrder
    closingUSD?: SortOrder
    openingSYP?: SortOrder
    closingSYP?: SortOrder
    openingGold14?: SortOrder
    closingGold14?: SortOrder
    openingGold18?: SortOrder
    closingGold18?: SortOrder
    openingGold21?: SortOrder
    closingGold21?: SortOrder
    openingGold24?: SortOrder
    closingGold24?: SortOrder
    priceGold14USD?: SortOrder
    priceGold18USD?: SortOrder
    priceGold21USD?: SortOrder
    priceGold24USD?: SortOrder
    priceGold14SYP?: SortOrder
    priceGold18SYP?: SortOrder
    priceGold21SYP?: SortOrder
    priceGold24SYP?: SortOrder
    exchangeRateUSDtoSYP?: SortOrder
    totalGoldSold?: SortOrder
    totalSalesUSD?: SortOrder
    totalSalesSYP?: SortOrder
    profitUSD?: SortOrder
    profitSYP?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    storeId?: SortOrder
    store?: StoreOrderByWithRelationInput
    sales?: SaleOrderByRelationAggregateInput
    stocks?: StockOrderByRelationAggregateInput
    exchanges?: ExchangeOrderByRelationAggregateInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    date?: DateTimeFilter<"Report"> | Date | string
    openingUSD?: FloatFilter<"Report"> | number
    closingUSD?: FloatFilter<"Report"> | number
    openingSYP?: FloatFilter<"Report"> | number
    closingSYP?: FloatFilter<"Report"> | number
    openingGold14?: FloatFilter<"Report"> | number
    closingGold14?: FloatFilter<"Report"> | number
    openingGold18?: FloatFilter<"Report"> | number
    closingGold18?: FloatFilter<"Report"> | number
    openingGold21?: FloatFilter<"Report"> | number
    closingGold21?: FloatFilter<"Report"> | number
    openingGold24?: FloatFilter<"Report"> | number
    closingGold24?: FloatFilter<"Report"> | number
    priceGold14USD?: FloatFilter<"Report"> | number
    priceGold18USD?: FloatFilter<"Report"> | number
    priceGold21USD?: FloatFilter<"Report"> | number
    priceGold24USD?: FloatFilter<"Report"> | number
    priceGold14SYP?: FloatFilter<"Report"> | number
    priceGold18SYP?: FloatFilter<"Report"> | number
    priceGold21SYP?: FloatFilter<"Report"> | number
    priceGold24SYP?: FloatFilter<"Report"> | number
    exchangeRateUSDtoSYP?: FloatFilter<"Report"> | number
    totalGoldSold?: FloatFilter<"Report"> | number
    totalSalesUSD?: FloatFilter<"Report"> | number
    totalSalesSYP?: FloatFilter<"Report"> | number
    profitUSD?: FloatFilter<"Report"> | number
    profitSYP?: FloatFilter<"Report"> | number
    notes?: StringNullableFilter<"Report"> | string | null
    status?: EnumDayStatusFilter<"Report"> | $Enums.DayStatus
    createdAt?: DateTimeFilter<"Report"> | Date | string
    storeId?: StringFilter<"Report"> | string
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
    sales?: SaleListRelationFilter
    stocks?: StockListRelationFilter
    exchanges?: ExchangeListRelationFilter
  }, "id">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    openingUSD?: SortOrder
    closingUSD?: SortOrder
    openingSYP?: SortOrder
    closingSYP?: SortOrder
    openingGold14?: SortOrder
    closingGold14?: SortOrder
    openingGold18?: SortOrder
    closingGold18?: SortOrder
    openingGold21?: SortOrder
    closingGold21?: SortOrder
    openingGold24?: SortOrder
    closingGold24?: SortOrder
    priceGold14USD?: SortOrder
    priceGold18USD?: SortOrder
    priceGold21USD?: SortOrder
    priceGold24USD?: SortOrder
    priceGold14SYP?: SortOrder
    priceGold18SYP?: SortOrder
    priceGold21SYP?: SortOrder
    priceGold24SYP?: SortOrder
    exchangeRateUSDtoSYP?: SortOrder
    totalGoldSold?: SortOrder
    totalSalesUSD?: SortOrder
    totalSalesSYP?: SortOrder
    profitUSD?: SortOrder
    profitSYP?: SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    storeId?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _avg?: ReportAvgOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
    _sum?: ReportSumOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Report"> | string
    date?: DateTimeWithAggregatesFilter<"Report"> | Date | string
    openingUSD?: FloatWithAggregatesFilter<"Report"> | number
    closingUSD?: FloatWithAggregatesFilter<"Report"> | number
    openingSYP?: FloatWithAggregatesFilter<"Report"> | number
    closingSYP?: FloatWithAggregatesFilter<"Report"> | number
    openingGold14?: FloatWithAggregatesFilter<"Report"> | number
    closingGold14?: FloatWithAggregatesFilter<"Report"> | number
    openingGold18?: FloatWithAggregatesFilter<"Report"> | number
    closingGold18?: FloatWithAggregatesFilter<"Report"> | number
    openingGold21?: FloatWithAggregatesFilter<"Report"> | number
    closingGold21?: FloatWithAggregatesFilter<"Report"> | number
    openingGold24?: FloatWithAggregatesFilter<"Report"> | number
    closingGold24?: FloatWithAggregatesFilter<"Report"> | number
    priceGold14USD?: FloatWithAggregatesFilter<"Report"> | number
    priceGold18USD?: FloatWithAggregatesFilter<"Report"> | number
    priceGold21USD?: FloatWithAggregatesFilter<"Report"> | number
    priceGold24USD?: FloatWithAggregatesFilter<"Report"> | number
    priceGold14SYP?: FloatWithAggregatesFilter<"Report"> | number
    priceGold18SYP?: FloatWithAggregatesFilter<"Report"> | number
    priceGold21SYP?: FloatWithAggregatesFilter<"Report"> | number
    priceGold24SYP?: FloatWithAggregatesFilter<"Report"> | number
    exchangeRateUSDtoSYP?: FloatWithAggregatesFilter<"Report"> | number
    totalGoldSold?: FloatWithAggregatesFilter<"Report"> | number
    totalSalesUSD?: FloatWithAggregatesFilter<"Report"> | number
    totalSalesSYP?: FloatWithAggregatesFilter<"Report"> | number
    profitUSD?: FloatWithAggregatesFilter<"Report"> | number
    profitSYP?: FloatWithAggregatesFilter<"Report"> | number
    notes?: StringNullableWithAggregatesFilter<"Report"> | string | null
    status?: EnumDayStatusWithAggregatesFilter<"Report"> | $Enums.DayStatus
    createdAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
    storeId?: StringWithAggregatesFilter<"Report"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stores?: StoreCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stores?: StoreUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stores?: StoreUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stores?: StoreUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreCreateInput = {
    id?: string
    name: string
    address?: string | null
    city?: string | null
    logoUrl?: string | null
    primaryPhoneNumber?: string | null
    secondaryPhoneNumber?: string | null
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    currentGold14?: number
    currentGold18?: number
    currentGold21?: number
    currentGold24?: number
    currentUSD?: number
    currentSYP?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    exchangeRateUSDtoSYP?: number
    owner: UserCreateNestedOneWithoutStoresInput
    sales?: SaleCreateNestedManyWithoutStoreInput
    stocks?: StockCreateNestedManyWithoutStoreInput
    exchanges?: ExchangeCreateNestedManyWithoutStoreInput
    reports?: ReportCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateInput = {
    id?: string
    name: string
    address?: string | null
    city?: string | null
    logoUrl?: string | null
    primaryPhoneNumber?: string | null
    secondaryPhoneNumber?: string | null
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    currentGold14?: number
    currentGold18?: number
    currentGold21?: number
    currentGold24?: number
    currentUSD?: number
    currentSYP?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    exchangeRateUSDtoSYP?: number
    ownerId: string
    sales?: SaleUncheckedCreateNestedManyWithoutStoreInput
    stocks?: StockUncheckedCreateNestedManyWithoutStoreInput
    exchanges?: ExchangeUncheckedCreateNestedManyWithoutStoreInput
    reports?: ReportUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentGold14?: FloatFieldUpdateOperationsInput | number
    currentGold18?: FloatFieldUpdateOperationsInput | number
    currentGold21?: FloatFieldUpdateOperationsInput | number
    currentGold24?: FloatFieldUpdateOperationsInput | number
    currentUSD?: FloatFieldUpdateOperationsInput | number
    currentSYP?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    owner?: UserUpdateOneRequiredWithoutStoresNestedInput
    sales?: SaleUpdateManyWithoutStoreNestedInput
    stocks?: StockUpdateManyWithoutStoreNestedInput
    exchanges?: ExchangeUpdateManyWithoutStoreNestedInput
    reports?: ReportUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentGold14?: FloatFieldUpdateOperationsInput | number
    currentGold18?: FloatFieldUpdateOperationsInput | number
    currentGold21?: FloatFieldUpdateOperationsInput | number
    currentGold24?: FloatFieldUpdateOperationsInput | number
    currentUSD?: FloatFieldUpdateOperationsInput | number
    currentSYP?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    ownerId?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutStoreNestedInput
    stocks?: StockUncheckedUpdateManyWithoutStoreNestedInput
    exchanges?: ExchangeUncheckedUpdateManyWithoutStoreNestedInput
    reports?: ReportUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type StoreCreateManyInput = {
    id?: string
    name: string
    address?: string | null
    city?: string | null
    logoUrl?: string | null
    primaryPhoneNumber?: string | null
    secondaryPhoneNumber?: string | null
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    currentGold14?: number
    currentGold18?: number
    currentGold21?: number
    currentGold24?: number
    currentUSD?: number
    currentSYP?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    exchangeRateUSDtoSYP?: number
    ownerId: string
  }

  export type StoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentGold14?: FloatFieldUpdateOperationsInput | number
    currentGold18?: FloatFieldUpdateOperationsInput | number
    currentGold21?: FloatFieldUpdateOperationsInput | number
    currentGold24?: FloatFieldUpdateOperationsInput | number
    currentUSD?: FloatFieldUpdateOperationsInput | number
    currentSYP?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
  }

  export type StoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentGold14?: FloatFieldUpdateOperationsInput | number
    currentGold18?: FloatFieldUpdateOperationsInput | number
    currentGold21?: FloatFieldUpdateOperationsInput | number
    currentGold24?: FloatFieldUpdateOperationsInput | number
    currentUSD?: FloatFieldUpdateOperationsInput | number
    currentSYP?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    ownerId?: StringFieldUpdateOperationsInput | string
  }

  export type SaleCreateInput = {
    id?: string
    invoiceNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weight: number
    goldType: $Enums.GoldType
    pricePerGramUSD: number
    pricePerGramSYP: number
    totalUSD: number
    totalSYP: number
    currency: $Enums.CurrencyType
    paymentType: $Enums.PaymentType
    amountPaid: number
    customerName?: string | null
    customerPhone?: string | null
    description?: string | null
    profitUSD: number
    profitSYP: number
    report?: ReportCreateNestedOneWithoutSalesInput
    store: StoreCreateNestedOneWithoutSalesInput
  }

  export type SaleUncheckedCreateInput = {
    id?: string
    invoiceNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weight: number
    goldType: $Enums.GoldType
    pricePerGramUSD: number
    pricePerGramSYP: number
    totalUSD: number
    totalSYP: number
    currency: $Enums.CurrencyType
    paymentType: $Enums.PaymentType
    amountPaid: number
    customerName?: string | null
    customerPhone?: string | null
    description?: string | null
    reportId?: string | null
    storeId: string
    profitUSD: number
    profitSYP: number
  }

  export type SaleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    pricePerGramUSD?: FloatFieldUpdateOperationsInput | number
    pricePerGramSYP?: FloatFieldUpdateOperationsInput | number
    totalUSD?: FloatFieldUpdateOperationsInput | number
    totalSYP?: FloatFieldUpdateOperationsInput | number
    currency?: EnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    amountPaid?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    report?: ReportUpdateOneWithoutSalesNestedInput
    store?: StoreUpdateOneRequiredWithoutSalesNestedInput
  }

  export type SaleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    pricePerGramUSD?: FloatFieldUpdateOperationsInput | number
    pricePerGramSYP?: FloatFieldUpdateOperationsInput | number
    totalUSD?: FloatFieldUpdateOperationsInput | number
    totalSYP?: FloatFieldUpdateOperationsInput | number
    currency?: EnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    amountPaid?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    storeId?: StringFieldUpdateOperationsInput | string
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
  }

  export type SaleCreateManyInput = {
    id?: string
    invoiceNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weight: number
    goldType: $Enums.GoldType
    pricePerGramUSD: number
    pricePerGramSYP: number
    totalUSD: number
    totalSYP: number
    currency: $Enums.CurrencyType
    paymentType: $Enums.PaymentType
    amountPaid: number
    customerName?: string | null
    customerPhone?: string | null
    description?: string | null
    reportId?: string | null
    storeId: string
    profitUSD: number
    profitSYP: number
  }

  export type SaleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    pricePerGramUSD?: FloatFieldUpdateOperationsInput | number
    pricePerGramSYP?: FloatFieldUpdateOperationsInput | number
    totalUSD?: FloatFieldUpdateOperationsInput | number
    totalSYP?: FloatFieldUpdateOperationsInput | number
    currency?: EnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    amountPaid?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
  }

  export type SaleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    pricePerGramUSD?: FloatFieldUpdateOperationsInput | number
    pricePerGramSYP?: FloatFieldUpdateOperationsInput | number
    totalUSD?: FloatFieldUpdateOperationsInput | number
    totalSYP?: FloatFieldUpdateOperationsInput | number
    currency?: EnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    amountPaid?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    storeId?: StringFieldUpdateOperationsInput | string
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
  }

  export type StockCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    goldType: $Enums.GoldType
    quantity: number
    type: $Enums.StockType
    balanceAfter: number
    costPerGramUSD?: number | null
    totalCostUSD?: number | null
    totalCostSYP?: number | null
    supplier?: string | null
    invoiceRef?: string | null
    note?: string | null
    report?: ReportCreateNestedOneWithoutStocksInput
    store: StoreCreateNestedOneWithoutStocksInput
  }

  export type StockUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    goldType: $Enums.GoldType
    quantity: number
    type: $Enums.StockType
    balanceAfter: number
    costPerGramUSD?: number | null
    totalCostUSD?: number | null
    totalCostSYP?: number | null
    supplier?: string | null
    invoiceRef?: string | null
    note?: string | null
    reportId?: string | null
    storeId: string
  }

  export type StockUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    quantity?: FloatFieldUpdateOperationsInput | number
    type?: EnumStockTypeFieldUpdateOperationsInput | $Enums.StockType
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    costPerGramUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostSYP?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    report?: ReportUpdateOneWithoutStocksNestedInput
    store?: StoreUpdateOneRequiredWithoutStocksNestedInput
  }

  export type StockUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    quantity?: FloatFieldUpdateOperationsInput | number
    type?: EnumStockTypeFieldUpdateOperationsInput | $Enums.StockType
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    costPerGramUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostSYP?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    storeId?: StringFieldUpdateOperationsInput | string
  }

  export type StockCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    goldType: $Enums.GoldType
    quantity: number
    type: $Enums.StockType
    balanceAfter: number
    costPerGramUSD?: number | null
    totalCostUSD?: number | null
    totalCostSYP?: number | null
    supplier?: string | null
    invoiceRef?: string | null
    note?: string | null
    reportId?: string | null
    storeId: string
  }

  export type StockUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    quantity?: FloatFieldUpdateOperationsInput | number
    type?: EnumStockTypeFieldUpdateOperationsInput | $Enums.StockType
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    costPerGramUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostSYP?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StockUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    quantity?: FloatFieldUpdateOperationsInput | number
    type?: EnumStockTypeFieldUpdateOperationsInput | $Enums.StockType
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    costPerGramUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostSYP?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    storeId?: StringFieldUpdateOperationsInput | string
  }

  export type ExchangeCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fromCurrency?: $Enums.CurrencyType | null
    toCurrency?: $Enums.CurrencyType | null
    exchangeRate?: number | null
    amountFrom?: number | null
    amountTo?: number | null
    balanceUSDAfter: number
    balanceSYPAfter: number
    report?: ReportCreateNestedOneWithoutExchangesInput
    store: StoreCreateNestedOneWithoutExchangesInput
  }

  export type ExchangeUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fromCurrency?: $Enums.CurrencyType | null
    toCurrency?: $Enums.CurrencyType | null
    exchangeRate?: number | null
    amountFrom?: number | null
    amountTo?: number | null
    balanceUSDAfter: number
    balanceSYPAfter: number
    reportId?: string | null
    storeId: string
  }

  export type ExchangeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    toCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    exchangeRate?: NullableFloatFieldUpdateOperationsInput | number | null
    amountFrom?: NullableFloatFieldUpdateOperationsInput | number | null
    amountTo?: NullableFloatFieldUpdateOperationsInput | number | null
    balanceUSDAfter?: FloatFieldUpdateOperationsInput | number
    balanceSYPAfter?: FloatFieldUpdateOperationsInput | number
    report?: ReportUpdateOneWithoutExchangesNestedInput
    store?: StoreUpdateOneRequiredWithoutExchangesNestedInput
  }

  export type ExchangeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    toCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    exchangeRate?: NullableFloatFieldUpdateOperationsInput | number | null
    amountFrom?: NullableFloatFieldUpdateOperationsInput | number | null
    amountTo?: NullableFloatFieldUpdateOperationsInput | number | null
    balanceUSDAfter?: FloatFieldUpdateOperationsInput | number
    balanceSYPAfter?: FloatFieldUpdateOperationsInput | number
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    storeId?: StringFieldUpdateOperationsInput | string
  }

  export type ExchangeCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fromCurrency?: $Enums.CurrencyType | null
    toCurrency?: $Enums.CurrencyType | null
    exchangeRate?: number | null
    amountFrom?: number | null
    amountTo?: number | null
    balanceUSDAfter: number
    balanceSYPAfter: number
    reportId?: string | null
    storeId: string
  }

  export type ExchangeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    toCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    exchangeRate?: NullableFloatFieldUpdateOperationsInput | number | null
    amountFrom?: NullableFloatFieldUpdateOperationsInput | number | null
    amountTo?: NullableFloatFieldUpdateOperationsInput | number | null
    balanceUSDAfter?: FloatFieldUpdateOperationsInput | number
    balanceSYPAfter?: FloatFieldUpdateOperationsInput | number
  }

  export type ExchangeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    toCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    exchangeRate?: NullableFloatFieldUpdateOperationsInput | number | null
    amountFrom?: NullableFloatFieldUpdateOperationsInput | number | null
    amountTo?: NullableFloatFieldUpdateOperationsInput | number | null
    balanceUSDAfter?: FloatFieldUpdateOperationsInput | number
    balanceSYPAfter?: FloatFieldUpdateOperationsInput | number
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    storeId?: StringFieldUpdateOperationsInput | string
  }

  export type ReportCreateInput = {
    id?: string
    date?: Date | string
    openingUSD?: number
    closingUSD?: number
    openingSYP?: number
    closingSYP?: number
    openingGold14?: number
    closingGold14?: number
    openingGold18?: number
    closingGold18?: number
    openingGold21?: number
    closingGold21?: number
    openingGold24?: number
    closingGold24?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    priceGold14SYP?: number
    priceGold18SYP?: number
    priceGold21SYP?: number
    priceGold24SYP?: number
    exchangeRateUSDtoSYP?: number
    totalGoldSold?: number
    totalSalesUSD?: number
    totalSalesSYP?: number
    profitUSD?: number
    profitSYP?: number
    notes?: string | null
    status?: $Enums.DayStatus
    createdAt?: Date | string
    store: StoreCreateNestedOneWithoutReportsInput
    sales?: SaleCreateNestedManyWithoutReportInput
    stocks?: StockCreateNestedManyWithoutReportInput
    exchanges?: ExchangeCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateInput = {
    id?: string
    date?: Date | string
    openingUSD?: number
    closingUSD?: number
    openingSYP?: number
    closingSYP?: number
    openingGold14?: number
    closingGold14?: number
    openingGold18?: number
    closingGold18?: number
    openingGold21?: number
    closingGold21?: number
    openingGold24?: number
    closingGold24?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    priceGold14SYP?: number
    priceGold18SYP?: number
    priceGold21SYP?: number
    priceGold24SYP?: number
    exchangeRateUSDtoSYP?: number
    totalGoldSold?: number
    totalSalesUSD?: number
    totalSalesSYP?: number
    profitUSD?: number
    profitSYP?: number
    notes?: string | null
    status?: $Enums.DayStatus
    createdAt?: Date | string
    storeId: string
    sales?: SaleUncheckedCreateNestedManyWithoutReportInput
    stocks?: StockUncheckedCreateNestedManyWithoutReportInput
    exchanges?: ExchangeUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    openingUSD?: FloatFieldUpdateOperationsInput | number
    closingUSD?: FloatFieldUpdateOperationsInput | number
    openingSYP?: FloatFieldUpdateOperationsInput | number
    closingSYP?: FloatFieldUpdateOperationsInput | number
    openingGold14?: FloatFieldUpdateOperationsInput | number
    closingGold14?: FloatFieldUpdateOperationsInput | number
    openingGold18?: FloatFieldUpdateOperationsInput | number
    closingGold18?: FloatFieldUpdateOperationsInput | number
    openingGold21?: FloatFieldUpdateOperationsInput | number
    closingGold21?: FloatFieldUpdateOperationsInput | number
    openingGold24?: FloatFieldUpdateOperationsInput | number
    closingGold24?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    priceGold14SYP?: FloatFieldUpdateOperationsInput | number
    priceGold18SYP?: FloatFieldUpdateOperationsInput | number
    priceGold21SYP?: FloatFieldUpdateOperationsInput | number
    priceGold24SYP?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    totalGoldSold?: FloatFieldUpdateOperationsInput | number
    totalSalesUSD?: FloatFieldUpdateOperationsInput | number
    totalSalesSYP?: FloatFieldUpdateOperationsInput | number
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDayStatusFieldUpdateOperationsInput | $Enums.DayStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutReportsNestedInput
    sales?: SaleUpdateManyWithoutReportNestedInput
    stocks?: StockUpdateManyWithoutReportNestedInput
    exchanges?: ExchangeUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    openingUSD?: FloatFieldUpdateOperationsInput | number
    closingUSD?: FloatFieldUpdateOperationsInput | number
    openingSYP?: FloatFieldUpdateOperationsInput | number
    closingSYP?: FloatFieldUpdateOperationsInput | number
    openingGold14?: FloatFieldUpdateOperationsInput | number
    closingGold14?: FloatFieldUpdateOperationsInput | number
    openingGold18?: FloatFieldUpdateOperationsInput | number
    closingGold18?: FloatFieldUpdateOperationsInput | number
    openingGold21?: FloatFieldUpdateOperationsInput | number
    closingGold21?: FloatFieldUpdateOperationsInput | number
    openingGold24?: FloatFieldUpdateOperationsInput | number
    closingGold24?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    priceGold14SYP?: FloatFieldUpdateOperationsInput | number
    priceGold18SYP?: FloatFieldUpdateOperationsInput | number
    priceGold21SYP?: FloatFieldUpdateOperationsInput | number
    priceGold24SYP?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    totalGoldSold?: FloatFieldUpdateOperationsInput | number
    totalSalesUSD?: FloatFieldUpdateOperationsInput | number
    totalSalesSYP?: FloatFieldUpdateOperationsInput | number
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDayStatusFieldUpdateOperationsInput | $Enums.DayStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storeId?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutReportNestedInput
    stocks?: StockUncheckedUpdateManyWithoutReportNestedInput
    exchanges?: ExchangeUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportCreateManyInput = {
    id?: string
    date?: Date | string
    openingUSD?: number
    closingUSD?: number
    openingSYP?: number
    closingSYP?: number
    openingGold14?: number
    closingGold14?: number
    openingGold18?: number
    closingGold18?: number
    openingGold21?: number
    closingGold21?: number
    openingGold24?: number
    closingGold24?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    priceGold14SYP?: number
    priceGold18SYP?: number
    priceGold21SYP?: number
    priceGold24SYP?: number
    exchangeRateUSDtoSYP?: number
    totalGoldSold?: number
    totalSalesUSD?: number
    totalSalesSYP?: number
    profitUSD?: number
    profitSYP?: number
    notes?: string | null
    status?: $Enums.DayStatus
    createdAt?: Date | string
    storeId: string
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    openingUSD?: FloatFieldUpdateOperationsInput | number
    closingUSD?: FloatFieldUpdateOperationsInput | number
    openingSYP?: FloatFieldUpdateOperationsInput | number
    closingSYP?: FloatFieldUpdateOperationsInput | number
    openingGold14?: FloatFieldUpdateOperationsInput | number
    closingGold14?: FloatFieldUpdateOperationsInput | number
    openingGold18?: FloatFieldUpdateOperationsInput | number
    closingGold18?: FloatFieldUpdateOperationsInput | number
    openingGold21?: FloatFieldUpdateOperationsInput | number
    closingGold21?: FloatFieldUpdateOperationsInput | number
    openingGold24?: FloatFieldUpdateOperationsInput | number
    closingGold24?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    priceGold14SYP?: FloatFieldUpdateOperationsInput | number
    priceGold18SYP?: FloatFieldUpdateOperationsInput | number
    priceGold21SYP?: FloatFieldUpdateOperationsInput | number
    priceGold24SYP?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    totalGoldSold?: FloatFieldUpdateOperationsInput | number
    totalSalesUSD?: FloatFieldUpdateOperationsInput | number
    totalSalesSYP?: FloatFieldUpdateOperationsInput | number
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDayStatusFieldUpdateOperationsInput | $Enums.DayStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    openingUSD?: FloatFieldUpdateOperationsInput | number
    closingUSD?: FloatFieldUpdateOperationsInput | number
    openingSYP?: FloatFieldUpdateOperationsInput | number
    closingSYP?: FloatFieldUpdateOperationsInput | number
    openingGold14?: FloatFieldUpdateOperationsInput | number
    closingGold14?: FloatFieldUpdateOperationsInput | number
    openingGold18?: FloatFieldUpdateOperationsInput | number
    closingGold18?: FloatFieldUpdateOperationsInput | number
    openingGold21?: FloatFieldUpdateOperationsInput | number
    closingGold21?: FloatFieldUpdateOperationsInput | number
    openingGold24?: FloatFieldUpdateOperationsInput | number
    closingGold24?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    priceGold14SYP?: FloatFieldUpdateOperationsInput | number
    priceGold18SYP?: FloatFieldUpdateOperationsInput | number
    priceGold21SYP?: FloatFieldUpdateOperationsInput | number
    priceGold24SYP?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    totalGoldSold?: FloatFieldUpdateOperationsInput | number
    totalSalesUSD?: FloatFieldUpdateOperationsInput | number
    totalSalesSYP?: FloatFieldUpdateOperationsInput | number
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDayStatusFieldUpdateOperationsInput | $Enums.DayStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storeId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StoreListRelationFilter = {
    every?: StoreWhereInput
    some?: StoreWhereInput
    none?: StoreWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    phoneNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    phoneNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    role?: SortOrder
    phoneNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumStoreStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreStatus | EnumStoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreStatusFilter<$PrismaModel> | $Enums.StoreStatus
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SaleListRelationFilter = {
    every?: SaleWhereInput
    some?: SaleWhereInput
    none?: SaleWhereInput
  }

  export type StockListRelationFilter = {
    every?: StockWhereInput
    some?: StockWhereInput
    none?: StockWhereInput
  }

  export type ExchangeListRelationFilter = {
    every?: ExchangeWhereInput
    some?: ExchangeWhereInput
    none?: ExchangeWhereInput
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type SaleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExchangeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StoreCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    logoUrl?: SortOrder
    primaryPhoneNumber?: SortOrder
    secondaryPhoneNumber?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    currentGold14?: SortOrder
    currentGold18?: SortOrder
    currentGold21?: SortOrder
    currentGold24?: SortOrder
    currentUSD?: SortOrder
    currentSYP?: SortOrder
    priceGold14USD?: SortOrder
    priceGold18USD?: SortOrder
    priceGold21USD?: SortOrder
    priceGold24USD?: SortOrder
    exchangeRateUSDtoSYP?: SortOrder
    ownerId?: SortOrder
  }

  export type StoreAvgOrderByAggregateInput = {
    currentGold14?: SortOrder
    currentGold18?: SortOrder
    currentGold21?: SortOrder
    currentGold24?: SortOrder
    currentUSD?: SortOrder
    currentSYP?: SortOrder
    priceGold14USD?: SortOrder
    priceGold18USD?: SortOrder
    priceGold21USD?: SortOrder
    priceGold24USD?: SortOrder
    exchangeRateUSDtoSYP?: SortOrder
  }

  export type StoreMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    logoUrl?: SortOrder
    primaryPhoneNumber?: SortOrder
    secondaryPhoneNumber?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    currentGold14?: SortOrder
    currentGold18?: SortOrder
    currentGold21?: SortOrder
    currentGold24?: SortOrder
    currentUSD?: SortOrder
    currentSYP?: SortOrder
    priceGold14USD?: SortOrder
    priceGold18USD?: SortOrder
    priceGold21USD?: SortOrder
    priceGold24USD?: SortOrder
    exchangeRateUSDtoSYP?: SortOrder
    ownerId?: SortOrder
  }

  export type StoreMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    logoUrl?: SortOrder
    primaryPhoneNumber?: SortOrder
    secondaryPhoneNumber?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    currentGold14?: SortOrder
    currentGold18?: SortOrder
    currentGold21?: SortOrder
    currentGold24?: SortOrder
    currentUSD?: SortOrder
    currentSYP?: SortOrder
    priceGold14USD?: SortOrder
    priceGold18USD?: SortOrder
    priceGold21USD?: SortOrder
    priceGold24USD?: SortOrder
    exchangeRateUSDtoSYP?: SortOrder
    ownerId?: SortOrder
  }

  export type StoreSumOrderByAggregateInput = {
    currentGold14?: SortOrder
    currentGold18?: SortOrder
    currentGold21?: SortOrder
    currentGold24?: SortOrder
    currentUSD?: SortOrder
    currentSYP?: SortOrder
    priceGold14USD?: SortOrder
    priceGold18USD?: SortOrder
    priceGold21USD?: SortOrder
    priceGold24USD?: SortOrder
    exchangeRateUSDtoSYP?: SortOrder
  }

  export type EnumStoreStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreStatus | EnumStoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreStatusWithAggregatesFilter<$PrismaModel> | $Enums.StoreStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStoreStatusFilter<$PrismaModel>
    _max?: NestedEnumStoreStatusFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumGoldTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.GoldType | EnumGoldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GoldType[] | ListEnumGoldTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GoldType[] | ListEnumGoldTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGoldTypeFilter<$PrismaModel> | $Enums.GoldType
  }

  export type EnumCurrencyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrencyType | EnumCurrencyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyTypeFilter<$PrismaModel> | $Enums.CurrencyType
  }

  export type EnumPaymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeFilter<$PrismaModel> | $Enums.PaymentType
  }

  export type ReportNullableScalarRelationFilter = {
    is?: ReportWhereInput | null
    isNot?: ReportWhereInput | null
  }

  export type StoreScalarRelationFilter = {
    is?: StoreWhereInput
    isNot?: StoreWhereInput
  }

  export type SaleCountOrderByAggregateInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    weight?: SortOrder
    goldType?: SortOrder
    pricePerGramUSD?: SortOrder
    pricePerGramSYP?: SortOrder
    totalUSD?: SortOrder
    totalSYP?: SortOrder
    currency?: SortOrder
    paymentType?: SortOrder
    amountPaid?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    description?: SortOrder
    reportId?: SortOrder
    storeId?: SortOrder
    profitUSD?: SortOrder
    profitSYP?: SortOrder
  }

  export type SaleAvgOrderByAggregateInput = {
    weight?: SortOrder
    pricePerGramUSD?: SortOrder
    pricePerGramSYP?: SortOrder
    totalUSD?: SortOrder
    totalSYP?: SortOrder
    amountPaid?: SortOrder
    profitUSD?: SortOrder
    profitSYP?: SortOrder
  }

  export type SaleMaxOrderByAggregateInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    weight?: SortOrder
    goldType?: SortOrder
    pricePerGramUSD?: SortOrder
    pricePerGramSYP?: SortOrder
    totalUSD?: SortOrder
    totalSYP?: SortOrder
    currency?: SortOrder
    paymentType?: SortOrder
    amountPaid?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    description?: SortOrder
    reportId?: SortOrder
    storeId?: SortOrder
    profitUSD?: SortOrder
    profitSYP?: SortOrder
  }

  export type SaleMinOrderByAggregateInput = {
    id?: SortOrder
    invoiceNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    weight?: SortOrder
    goldType?: SortOrder
    pricePerGramUSD?: SortOrder
    pricePerGramSYP?: SortOrder
    totalUSD?: SortOrder
    totalSYP?: SortOrder
    currency?: SortOrder
    paymentType?: SortOrder
    amountPaid?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    description?: SortOrder
    reportId?: SortOrder
    storeId?: SortOrder
    profitUSD?: SortOrder
    profitSYP?: SortOrder
  }

  export type SaleSumOrderByAggregateInput = {
    weight?: SortOrder
    pricePerGramUSD?: SortOrder
    pricePerGramSYP?: SortOrder
    totalUSD?: SortOrder
    totalSYP?: SortOrder
    amountPaid?: SortOrder
    profitUSD?: SortOrder
    profitSYP?: SortOrder
  }

  export type EnumGoldTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GoldType | EnumGoldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GoldType[] | ListEnumGoldTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GoldType[] | ListEnumGoldTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGoldTypeWithAggregatesFilter<$PrismaModel> | $Enums.GoldType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGoldTypeFilter<$PrismaModel>
    _max?: NestedEnumGoldTypeFilter<$PrismaModel>
  }

  export type EnumCurrencyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrencyType | EnumCurrencyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyTypeWithAggregatesFilter<$PrismaModel> | $Enums.CurrencyType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurrencyTypeFilter<$PrismaModel>
    _max?: NestedEnumCurrencyTypeFilter<$PrismaModel>
  }

  export type EnumPaymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentTypeFilter<$PrismaModel>
    _max?: NestedEnumPaymentTypeFilter<$PrismaModel>
  }

  export type EnumStockTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StockType | EnumStockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StockType[] | ListEnumStockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockType[] | ListEnumStockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStockTypeFilter<$PrismaModel> | $Enums.StockType
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StockCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    goldType?: SortOrder
    quantity?: SortOrder
    type?: SortOrder
    balanceAfter?: SortOrder
    costPerGramUSD?: SortOrder
    totalCostUSD?: SortOrder
    totalCostSYP?: SortOrder
    supplier?: SortOrder
    invoiceRef?: SortOrder
    note?: SortOrder
    reportId?: SortOrder
    storeId?: SortOrder
  }

  export type StockAvgOrderByAggregateInput = {
    quantity?: SortOrder
    balanceAfter?: SortOrder
    costPerGramUSD?: SortOrder
    totalCostUSD?: SortOrder
    totalCostSYP?: SortOrder
  }

  export type StockMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    goldType?: SortOrder
    quantity?: SortOrder
    type?: SortOrder
    balanceAfter?: SortOrder
    costPerGramUSD?: SortOrder
    totalCostUSD?: SortOrder
    totalCostSYP?: SortOrder
    supplier?: SortOrder
    invoiceRef?: SortOrder
    note?: SortOrder
    reportId?: SortOrder
    storeId?: SortOrder
  }

  export type StockMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    goldType?: SortOrder
    quantity?: SortOrder
    type?: SortOrder
    balanceAfter?: SortOrder
    costPerGramUSD?: SortOrder
    totalCostUSD?: SortOrder
    totalCostSYP?: SortOrder
    supplier?: SortOrder
    invoiceRef?: SortOrder
    note?: SortOrder
    reportId?: SortOrder
    storeId?: SortOrder
  }

  export type StockSumOrderByAggregateInput = {
    quantity?: SortOrder
    balanceAfter?: SortOrder
    costPerGramUSD?: SortOrder
    totalCostUSD?: SortOrder
    totalCostSYP?: SortOrder
  }

  export type EnumStockTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StockType | EnumStockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StockType[] | ListEnumStockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockType[] | ListEnumStockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStockTypeWithAggregatesFilter<$PrismaModel> | $Enums.StockType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStockTypeFilter<$PrismaModel>
    _max?: NestedEnumStockTypeFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumCurrencyTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrencyType | EnumCurrencyTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCurrencyTypeNullableFilter<$PrismaModel> | $Enums.CurrencyType | null
  }

  export type ExchangeCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fromCurrency?: SortOrder
    toCurrency?: SortOrder
    exchangeRate?: SortOrder
    amountFrom?: SortOrder
    amountTo?: SortOrder
    balanceUSDAfter?: SortOrder
    balanceSYPAfter?: SortOrder
    reportId?: SortOrder
    storeId?: SortOrder
  }

  export type ExchangeAvgOrderByAggregateInput = {
    exchangeRate?: SortOrder
    amountFrom?: SortOrder
    amountTo?: SortOrder
    balanceUSDAfter?: SortOrder
    balanceSYPAfter?: SortOrder
  }

  export type ExchangeMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fromCurrency?: SortOrder
    toCurrency?: SortOrder
    exchangeRate?: SortOrder
    amountFrom?: SortOrder
    amountTo?: SortOrder
    balanceUSDAfter?: SortOrder
    balanceSYPAfter?: SortOrder
    reportId?: SortOrder
    storeId?: SortOrder
  }

  export type ExchangeMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    fromCurrency?: SortOrder
    toCurrency?: SortOrder
    exchangeRate?: SortOrder
    amountFrom?: SortOrder
    amountTo?: SortOrder
    balanceUSDAfter?: SortOrder
    balanceSYPAfter?: SortOrder
    reportId?: SortOrder
    storeId?: SortOrder
  }

  export type ExchangeSumOrderByAggregateInput = {
    exchangeRate?: SortOrder
    amountFrom?: SortOrder
    amountTo?: SortOrder
    balanceUSDAfter?: SortOrder
    balanceSYPAfter?: SortOrder
  }

  export type EnumCurrencyTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrencyType | EnumCurrencyTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCurrencyTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.CurrencyType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCurrencyTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumCurrencyTypeNullableFilter<$PrismaModel>
  }

  export type EnumDayStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DayStatus | EnumDayStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DayStatus[] | ListEnumDayStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayStatus[] | ListEnumDayStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDayStatusFilter<$PrismaModel> | $Enums.DayStatus
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    openingUSD?: SortOrder
    closingUSD?: SortOrder
    openingSYP?: SortOrder
    closingSYP?: SortOrder
    openingGold14?: SortOrder
    closingGold14?: SortOrder
    openingGold18?: SortOrder
    closingGold18?: SortOrder
    openingGold21?: SortOrder
    closingGold21?: SortOrder
    openingGold24?: SortOrder
    closingGold24?: SortOrder
    priceGold14USD?: SortOrder
    priceGold18USD?: SortOrder
    priceGold21USD?: SortOrder
    priceGold24USD?: SortOrder
    priceGold14SYP?: SortOrder
    priceGold18SYP?: SortOrder
    priceGold21SYP?: SortOrder
    priceGold24SYP?: SortOrder
    exchangeRateUSDtoSYP?: SortOrder
    totalGoldSold?: SortOrder
    totalSalesUSD?: SortOrder
    totalSalesSYP?: SortOrder
    profitUSD?: SortOrder
    profitSYP?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    storeId?: SortOrder
  }

  export type ReportAvgOrderByAggregateInput = {
    openingUSD?: SortOrder
    closingUSD?: SortOrder
    openingSYP?: SortOrder
    closingSYP?: SortOrder
    openingGold14?: SortOrder
    closingGold14?: SortOrder
    openingGold18?: SortOrder
    closingGold18?: SortOrder
    openingGold21?: SortOrder
    closingGold21?: SortOrder
    openingGold24?: SortOrder
    closingGold24?: SortOrder
    priceGold14USD?: SortOrder
    priceGold18USD?: SortOrder
    priceGold21USD?: SortOrder
    priceGold24USD?: SortOrder
    priceGold14SYP?: SortOrder
    priceGold18SYP?: SortOrder
    priceGold21SYP?: SortOrder
    priceGold24SYP?: SortOrder
    exchangeRateUSDtoSYP?: SortOrder
    totalGoldSold?: SortOrder
    totalSalesUSD?: SortOrder
    totalSalesSYP?: SortOrder
    profitUSD?: SortOrder
    profitSYP?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    openingUSD?: SortOrder
    closingUSD?: SortOrder
    openingSYP?: SortOrder
    closingSYP?: SortOrder
    openingGold14?: SortOrder
    closingGold14?: SortOrder
    openingGold18?: SortOrder
    closingGold18?: SortOrder
    openingGold21?: SortOrder
    closingGold21?: SortOrder
    openingGold24?: SortOrder
    closingGold24?: SortOrder
    priceGold14USD?: SortOrder
    priceGold18USD?: SortOrder
    priceGold21USD?: SortOrder
    priceGold24USD?: SortOrder
    priceGold14SYP?: SortOrder
    priceGold18SYP?: SortOrder
    priceGold21SYP?: SortOrder
    priceGold24SYP?: SortOrder
    exchangeRateUSDtoSYP?: SortOrder
    totalGoldSold?: SortOrder
    totalSalesUSD?: SortOrder
    totalSalesSYP?: SortOrder
    profitUSD?: SortOrder
    profitSYP?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    storeId?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    openingUSD?: SortOrder
    closingUSD?: SortOrder
    openingSYP?: SortOrder
    closingSYP?: SortOrder
    openingGold14?: SortOrder
    closingGold14?: SortOrder
    openingGold18?: SortOrder
    closingGold18?: SortOrder
    openingGold21?: SortOrder
    closingGold21?: SortOrder
    openingGold24?: SortOrder
    closingGold24?: SortOrder
    priceGold14USD?: SortOrder
    priceGold18USD?: SortOrder
    priceGold21USD?: SortOrder
    priceGold24USD?: SortOrder
    priceGold14SYP?: SortOrder
    priceGold18SYP?: SortOrder
    priceGold21SYP?: SortOrder
    priceGold24SYP?: SortOrder
    exchangeRateUSDtoSYP?: SortOrder
    totalGoldSold?: SortOrder
    totalSalesUSD?: SortOrder
    totalSalesSYP?: SortOrder
    profitUSD?: SortOrder
    profitSYP?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    storeId?: SortOrder
  }

  export type ReportSumOrderByAggregateInput = {
    openingUSD?: SortOrder
    closingUSD?: SortOrder
    openingSYP?: SortOrder
    closingSYP?: SortOrder
    openingGold14?: SortOrder
    closingGold14?: SortOrder
    openingGold18?: SortOrder
    closingGold18?: SortOrder
    openingGold21?: SortOrder
    closingGold21?: SortOrder
    openingGold24?: SortOrder
    closingGold24?: SortOrder
    priceGold14USD?: SortOrder
    priceGold18USD?: SortOrder
    priceGold21USD?: SortOrder
    priceGold24USD?: SortOrder
    priceGold14SYP?: SortOrder
    priceGold18SYP?: SortOrder
    priceGold21SYP?: SortOrder
    priceGold24SYP?: SortOrder
    exchangeRateUSDtoSYP?: SortOrder
    totalGoldSold?: SortOrder
    totalSalesUSD?: SortOrder
    totalSalesSYP?: SortOrder
    profitUSD?: SortOrder
    profitSYP?: SortOrder
  }

  export type EnumDayStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayStatus | EnumDayStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DayStatus[] | ListEnumDayStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayStatus[] | ListEnumDayStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDayStatusWithAggregatesFilter<$PrismaModel> | $Enums.DayStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayStatusFilter<$PrismaModel>
    _max?: NestedEnumDayStatusFilter<$PrismaModel>
  }

  export type StoreCreateNestedManyWithoutOwnerInput = {
    create?: XOR<StoreCreateWithoutOwnerInput, StoreUncheckedCreateWithoutOwnerInput> | StoreCreateWithoutOwnerInput[] | StoreUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutOwnerInput | StoreCreateOrConnectWithoutOwnerInput[]
    createMany?: StoreCreateManyOwnerInputEnvelope
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
  }

  export type StoreUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<StoreCreateWithoutOwnerInput, StoreUncheckedCreateWithoutOwnerInput> | StoreCreateWithoutOwnerInput[] | StoreUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutOwnerInput | StoreCreateOrConnectWithoutOwnerInput[]
    createMany?: StoreCreateManyOwnerInputEnvelope
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StoreUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<StoreCreateWithoutOwnerInput, StoreUncheckedCreateWithoutOwnerInput> | StoreCreateWithoutOwnerInput[] | StoreUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutOwnerInput | StoreCreateOrConnectWithoutOwnerInput[]
    upsert?: StoreUpsertWithWhereUniqueWithoutOwnerInput | StoreUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: StoreCreateManyOwnerInputEnvelope
    set?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    disconnect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    delete?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    update?: StoreUpdateWithWhereUniqueWithoutOwnerInput | StoreUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: StoreUpdateManyWithWhereWithoutOwnerInput | StoreUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: StoreScalarWhereInput | StoreScalarWhereInput[]
  }

  export type StoreUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<StoreCreateWithoutOwnerInput, StoreUncheckedCreateWithoutOwnerInput> | StoreCreateWithoutOwnerInput[] | StoreUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutOwnerInput | StoreCreateOrConnectWithoutOwnerInput[]
    upsert?: StoreUpsertWithWhereUniqueWithoutOwnerInput | StoreUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: StoreCreateManyOwnerInputEnvelope
    set?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    disconnect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    delete?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    update?: StoreUpdateWithWhereUniqueWithoutOwnerInput | StoreUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: StoreUpdateManyWithWhereWithoutOwnerInput | StoreUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: StoreScalarWhereInput | StoreScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutStoresInput = {
    create?: XOR<UserCreateWithoutStoresInput, UserUncheckedCreateWithoutStoresInput>
    connectOrCreate?: UserCreateOrConnectWithoutStoresInput
    connect?: UserWhereUniqueInput
  }

  export type SaleCreateNestedManyWithoutStoreInput = {
    create?: XOR<SaleCreateWithoutStoreInput, SaleUncheckedCreateWithoutStoreInput> | SaleCreateWithoutStoreInput[] | SaleUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutStoreInput | SaleCreateOrConnectWithoutStoreInput[]
    createMany?: SaleCreateManyStoreInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type StockCreateNestedManyWithoutStoreInput = {
    create?: XOR<StockCreateWithoutStoreInput, StockUncheckedCreateWithoutStoreInput> | StockCreateWithoutStoreInput[] | StockUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StockCreateOrConnectWithoutStoreInput | StockCreateOrConnectWithoutStoreInput[]
    createMany?: StockCreateManyStoreInputEnvelope
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
  }

  export type ExchangeCreateNestedManyWithoutStoreInput = {
    create?: XOR<ExchangeCreateWithoutStoreInput, ExchangeUncheckedCreateWithoutStoreInput> | ExchangeCreateWithoutStoreInput[] | ExchangeUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ExchangeCreateOrConnectWithoutStoreInput | ExchangeCreateOrConnectWithoutStoreInput[]
    createMany?: ExchangeCreateManyStoreInputEnvelope
    connect?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
  }

  export type ReportCreateNestedManyWithoutStoreInput = {
    create?: XOR<ReportCreateWithoutStoreInput, ReportUncheckedCreateWithoutStoreInput> | ReportCreateWithoutStoreInput[] | ReportUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutStoreInput | ReportCreateOrConnectWithoutStoreInput[]
    createMany?: ReportCreateManyStoreInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type SaleUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<SaleCreateWithoutStoreInput, SaleUncheckedCreateWithoutStoreInput> | SaleCreateWithoutStoreInput[] | SaleUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutStoreInput | SaleCreateOrConnectWithoutStoreInput[]
    createMany?: SaleCreateManyStoreInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type StockUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<StockCreateWithoutStoreInput, StockUncheckedCreateWithoutStoreInput> | StockCreateWithoutStoreInput[] | StockUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StockCreateOrConnectWithoutStoreInput | StockCreateOrConnectWithoutStoreInput[]
    createMany?: StockCreateManyStoreInputEnvelope
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
  }

  export type ExchangeUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<ExchangeCreateWithoutStoreInput, ExchangeUncheckedCreateWithoutStoreInput> | ExchangeCreateWithoutStoreInput[] | ExchangeUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ExchangeCreateOrConnectWithoutStoreInput | ExchangeCreateOrConnectWithoutStoreInput[]
    createMany?: ExchangeCreateManyStoreInputEnvelope
    connect?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<ReportCreateWithoutStoreInput, ReportUncheckedCreateWithoutStoreInput> | ReportCreateWithoutStoreInput[] | ReportUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutStoreInput | ReportCreateOrConnectWithoutStoreInput[]
    createMany?: ReportCreateManyStoreInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type EnumStoreStatusFieldUpdateOperationsInput = {
    set?: $Enums.StoreStatus
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutStoresNestedInput = {
    create?: XOR<UserCreateWithoutStoresInput, UserUncheckedCreateWithoutStoresInput>
    connectOrCreate?: UserCreateOrConnectWithoutStoresInput
    upsert?: UserUpsertWithoutStoresInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStoresInput, UserUpdateWithoutStoresInput>, UserUncheckedUpdateWithoutStoresInput>
  }

  export type SaleUpdateManyWithoutStoreNestedInput = {
    create?: XOR<SaleCreateWithoutStoreInput, SaleUncheckedCreateWithoutStoreInput> | SaleCreateWithoutStoreInput[] | SaleUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutStoreInput | SaleCreateOrConnectWithoutStoreInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutStoreInput | SaleUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: SaleCreateManyStoreInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutStoreInput | SaleUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutStoreInput | SaleUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type StockUpdateManyWithoutStoreNestedInput = {
    create?: XOR<StockCreateWithoutStoreInput, StockUncheckedCreateWithoutStoreInput> | StockCreateWithoutStoreInput[] | StockUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StockCreateOrConnectWithoutStoreInput | StockCreateOrConnectWithoutStoreInput[]
    upsert?: StockUpsertWithWhereUniqueWithoutStoreInput | StockUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: StockCreateManyStoreInputEnvelope
    set?: StockWhereUniqueInput | StockWhereUniqueInput[]
    disconnect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    delete?: StockWhereUniqueInput | StockWhereUniqueInput[]
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    update?: StockUpdateWithWhereUniqueWithoutStoreInput | StockUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: StockUpdateManyWithWhereWithoutStoreInput | StockUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: StockScalarWhereInput | StockScalarWhereInput[]
  }

  export type ExchangeUpdateManyWithoutStoreNestedInput = {
    create?: XOR<ExchangeCreateWithoutStoreInput, ExchangeUncheckedCreateWithoutStoreInput> | ExchangeCreateWithoutStoreInput[] | ExchangeUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ExchangeCreateOrConnectWithoutStoreInput | ExchangeCreateOrConnectWithoutStoreInput[]
    upsert?: ExchangeUpsertWithWhereUniqueWithoutStoreInput | ExchangeUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: ExchangeCreateManyStoreInputEnvelope
    set?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    disconnect?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    delete?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    connect?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    update?: ExchangeUpdateWithWhereUniqueWithoutStoreInput | ExchangeUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: ExchangeUpdateManyWithWhereWithoutStoreInput | ExchangeUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: ExchangeScalarWhereInput | ExchangeScalarWhereInput[]
  }

  export type ReportUpdateManyWithoutStoreNestedInput = {
    create?: XOR<ReportCreateWithoutStoreInput, ReportUncheckedCreateWithoutStoreInput> | ReportCreateWithoutStoreInput[] | ReportUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutStoreInput | ReportCreateOrConnectWithoutStoreInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutStoreInput | ReportUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: ReportCreateManyStoreInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutStoreInput | ReportUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutStoreInput | ReportUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type SaleUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<SaleCreateWithoutStoreInput, SaleUncheckedCreateWithoutStoreInput> | SaleCreateWithoutStoreInput[] | SaleUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutStoreInput | SaleCreateOrConnectWithoutStoreInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutStoreInput | SaleUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: SaleCreateManyStoreInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutStoreInput | SaleUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutStoreInput | SaleUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type StockUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<StockCreateWithoutStoreInput, StockUncheckedCreateWithoutStoreInput> | StockCreateWithoutStoreInput[] | StockUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StockCreateOrConnectWithoutStoreInput | StockCreateOrConnectWithoutStoreInput[]
    upsert?: StockUpsertWithWhereUniqueWithoutStoreInput | StockUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: StockCreateManyStoreInputEnvelope
    set?: StockWhereUniqueInput | StockWhereUniqueInput[]
    disconnect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    delete?: StockWhereUniqueInput | StockWhereUniqueInput[]
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    update?: StockUpdateWithWhereUniqueWithoutStoreInput | StockUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: StockUpdateManyWithWhereWithoutStoreInput | StockUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: StockScalarWhereInput | StockScalarWhereInput[]
  }

  export type ExchangeUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<ExchangeCreateWithoutStoreInput, ExchangeUncheckedCreateWithoutStoreInput> | ExchangeCreateWithoutStoreInput[] | ExchangeUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ExchangeCreateOrConnectWithoutStoreInput | ExchangeCreateOrConnectWithoutStoreInput[]
    upsert?: ExchangeUpsertWithWhereUniqueWithoutStoreInput | ExchangeUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: ExchangeCreateManyStoreInputEnvelope
    set?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    disconnect?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    delete?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    connect?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    update?: ExchangeUpdateWithWhereUniqueWithoutStoreInput | ExchangeUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: ExchangeUpdateManyWithWhereWithoutStoreInput | ExchangeUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: ExchangeScalarWhereInput | ExchangeScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<ReportCreateWithoutStoreInput, ReportUncheckedCreateWithoutStoreInput> | ReportCreateWithoutStoreInput[] | ReportUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutStoreInput | ReportCreateOrConnectWithoutStoreInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutStoreInput | ReportUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: ReportCreateManyStoreInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutStoreInput | ReportUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutStoreInput | ReportUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type ReportCreateNestedOneWithoutSalesInput = {
    create?: XOR<ReportCreateWithoutSalesInput, ReportUncheckedCreateWithoutSalesInput>
    connectOrCreate?: ReportCreateOrConnectWithoutSalesInput
    connect?: ReportWhereUniqueInput
  }

  export type StoreCreateNestedOneWithoutSalesInput = {
    create?: XOR<StoreCreateWithoutSalesInput, StoreUncheckedCreateWithoutSalesInput>
    connectOrCreate?: StoreCreateOrConnectWithoutSalesInput
    connect?: StoreWhereUniqueInput
  }

  export type EnumGoldTypeFieldUpdateOperationsInput = {
    set?: $Enums.GoldType
  }

  export type EnumCurrencyTypeFieldUpdateOperationsInput = {
    set?: $Enums.CurrencyType
  }

  export type EnumPaymentTypeFieldUpdateOperationsInput = {
    set?: $Enums.PaymentType
  }

  export type ReportUpdateOneWithoutSalesNestedInput = {
    create?: XOR<ReportCreateWithoutSalesInput, ReportUncheckedCreateWithoutSalesInput>
    connectOrCreate?: ReportCreateOrConnectWithoutSalesInput
    upsert?: ReportUpsertWithoutSalesInput
    disconnect?: ReportWhereInput | boolean
    delete?: ReportWhereInput | boolean
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutSalesInput, ReportUpdateWithoutSalesInput>, ReportUncheckedUpdateWithoutSalesInput>
  }

  export type StoreUpdateOneRequiredWithoutSalesNestedInput = {
    create?: XOR<StoreCreateWithoutSalesInput, StoreUncheckedCreateWithoutSalesInput>
    connectOrCreate?: StoreCreateOrConnectWithoutSalesInput
    upsert?: StoreUpsertWithoutSalesInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutSalesInput, StoreUpdateWithoutSalesInput>, StoreUncheckedUpdateWithoutSalesInput>
  }

  export type ReportCreateNestedOneWithoutStocksInput = {
    create?: XOR<ReportCreateWithoutStocksInput, ReportUncheckedCreateWithoutStocksInput>
    connectOrCreate?: ReportCreateOrConnectWithoutStocksInput
    connect?: ReportWhereUniqueInput
  }

  export type StoreCreateNestedOneWithoutStocksInput = {
    create?: XOR<StoreCreateWithoutStocksInput, StoreUncheckedCreateWithoutStocksInput>
    connectOrCreate?: StoreCreateOrConnectWithoutStocksInput
    connect?: StoreWhereUniqueInput
  }

  export type EnumStockTypeFieldUpdateOperationsInput = {
    set?: $Enums.StockType
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ReportUpdateOneWithoutStocksNestedInput = {
    create?: XOR<ReportCreateWithoutStocksInput, ReportUncheckedCreateWithoutStocksInput>
    connectOrCreate?: ReportCreateOrConnectWithoutStocksInput
    upsert?: ReportUpsertWithoutStocksInput
    disconnect?: ReportWhereInput | boolean
    delete?: ReportWhereInput | boolean
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutStocksInput, ReportUpdateWithoutStocksInput>, ReportUncheckedUpdateWithoutStocksInput>
  }

  export type StoreUpdateOneRequiredWithoutStocksNestedInput = {
    create?: XOR<StoreCreateWithoutStocksInput, StoreUncheckedCreateWithoutStocksInput>
    connectOrCreate?: StoreCreateOrConnectWithoutStocksInput
    upsert?: StoreUpsertWithoutStocksInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutStocksInput, StoreUpdateWithoutStocksInput>, StoreUncheckedUpdateWithoutStocksInput>
  }

  export type ReportCreateNestedOneWithoutExchangesInput = {
    create?: XOR<ReportCreateWithoutExchangesInput, ReportUncheckedCreateWithoutExchangesInput>
    connectOrCreate?: ReportCreateOrConnectWithoutExchangesInput
    connect?: ReportWhereUniqueInput
  }

  export type StoreCreateNestedOneWithoutExchangesInput = {
    create?: XOR<StoreCreateWithoutExchangesInput, StoreUncheckedCreateWithoutExchangesInput>
    connectOrCreate?: StoreCreateOrConnectWithoutExchangesInput
    connect?: StoreWhereUniqueInput
  }

  export type NullableEnumCurrencyTypeFieldUpdateOperationsInput = {
    set?: $Enums.CurrencyType | null
  }

  export type ReportUpdateOneWithoutExchangesNestedInput = {
    create?: XOR<ReportCreateWithoutExchangesInput, ReportUncheckedCreateWithoutExchangesInput>
    connectOrCreate?: ReportCreateOrConnectWithoutExchangesInput
    upsert?: ReportUpsertWithoutExchangesInput
    disconnect?: ReportWhereInput | boolean
    delete?: ReportWhereInput | boolean
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutExchangesInput, ReportUpdateWithoutExchangesInput>, ReportUncheckedUpdateWithoutExchangesInput>
  }

  export type StoreUpdateOneRequiredWithoutExchangesNestedInput = {
    create?: XOR<StoreCreateWithoutExchangesInput, StoreUncheckedCreateWithoutExchangesInput>
    connectOrCreate?: StoreCreateOrConnectWithoutExchangesInput
    upsert?: StoreUpsertWithoutExchangesInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutExchangesInput, StoreUpdateWithoutExchangesInput>, StoreUncheckedUpdateWithoutExchangesInput>
  }

  export type StoreCreateNestedOneWithoutReportsInput = {
    create?: XOR<StoreCreateWithoutReportsInput, StoreUncheckedCreateWithoutReportsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutReportsInput
    connect?: StoreWhereUniqueInput
  }

  export type SaleCreateNestedManyWithoutReportInput = {
    create?: XOR<SaleCreateWithoutReportInput, SaleUncheckedCreateWithoutReportInput> | SaleCreateWithoutReportInput[] | SaleUncheckedCreateWithoutReportInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutReportInput | SaleCreateOrConnectWithoutReportInput[]
    createMany?: SaleCreateManyReportInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type StockCreateNestedManyWithoutReportInput = {
    create?: XOR<StockCreateWithoutReportInput, StockUncheckedCreateWithoutReportInput> | StockCreateWithoutReportInput[] | StockUncheckedCreateWithoutReportInput[]
    connectOrCreate?: StockCreateOrConnectWithoutReportInput | StockCreateOrConnectWithoutReportInput[]
    createMany?: StockCreateManyReportInputEnvelope
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
  }

  export type ExchangeCreateNestedManyWithoutReportInput = {
    create?: XOR<ExchangeCreateWithoutReportInput, ExchangeUncheckedCreateWithoutReportInput> | ExchangeCreateWithoutReportInput[] | ExchangeUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ExchangeCreateOrConnectWithoutReportInput | ExchangeCreateOrConnectWithoutReportInput[]
    createMany?: ExchangeCreateManyReportInputEnvelope
    connect?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
  }

  export type SaleUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<SaleCreateWithoutReportInput, SaleUncheckedCreateWithoutReportInput> | SaleCreateWithoutReportInput[] | SaleUncheckedCreateWithoutReportInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutReportInput | SaleCreateOrConnectWithoutReportInput[]
    createMany?: SaleCreateManyReportInputEnvelope
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
  }

  export type StockUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<StockCreateWithoutReportInput, StockUncheckedCreateWithoutReportInput> | StockCreateWithoutReportInput[] | StockUncheckedCreateWithoutReportInput[]
    connectOrCreate?: StockCreateOrConnectWithoutReportInput | StockCreateOrConnectWithoutReportInput[]
    createMany?: StockCreateManyReportInputEnvelope
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
  }

  export type ExchangeUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<ExchangeCreateWithoutReportInput, ExchangeUncheckedCreateWithoutReportInput> | ExchangeCreateWithoutReportInput[] | ExchangeUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ExchangeCreateOrConnectWithoutReportInput | ExchangeCreateOrConnectWithoutReportInput[]
    createMany?: ExchangeCreateManyReportInputEnvelope
    connect?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
  }

  export type EnumDayStatusFieldUpdateOperationsInput = {
    set?: $Enums.DayStatus
  }

  export type StoreUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<StoreCreateWithoutReportsInput, StoreUncheckedCreateWithoutReportsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutReportsInput
    upsert?: StoreUpsertWithoutReportsInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutReportsInput, StoreUpdateWithoutReportsInput>, StoreUncheckedUpdateWithoutReportsInput>
  }

  export type SaleUpdateManyWithoutReportNestedInput = {
    create?: XOR<SaleCreateWithoutReportInput, SaleUncheckedCreateWithoutReportInput> | SaleCreateWithoutReportInput[] | SaleUncheckedCreateWithoutReportInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutReportInput | SaleCreateOrConnectWithoutReportInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutReportInput | SaleUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: SaleCreateManyReportInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutReportInput | SaleUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutReportInput | SaleUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type StockUpdateManyWithoutReportNestedInput = {
    create?: XOR<StockCreateWithoutReportInput, StockUncheckedCreateWithoutReportInput> | StockCreateWithoutReportInput[] | StockUncheckedCreateWithoutReportInput[]
    connectOrCreate?: StockCreateOrConnectWithoutReportInput | StockCreateOrConnectWithoutReportInput[]
    upsert?: StockUpsertWithWhereUniqueWithoutReportInput | StockUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: StockCreateManyReportInputEnvelope
    set?: StockWhereUniqueInput | StockWhereUniqueInput[]
    disconnect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    delete?: StockWhereUniqueInput | StockWhereUniqueInput[]
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    update?: StockUpdateWithWhereUniqueWithoutReportInput | StockUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: StockUpdateManyWithWhereWithoutReportInput | StockUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: StockScalarWhereInput | StockScalarWhereInput[]
  }

  export type ExchangeUpdateManyWithoutReportNestedInput = {
    create?: XOR<ExchangeCreateWithoutReportInput, ExchangeUncheckedCreateWithoutReportInput> | ExchangeCreateWithoutReportInput[] | ExchangeUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ExchangeCreateOrConnectWithoutReportInput | ExchangeCreateOrConnectWithoutReportInput[]
    upsert?: ExchangeUpsertWithWhereUniqueWithoutReportInput | ExchangeUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: ExchangeCreateManyReportInputEnvelope
    set?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    disconnect?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    delete?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    connect?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    update?: ExchangeUpdateWithWhereUniqueWithoutReportInput | ExchangeUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: ExchangeUpdateManyWithWhereWithoutReportInput | ExchangeUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: ExchangeScalarWhereInput | ExchangeScalarWhereInput[]
  }

  export type SaleUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<SaleCreateWithoutReportInput, SaleUncheckedCreateWithoutReportInput> | SaleCreateWithoutReportInput[] | SaleUncheckedCreateWithoutReportInput[]
    connectOrCreate?: SaleCreateOrConnectWithoutReportInput | SaleCreateOrConnectWithoutReportInput[]
    upsert?: SaleUpsertWithWhereUniqueWithoutReportInput | SaleUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: SaleCreateManyReportInputEnvelope
    set?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    disconnect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    delete?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    connect?: SaleWhereUniqueInput | SaleWhereUniqueInput[]
    update?: SaleUpdateWithWhereUniqueWithoutReportInput | SaleUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: SaleUpdateManyWithWhereWithoutReportInput | SaleUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: SaleScalarWhereInput | SaleScalarWhereInput[]
  }

  export type StockUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<StockCreateWithoutReportInput, StockUncheckedCreateWithoutReportInput> | StockCreateWithoutReportInput[] | StockUncheckedCreateWithoutReportInput[]
    connectOrCreate?: StockCreateOrConnectWithoutReportInput | StockCreateOrConnectWithoutReportInput[]
    upsert?: StockUpsertWithWhereUniqueWithoutReportInput | StockUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: StockCreateManyReportInputEnvelope
    set?: StockWhereUniqueInput | StockWhereUniqueInput[]
    disconnect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    delete?: StockWhereUniqueInput | StockWhereUniqueInput[]
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    update?: StockUpdateWithWhereUniqueWithoutReportInput | StockUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: StockUpdateManyWithWhereWithoutReportInput | StockUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: StockScalarWhereInput | StockScalarWhereInput[]
  }

  export type ExchangeUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<ExchangeCreateWithoutReportInput, ExchangeUncheckedCreateWithoutReportInput> | ExchangeCreateWithoutReportInput[] | ExchangeUncheckedCreateWithoutReportInput[]
    connectOrCreate?: ExchangeCreateOrConnectWithoutReportInput | ExchangeCreateOrConnectWithoutReportInput[]
    upsert?: ExchangeUpsertWithWhereUniqueWithoutReportInput | ExchangeUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: ExchangeCreateManyReportInputEnvelope
    set?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    disconnect?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    delete?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    connect?: ExchangeWhereUniqueInput | ExchangeWhereUniqueInput[]
    update?: ExchangeUpdateWithWhereUniqueWithoutReportInput | ExchangeUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: ExchangeUpdateManyWithWhereWithoutReportInput | ExchangeUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: ExchangeScalarWhereInput | ExchangeScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumStoreStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreStatus | EnumStoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreStatusFilter<$PrismaModel> | $Enums.StoreStatus
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumStoreStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreStatus | EnumStoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreStatusWithAggregatesFilter<$PrismaModel> | $Enums.StoreStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStoreStatusFilter<$PrismaModel>
    _max?: NestedEnumStoreStatusFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumGoldTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.GoldType | EnumGoldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GoldType[] | ListEnumGoldTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GoldType[] | ListEnumGoldTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGoldTypeFilter<$PrismaModel> | $Enums.GoldType
  }

  export type NestedEnumCurrencyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrencyType | EnumCurrencyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyTypeFilter<$PrismaModel> | $Enums.CurrencyType
  }

  export type NestedEnumPaymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeFilter<$PrismaModel> | $Enums.PaymentType
  }

  export type NestedEnumGoldTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GoldType | EnumGoldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GoldType[] | ListEnumGoldTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GoldType[] | ListEnumGoldTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGoldTypeWithAggregatesFilter<$PrismaModel> | $Enums.GoldType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGoldTypeFilter<$PrismaModel>
    _max?: NestedEnumGoldTypeFilter<$PrismaModel>
  }

  export type NestedEnumCurrencyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrencyType | EnumCurrencyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyTypeWithAggregatesFilter<$PrismaModel> | $Enums.CurrencyType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurrencyTypeFilter<$PrismaModel>
    _max?: NestedEnumCurrencyTypeFilter<$PrismaModel>
  }

  export type NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentTypeFilter<$PrismaModel>
    _max?: NestedEnumPaymentTypeFilter<$PrismaModel>
  }

  export type NestedEnumStockTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StockType | EnumStockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StockType[] | ListEnumStockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockType[] | ListEnumStockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStockTypeFilter<$PrismaModel> | $Enums.StockType
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumStockTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StockType | EnumStockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StockType[] | ListEnumStockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockType[] | ListEnumStockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStockTypeWithAggregatesFilter<$PrismaModel> | $Enums.StockType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStockTypeFilter<$PrismaModel>
    _max?: NestedEnumStockTypeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumCurrencyTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrencyType | EnumCurrencyTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCurrencyTypeNullableFilter<$PrismaModel> | $Enums.CurrencyType | null
  }

  export type NestedEnumCurrencyTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrencyType | EnumCurrencyTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CurrencyType[] | ListEnumCurrencyTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCurrencyTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.CurrencyType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCurrencyTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumCurrencyTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumDayStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DayStatus | EnumDayStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DayStatus[] | ListEnumDayStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayStatus[] | ListEnumDayStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDayStatusFilter<$PrismaModel> | $Enums.DayStatus
  }

  export type NestedEnumDayStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayStatus | EnumDayStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DayStatus[] | ListEnumDayStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayStatus[] | ListEnumDayStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDayStatusWithAggregatesFilter<$PrismaModel> | $Enums.DayStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayStatusFilter<$PrismaModel>
    _max?: NestedEnumDayStatusFilter<$PrismaModel>
  }

  export type StoreCreateWithoutOwnerInput = {
    id?: string
    name: string
    address?: string | null
    city?: string | null
    logoUrl?: string | null
    primaryPhoneNumber?: string | null
    secondaryPhoneNumber?: string | null
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    currentGold14?: number
    currentGold18?: number
    currentGold21?: number
    currentGold24?: number
    currentUSD?: number
    currentSYP?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    exchangeRateUSDtoSYP?: number
    sales?: SaleCreateNestedManyWithoutStoreInput
    stocks?: StockCreateNestedManyWithoutStoreInput
    exchanges?: ExchangeCreateNestedManyWithoutStoreInput
    reports?: ReportCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    address?: string | null
    city?: string | null
    logoUrl?: string | null
    primaryPhoneNumber?: string | null
    secondaryPhoneNumber?: string | null
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    currentGold14?: number
    currentGold18?: number
    currentGold21?: number
    currentGold24?: number
    currentUSD?: number
    currentSYP?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    exchangeRateUSDtoSYP?: number
    sales?: SaleUncheckedCreateNestedManyWithoutStoreInput
    stocks?: StockUncheckedCreateNestedManyWithoutStoreInput
    exchanges?: ExchangeUncheckedCreateNestedManyWithoutStoreInput
    reports?: ReportUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutOwnerInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutOwnerInput, StoreUncheckedCreateWithoutOwnerInput>
  }

  export type StoreCreateManyOwnerInputEnvelope = {
    data: StoreCreateManyOwnerInput | StoreCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type StoreUpsertWithWhereUniqueWithoutOwnerInput = {
    where: StoreWhereUniqueInput
    update: XOR<StoreUpdateWithoutOwnerInput, StoreUncheckedUpdateWithoutOwnerInput>
    create: XOR<StoreCreateWithoutOwnerInput, StoreUncheckedCreateWithoutOwnerInput>
  }

  export type StoreUpdateWithWhereUniqueWithoutOwnerInput = {
    where: StoreWhereUniqueInput
    data: XOR<StoreUpdateWithoutOwnerInput, StoreUncheckedUpdateWithoutOwnerInput>
  }

  export type StoreUpdateManyWithWhereWithoutOwnerInput = {
    where: StoreScalarWhereInput
    data: XOR<StoreUpdateManyMutationInput, StoreUncheckedUpdateManyWithoutOwnerInput>
  }

  export type StoreScalarWhereInput = {
    AND?: StoreScalarWhereInput | StoreScalarWhereInput[]
    OR?: StoreScalarWhereInput[]
    NOT?: StoreScalarWhereInput | StoreScalarWhereInput[]
    id?: StringFilter<"Store"> | string
    name?: StringFilter<"Store"> | string
    address?: StringNullableFilter<"Store"> | string | null
    city?: StringNullableFilter<"Store"> | string | null
    logoUrl?: StringNullableFilter<"Store"> | string | null
    primaryPhoneNumber?: StringNullableFilter<"Store"> | string | null
    secondaryPhoneNumber?: StringNullableFilter<"Store"> | string | null
    status?: EnumStoreStatusFilter<"Store"> | $Enums.StoreStatus
    createdAt?: DateTimeFilter<"Store"> | Date | string
    updatedAt?: DateTimeFilter<"Store"> | Date | string
    currentGold14?: FloatFilter<"Store"> | number
    currentGold18?: FloatFilter<"Store"> | number
    currentGold21?: FloatFilter<"Store"> | number
    currentGold24?: FloatFilter<"Store"> | number
    currentUSD?: FloatFilter<"Store"> | number
    currentSYP?: FloatFilter<"Store"> | number
    priceGold14USD?: FloatFilter<"Store"> | number
    priceGold18USD?: FloatFilter<"Store"> | number
    priceGold21USD?: FloatFilter<"Store"> | number
    priceGold24USD?: FloatFilter<"Store"> | number
    exchangeRateUSDtoSYP?: FloatFilter<"Store"> | number
    ownerId?: StringFilter<"Store"> | string
  }

  export type UserCreateWithoutStoresInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutStoresInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    role?: $Enums.Role
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutStoresInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStoresInput, UserUncheckedCreateWithoutStoresInput>
  }

  export type SaleCreateWithoutStoreInput = {
    id?: string
    invoiceNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weight: number
    goldType: $Enums.GoldType
    pricePerGramUSD: number
    pricePerGramSYP: number
    totalUSD: number
    totalSYP: number
    currency: $Enums.CurrencyType
    paymentType: $Enums.PaymentType
    amountPaid: number
    customerName?: string | null
    customerPhone?: string | null
    description?: string | null
    profitUSD: number
    profitSYP: number
    report?: ReportCreateNestedOneWithoutSalesInput
  }

  export type SaleUncheckedCreateWithoutStoreInput = {
    id?: string
    invoiceNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weight: number
    goldType: $Enums.GoldType
    pricePerGramUSD: number
    pricePerGramSYP: number
    totalUSD: number
    totalSYP: number
    currency: $Enums.CurrencyType
    paymentType: $Enums.PaymentType
    amountPaid: number
    customerName?: string | null
    customerPhone?: string | null
    description?: string | null
    reportId?: string | null
    profitUSD: number
    profitSYP: number
  }

  export type SaleCreateOrConnectWithoutStoreInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutStoreInput, SaleUncheckedCreateWithoutStoreInput>
  }

  export type SaleCreateManyStoreInputEnvelope = {
    data: SaleCreateManyStoreInput | SaleCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type StockCreateWithoutStoreInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    goldType: $Enums.GoldType
    quantity: number
    type: $Enums.StockType
    balanceAfter: number
    costPerGramUSD?: number | null
    totalCostUSD?: number | null
    totalCostSYP?: number | null
    supplier?: string | null
    invoiceRef?: string | null
    note?: string | null
    report?: ReportCreateNestedOneWithoutStocksInput
  }

  export type StockUncheckedCreateWithoutStoreInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    goldType: $Enums.GoldType
    quantity: number
    type: $Enums.StockType
    balanceAfter: number
    costPerGramUSD?: number | null
    totalCostUSD?: number | null
    totalCostSYP?: number | null
    supplier?: string | null
    invoiceRef?: string | null
    note?: string | null
    reportId?: string | null
  }

  export type StockCreateOrConnectWithoutStoreInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutStoreInput, StockUncheckedCreateWithoutStoreInput>
  }

  export type StockCreateManyStoreInputEnvelope = {
    data: StockCreateManyStoreInput | StockCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type ExchangeCreateWithoutStoreInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fromCurrency?: $Enums.CurrencyType | null
    toCurrency?: $Enums.CurrencyType | null
    exchangeRate?: number | null
    amountFrom?: number | null
    amountTo?: number | null
    balanceUSDAfter: number
    balanceSYPAfter: number
    report?: ReportCreateNestedOneWithoutExchangesInput
  }

  export type ExchangeUncheckedCreateWithoutStoreInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fromCurrency?: $Enums.CurrencyType | null
    toCurrency?: $Enums.CurrencyType | null
    exchangeRate?: number | null
    amountFrom?: number | null
    amountTo?: number | null
    balanceUSDAfter: number
    balanceSYPAfter: number
    reportId?: string | null
  }

  export type ExchangeCreateOrConnectWithoutStoreInput = {
    where: ExchangeWhereUniqueInput
    create: XOR<ExchangeCreateWithoutStoreInput, ExchangeUncheckedCreateWithoutStoreInput>
  }

  export type ExchangeCreateManyStoreInputEnvelope = {
    data: ExchangeCreateManyStoreInput | ExchangeCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type ReportCreateWithoutStoreInput = {
    id?: string
    date?: Date | string
    openingUSD?: number
    closingUSD?: number
    openingSYP?: number
    closingSYP?: number
    openingGold14?: number
    closingGold14?: number
    openingGold18?: number
    closingGold18?: number
    openingGold21?: number
    closingGold21?: number
    openingGold24?: number
    closingGold24?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    priceGold14SYP?: number
    priceGold18SYP?: number
    priceGold21SYP?: number
    priceGold24SYP?: number
    exchangeRateUSDtoSYP?: number
    totalGoldSold?: number
    totalSalesUSD?: number
    totalSalesSYP?: number
    profitUSD?: number
    profitSYP?: number
    notes?: string | null
    status?: $Enums.DayStatus
    createdAt?: Date | string
    sales?: SaleCreateNestedManyWithoutReportInput
    stocks?: StockCreateNestedManyWithoutReportInput
    exchanges?: ExchangeCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutStoreInput = {
    id?: string
    date?: Date | string
    openingUSD?: number
    closingUSD?: number
    openingSYP?: number
    closingSYP?: number
    openingGold14?: number
    closingGold14?: number
    openingGold18?: number
    closingGold18?: number
    openingGold21?: number
    closingGold21?: number
    openingGold24?: number
    closingGold24?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    priceGold14SYP?: number
    priceGold18SYP?: number
    priceGold21SYP?: number
    priceGold24SYP?: number
    exchangeRateUSDtoSYP?: number
    totalGoldSold?: number
    totalSalesUSD?: number
    totalSalesSYP?: number
    profitUSD?: number
    profitSYP?: number
    notes?: string | null
    status?: $Enums.DayStatus
    createdAt?: Date | string
    sales?: SaleUncheckedCreateNestedManyWithoutReportInput
    stocks?: StockUncheckedCreateNestedManyWithoutReportInput
    exchanges?: ExchangeUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutStoreInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutStoreInput, ReportUncheckedCreateWithoutStoreInput>
  }

  export type ReportCreateManyStoreInputEnvelope = {
    data: ReportCreateManyStoreInput | ReportCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutStoresInput = {
    update: XOR<UserUpdateWithoutStoresInput, UserUncheckedUpdateWithoutStoresInput>
    create: XOR<UserCreateWithoutStoresInput, UserUncheckedCreateWithoutStoresInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStoresInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStoresInput, UserUncheckedUpdateWithoutStoresInput>
  }

  export type UserUpdateWithoutStoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutStoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleUpsertWithWhereUniqueWithoutStoreInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutStoreInput, SaleUncheckedUpdateWithoutStoreInput>
    create: XOR<SaleCreateWithoutStoreInput, SaleUncheckedCreateWithoutStoreInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutStoreInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutStoreInput, SaleUncheckedUpdateWithoutStoreInput>
  }

  export type SaleUpdateManyWithWhereWithoutStoreInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutStoreInput>
  }

  export type SaleScalarWhereInput = {
    AND?: SaleScalarWhereInput | SaleScalarWhereInput[]
    OR?: SaleScalarWhereInput[]
    NOT?: SaleScalarWhereInput | SaleScalarWhereInput[]
    id?: StringFilter<"Sale"> | string
    invoiceNumber?: StringFilter<"Sale"> | string
    createdAt?: DateTimeFilter<"Sale"> | Date | string
    updatedAt?: DateTimeFilter<"Sale"> | Date | string
    weight?: FloatFilter<"Sale"> | number
    goldType?: EnumGoldTypeFilter<"Sale"> | $Enums.GoldType
    pricePerGramUSD?: FloatFilter<"Sale"> | number
    pricePerGramSYP?: FloatFilter<"Sale"> | number
    totalUSD?: FloatFilter<"Sale"> | number
    totalSYP?: FloatFilter<"Sale"> | number
    currency?: EnumCurrencyTypeFilter<"Sale"> | $Enums.CurrencyType
    paymentType?: EnumPaymentTypeFilter<"Sale"> | $Enums.PaymentType
    amountPaid?: FloatFilter<"Sale"> | number
    customerName?: StringNullableFilter<"Sale"> | string | null
    customerPhone?: StringNullableFilter<"Sale"> | string | null
    description?: StringNullableFilter<"Sale"> | string | null
    reportId?: StringNullableFilter<"Sale"> | string | null
    storeId?: StringFilter<"Sale"> | string
    profitUSD?: FloatFilter<"Sale"> | number
    profitSYP?: FloatFilter<"Sale"> | number
  }

  export type StockUpsertWithWhereUniqueWithoutStoreInput = {
    where: StockWhereUniqueInput
    update: XOR<StockUpdateWithoutStoreInput, StockUncheckedUpdateWithoutStoreInput>
    create: XOR<StockCreateWithoutStoreInput, StockUncheckedCreateWithoutStoreInput>
  }

  export type StockUpdateWithWhereUniqueWithoutStoreInput = {
    where: StockWhereUniqueInput
    data: XOR<StockUpdateWithoutStoreInput, StockUncheckedUpdateWithoutStoreInput>
  }

  export type StockUpdateManyWithWhereWithoutStoreInput = {
    where: StockScalarWhereInput
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyWithoutStoreInput>
  }

  export type StockScalarWhereInput = {
    AND?: StockScalarWhereInput | StockScalarWhereInput[]
    OR?: StockScalarWhereInput[]
    NOT?: StockScalarWhereInput | StockScalarWhereInput[]
    id?: StringFilter<"Stock"> | string
    createdAt?: DateTimeFilter<"Stock"> | Date | string
    updatedAt?: DateTimeFilter<"Stock"> | Date | string
    goldType?: EnumGoldTypeFilter<"Stock"> | $Enums.GoldType
    quantity?: FloatFilter<"Stock"> | number
    type?: EnumStockTypeFilter<"Stock"> | $Enums.StockType
    balanceAfter?: FloatFilter<"Stock"> | number
    costPerGramUSD?: FloatNullableFilter<"Stock"> | number | null
    totalCostUSD?: FloatNullableFilter<"Stock"> | number | null
    totalCostSYP?: FloatNullableFilter<"Stock"> | number | null
    supplier?: StringNullableFilter<"Stock"> | string | null
    invoiceRef?: StringNullableFilter<"Stock"> | string | null
    note?: StringNullableFilter<"Stock"> | string | null
    reportId?: StringNullableFilter<"Stock"> | string | null
    storeId?: StringFilter<"Stock"> | string
  }

  export type ExchangeUpsertWithWhereUniqueWithoutStoreInput = {
    where: ExchangeWhereUniqueInput
    update: XOR<ExchangeUpdateWithoutStoreInput, ExchangeUncheckedUpdateWithoutStoreInput>
    create: XOR<ExchangeCreateWithoutStoreInput, ExchangeUncheckedCreateWithoutStoreInput>
  }

  export type ExchangeUpdateWithWhereUniqueWithoutStoreInput = {
    where: ExchangeWhereUniqueInput
    data: XOR<ExchangeUpdateWithoutStoreInput, ExchangeUncheckedUpdateWithoutStoreInput>
  }

  export type ExchangeUpdateManyWithWhereWithoutStoreInput = {
    where: ExchangeScalarWhereInput
    data: XOR<ExchangeUpdateManyMutationInput, ExchangeUncheckedUpdateManyWithoutStoreInput>
  }

  export type ExchangeScalarWhereInput = {
    AND?: ExchangeScalarWhereInput | ExchangeScalarWhereInput[]
    OR?: ExchangeScalarWhereInput[]
    NOT?: ExchangeScalarWhereInput | ExchangeScalarWhereInput[]
    id?: StringFilter<"Exchange"> | string
    createdAt?: DateTimeFilter<"Exchange"> | Date | string
    updatedAt?: DateTimeFilter<"Exchange"> | Date | string
    fromCurrency?: EnumCurrencyTypeNullableFilter<"Exchange"> | $Enums.CurrencyType | null
    toCurrency?: EnumCurrencyTypeNullableFilter<"Exchange"> | $Enums.CurrencyType | null
    exchangeRate?: FloatNullableFilter<"Exchange"> | number | null
    amountFrom?: FloatNullableFilter<"Exchange"> | number | null
    amountTo?: FloatNullableFilter<"Exchange"> | number | null
    balanceUSDAfter?: FloatFilter<"Exchange"> | number
    balanceSYPAfter?: FloatFilter<"Exchange"> | number
    reportId?: StringNullableFilter<"Exchange"> | string | null
    storeId?: StringFilter<"Exchange"> | string
  }

  export type ReportUpsertWithWhereUniqueWithoutStoreInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutStoreInput, ReportUncheckedUpdateWithoutStoreInput>
    create: XOR<ReportCreateWithoutStoreInput, ReportUncheckedCreateWithoutStoreInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutStoreInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutStoreInput, ReportUncheckedUpdateWithoutStoreInput>
  }

  export type ReportUpdateManyWithWhereWithoutStoreInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutStoreInput>
  }

  export type ReportScalarWhereInput = {
    AND?: ReportScalarWhereInput | ReportScalarWhereInput[]
    OR?: ReportScalarWhereInput[]
    NOT?: ReportScalarWhereInput | ReportScalarWhereInput[]
    id?: StringFilter<"Report"> | string
    date?: DateTimeFilter<"Report"> | Date | string
    openingUSD?: FloatFilter<"Report"> | number
    closingUSD?: FloatFilter<"Report"> | number
    openingSYP?: FloatFilter<"Report"> | number
    closingSYP?: FloatFilter<"Report"> | number
    openingGold14?: FloatFilter<"Report"> | number
    closingGold14?: FloatFilter<"Report"> | number
    openingGold18?: FloatFilter<"Report"> | number
    closingGold18?: FloatFilter<"Report"> | number
    openingGold21?: FloatFilter<"Report"> | number
    closingGold21?: FloatFilter<"Report"> | number
    openingGold24?: FloatFilter<"Report"> | number
    closingGold24?: FloatFilter<"Report"> | number
    priceGold14USD?: FloatFilter<"Report"> | number
    priceGold18USD?: FloatFilter<"Report"> | number
    priceGold21USD?: FloatFilter<"Report"> | number
    priceGold24USD?: FloatFilter<"Report"> | number
    priceGold14SYP?: FloatFilter<"Report"> | number
    priceGold18SYP?: FloatFilter<"Report"> | number
    priceGold21SYP?: FloatFilter<"Report"> | number
    priceGold24SYP?: FloatFilter<"Report"> | number
    exchangeRateUSDtoSYP?: FloatFilter<"Report"> | number
    totalGoldSold?: FloatFilter<"Report"> | number
    totalSalesUSD?: FloatFilter<"Report"> | number
    totalSalesSYP?: FloatFilter<"Report"> | number
    profitUSD?: FloatFilter<"Report"> | number
    profitSYP?: FloatFilter<"Report"> | number
    notes?: StringNullableFilter<"Report"> | string | null
    status?: EnumDayStatusFilter<"Report"> | $Enums.DayStatus
    createdAt?: DateTimeFilter<"Report"> | Date | string
    storeId?: StringFilter<"Report"> | string
  }

  export type ReportCreateWithoutSalesInput = {
    id?: string
    date?: Date | string
    openingUSD?: number
    closingUSD?: number
    openingSYP?: number
    closingSYP?: number
    openingGold14?: number
    closingGold14?: number
    openingGold18?: number
    closingGold18?: number
    openingGold21?: number
    closingGold21?: number
    openingGold24?: number
    closingGold24?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    priceGold14SYP?: number
    priceGold18SYP?: number
    priceGold21SYP?: number
    priceGold24SYP?: number
    exchangeRateUSDtoSYP?: number
    totalGoldSold?: number
    totalSalesUSD?: number
    totalSalesSYP?: number
    profitUSD?: number
    profitSYP?: number
    notes?: string | null
    status?: $Enums.DayStatus
    createdAt?: Date | string
    store: StoreCreateNestedOneWithoutReportsInput
    stocks?: StockCreateNestedManyWithoutReportInput
    exchanges?: ExchangeCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutSalesInput = {
    id?: string
    date?: Date | string
    openingUSD?: number
    closingUSD?: number
    openingSYP?: number
    closingSYP?: number
    openingGold14?: number
    closingGold14?: number
    openingGold18?: number
    closingGold18?: number
    openingGold21?: number
    closingGold21?: number
    openingGold24?: number
    closingGold24?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    priceGold14SYP?: number
    priceGold18SYP?: number
    priceGold21SYP?: number
    priceGold24SYP?: number
    exchangeRateUSDtoSYP?: number
    totalGoldSold?: number
    totalSalesUSD?: number
    totalSalesSYP?: number
    profitUSD?: number
    profitSYP?: number
    notes?: string | null
    status?: $Enums.DayStatus
    createdAt?: Date | string
    storeId: string
    stocks?: StockUncheckedCreateNestedManyWithoutReportInput
    exchanges?: ExchangeUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutSalesInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutSalesInput, ReportUncheckedCreateWithoutSalesInput>
  }

  export type StoreCreateWithoutSalesInput = {
    id?: string
    name: string
    address?: string | null
    city?: string | null
    logoUrl?: string | null
    primaryPhoneNumber?: string | null
    secondaryPhoneNumber?: string | null
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    currentGold14?: number
    currentGold18?: number
    currentGold21?: number
    currentGold24?: number
    currentUSD?: number
    currentSYP?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    exchangeRateUSDtoSYP?: number
    owner: UserCreateNestedOneWithoutStoresInput
    stocks?: StockCreateNestedManyWithoutStoreInput
    exchanges?: ExchangeCreateNestedManyWithoutStoreInput
    reports?: ReportCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutSalesInput = {
    id?: string
    name: string
    address?: string | null
    city?: string | null
    logoUrl?: string | null
    primaryPhoneNumber?: string | null
    secondaryPhoneNumber?: string | null
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    currentGold14?: number
    currentGold18?: number
    currentGold21?: number
    currentGold24?: number
    currentUSD?: number
    currentSYP?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    exchangeRateUSDtoSYP?: number
    ownerId: string
    stocks?: StockUncheckedCreateNestedManyWithoutStoreInput
    exchanges?: ExchangeUncheckedCreateNestedManyWithoutStoreInput
    reports?: ReportUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutSalesInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutSalesInput, StoreUncheckedCreateWithoutSalesInput>
  }

  export type ReportUpsertWithoutSalesInput = {
    update: XOR<ReportUpdateWithoutSalesInput, ReportUncheckedUpdateWithoutSalesInput>
    create: XOR<ReportCreateWithoutSalesInput, ReportUncheckedCreateWithoutSalesInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutSalesInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutSalesInput, ReportUncheckedUpdateWithoutSalesInput>
  }

  export type ReportUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    openingUSD?: FloatFieldUpdateOperationsInput | number
    closingUSD?: FloatFieldUpdateOperationsInput | number
    openingSYP?: FloatFieldUpdateOperationsInput | number
    closingSYP?: FloatFieldUpdateOperationsInput | number
    openingGold14?: FloatFieldUpdateOperationsInput | number
    closingGold14?: FloatFieldUpdateOperationsInput | number
    openingGold18?: FloatFieldUpdateOperationsInput | number
    closingGold18?: FloatFieldUpdateOperationsInput | number
    openingGold21?: FloatFieldUpdateOperationsInput | number
    closingGold21?: FloatFieldUpdateOperationsInput | number
    openingGold24?: FloatFieldUpdateOperationsInput | number
    closingGold24?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    priceGold14SYP?: FloatFieldUpdateOperationsInput | number
    priceGold18SYP?: FloatFieldUpdateOperationsInput | number
    priceGold21SYP?: FloatFieldUpdateOperationsInput | number
    priceGold24SYP?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    totalGoldSold?: FloatFieldUpdateOperationsInput | number
    totalSalesUSD?: FloatFieldUpdateOperationsInput | number
    totalSalesSYP?: FloatFieldUpdateOperationsInput | number
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDayStatusFieldUpdateOperationsInput | $Enums.DayStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutReportsNestedInput
    stocks?: StockUpdateManyWithoutReportNestedInput
    exchanges?: ExchangeUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    openingUSD?: FloatFieldUpdateOperationsInput | number
    closingUSD?: FloatFieldUpdateOperationsInput | number
    openingSYP?: FloatFieldUpdateOperationsInput | number
    closingSYP?: FloatFieldUpdateOperationsInput | number
    openingGold14?: FloatFieldUpdateOperationsInput | number
    closingGold14?: FloatFieldUpdateOperationsInput | number
    openingGold18?: FloatFieldUpdateOperationsInput | number
    closingGold18?: FloatFieldUpdateOperationsInput | number
    openingGold21?: FloatFieldUpdateOperationsInput | number
    closingGold21?: FloatFieldUpdateOperationsInput | number
    openingGold24?: FloatFieldUpdateOperationsInput | number
    closingGold24?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    priceGold14SYP?: FloatFieldUpdateOperationsInput | number
    priceGold18SYP?: FloatFieldUpdateOperationsInput | number
    priceGold21SYP?: FloatFieldUpdateOperationsInput | number
    priceGold24SYP?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    totalGoldSold?: FloatFieldUpdateOperationsInput | number
    totalSalesUSD?: FloatFieldUpdateOperationsInput | number
    totalSalesSYP?: FloatFieldUpdateOperationsInput | number
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDayStatusFieldUpdateOperationsInput | $Enums.DayStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storeId?: StringFieldUpdateOperationsInput | string
    stocks?: StockUncheckedUpdateManyWithoutReportNestedInput
    exchanges?: ExchangeUncheckedUpdateManyWithoutReportNestedInput
  }

  export type StoreUpsertWithoutSalesInput = {
    update: XOR<StoreUpdateWithoutSalesInput, StoreUncheckedUpdateWithoutSalesInput>
    create: XOR<StoreCreateWithoutSalesInput, StoreUncheckedCreateWithoutSalesInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutSalesInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutSalesInput, StoreUncheckedUpdateWithoutSalesInput>
  }

  export type StoreUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentGold14?: FloatFieldUpdateOperationsInput | number
    currentGold18?: FloatFieldUpdateOperationsInput | number
    currentGold21?: FloatFieldUpdateOperationsInput | number
    currentGold24?: FloatFieldUpdateOperationsInput | number
    currentUSD?: FloatFieldUpdateOperationsInput | number
    currentSYP?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    owner?: UserUpdateOneRequiredWithoutStoresNestedInput
    stocks?: StockUpdateManyWithoutStoreNestedInput
    exchanges?: ExchangeUpdateManyWithoutStoreNestedInput
    reports?: ReportUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutSalesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentGold14?: FloatFieldUpdateOperationsInput | number
    currentGold18?: FloatFieldUpdateOperationsInput | number
    currentGold21?: FloatFieldUpdateOperationsInput | number
    currentGold24?: FloatFieldUpdateOperationsInput | number
    currentUSD?: FloatFieldUpdateOperationsInput | number
    currentSYP?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    ownerId?: StringFieldUpdateOperationsInput | string
    stocks?: StockUncheckedUpdateManyWithoutStoreNestedInput
    exchanges?: ExchangeUncheckedUpdateManyWithoutStoreNestedInput
    reports?: ReportUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type ReportCreateWithoutStocksInput = {
    id?: string
    date?: Date | string
    openingUSD?: number
    closingUSD?: number
    openingSYP?: number
    closingSYP?: number
    openingGold14?: number
    closingGold14?: number
    openingGold18?: number
    closingGold18?: number
    openingGold21?: number
    closingGold21?: number
    openingGold24?: number
    closingGold24?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    priceGold14SYP?: number
    priceGold18SYP?: number
    priceGold21SYP?: number
    priceGold24SYP?: number
    exchangeRateUSDtoSYP?: number
    totalGoldSold?: number
    totalSalesUSD?: number
    totalSalesSYP?: number
    profitUSD?: number
    profitSYP?: number
    notes?: string | null
    status?: $Enums.DayStatus
    createdAt?: Date | string
    store: StoreCreateNestedOneWithoutReportsInput
    sales?: SaleCreateNestedManyWithoutReportInput
    exchanges?: ExchangeCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutStocksInput = {
    id?: string
    date?: Date | string
    openingUSD?: number
    closingUSD?: number
    openingSYP?: number
    closingSYP?: number
    openingGold14?: number
    closingGold14?: number
    openingGold18?: number
    closingGold18?: number
    openingGold21?: number
    closingGold21?: number
    openingGold24?: number
    closingGold24?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    priceGold14SYP?: number
    priceGold18SYP?: number
    priceGold21SYP?: number
    priceGold24SYP?: number
    exchangeRateUSDtoSYP?: number
    totalGoldSold?: number
    totalSalesUSD?: number
    totalSalesSYP?: number
    profitUSD?: number
    profitSYP?: number
    notes?: string | null
    status?: $Enums.DayStatus
    createdAt?: Date | string
    storeId: string
    sales?: SaleUncheckedCreateNestedManyWithoutReportInput
    exchanges?: ExchangeUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutStocksInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutStocksInput, ReportUncheckedCreateWithoutStocksInput>
  }

  export type StoreCreateWithoutStocksInput = {
    id?: string
    name: string
    address?: string | null
    city?: string | null
    logoUrl?: string | null
    primaryPhoneNumber?: string | null
    secondaryPhoneNumber?: string | null
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    currentGold14?: number
    currentGold18?: number
    currentGold21?: number
    currentGold24?: number
    currentUSD?: number
    currentSYP?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    exchangeRateUSDtoSYP?: number
    owner: UserCreateNestedOneWithoutStoresInput
    sales?: SaleCreateNestedManyWithoutStoreInput
    exchanges?: ExchangeCreateNestedManyWithoutStoreInput
    reports?: ReportCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutStocksInput = {
    id?: string
    name: string
    address?: string | null
    city?: string | null
    logoUrl?: string | null
    primaryPhoneNumber?: string | null
    secondaryPhoneNumber?: string | null
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    currentGold14?: number
    currentGold18?: number
    currentGold21?: number
    currentGold24?: number
    currentUSD?: number
    currentSYP?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    exchangeRateUSDtoSYP?: number
    ownerId: string
    sales?: SaleUncheckedCreateNestedManyWithoutStoreInput
    exchanges?: ExchangeUncheckedCreateNestedManyWithoutStoreInput
    reports?: ReportUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutStocksInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutStocksInput, StoreUncheckedCreateWithoutStocksInput>
  }

  export type ReportUpsertWithoutStocksInput = {
    update: XOR<ReportUpdateWithoutStocksInput, ReportUncheckedUpdateWithoutStocksInput>
    create: XOR<ReportCreateWithoutStocksInput, ReportUncheckedCreateWithoutStocksInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutStocksInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutStocksInput, ReportUncheckedUpdateWithoutStocksInput>
  }

  export type ReportUpdateWithoutStocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    openingUSD?: FloatFieldUpdateOperationsInput | number
    closingUSD?: FloatFieldUpdateOperationsInput | number
    openingSYP?: FloatFieldUpdateOperationsInput | number
    closingSYP?: FloatFieldUpdateOperationsInput | number
    openingGold14?: FloatFieldUpdateOperationsInput | number
    closingGold14?: FloatFieldUpdateOperationsInput | number
    openingGold18?: FloatFieldUpdateOperationsInput | number
    closingGold18?: FloatFieldUpdateOperationsInput | number
    openingGold21?: FloatFieldUpdateOperationsInput | number
    closingGold21?: FloatFieldUpdateOperationsInput | number
    openingGold24?: FloatFieldUpdateOperationsInput | number
    closingGold24?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    priceGold14SYP?: FloatFieldUpdateOperationsInput | number
    priceGold18SYP?: FloatFieldUpdateOperationsInput | number
    priceGold21SYP?: FloatFieldUpdateOperationsInput | number
    priceGold24SYP?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    totalGoldSold?: FloatFieldUpdateOperationsInput | number
    totalSalesUSD?: FloatFieldUpdateOperationsInput | number
    totalSalesSYP?: FloatFieldUpdateOperationsInput | number
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDayStatusFieldUpdateOperationsInput | $Enums.DayStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutReportsNestedInput
    sales?: SaleUpdateManyWithoutReportNestedInput
    exchanges?: ExchangeUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutStocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    openingUSD?: FloatFieldUpdateOperationsInput | number
    closingUSD?: FloatFieldUpdateOperationsInput | number
    openingSYP?: FloatFieldUpdateOperationsInput | number
    closingSYP?: FloatFieldUpdateOperationsInput | number
    openingGold14?: FloatFieldUpdateOperationsInput | number
    closingGold14?: FloatFieldUpdateOperationsInput | number
    openingGold18?: FloatFieldUpdateOperationsInput | number
    closingGold18?: FloatFieldUpdateOperationsInput | number
    openingGold21?: FloatFieldUpdateOperationsInput | number
    closingGold21?: FloatFieldUpdateOperationsInput | number
    openingGold24?: FloatFieldUpdateOperationsInput | number
    closingGold24?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    priceGold14SYP?: FloatFieldUpdateOperationsInput | number
    priceGold18SYP?: FloatFieldUpdateOperationsInput | number
    priceGold21SYP?: FloatFieldUpdateOperationsInput | number
    priceGold24SYP?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    totalGoldSold?: FloatFieldUpdateOperationsInput | number
    totalSalesUSD?: FloatFieldUpdateOperationsInput | number
    totalSalesSYP?: FloatFieldUpdateOperationsInput | number
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDayStatusFieldUpdateOperationsInput | $Enums.DayStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storeId?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutReportNestedInput
    exchanges?: ExchangeUncheckedUpdateManyWithoutReportNestedInput
  }

  export type StoreUpsertWithoutStocksInput = {
    update: XOR<StoreUpdateWithoutStocksInput, StoreUncheckedUpdateWithoutStocksInput>
    create: XOR<StoreCreateWithoutStocksInput, StoreUncheckedCreateWithoutStocksInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutStocksInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutStocksInput, StoreUncheckedUpdateWithoutStocksInput>
  }

  export type StoreUpdateWithoutStocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentGold14?: FloatFieldUpdateOperationsInput | number
    currentGold18?: FloatFieldUpdateOperationsInput | number
    currentGold21?: FloatFieldUpdateOperationsInput | number
    currentGold24?: FloatFieldUpdateOperationsInput | number
    currentUSD?: FloatFieldUpdateOperationsInput | number
    currentSYP?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    owner?: UserUpdateOneRequiredWithoutStoresNestedInput
    sales?: SaleUpdateManyWithoutStoreNestedInput
    exchanges?: ExchangeUpdateManyWithoutStoreNestedInput
    reports?: ReportUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutStocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentGold14?: FloatFieldUpdateOperationsInput | number
    currentGold18?: FloatFieldUpdateOperationsInput | number
    currentGold21?: FloatFieldUpdateOperationsInput | number
    currentGold24?: FloatFieldUpdateOperationsInput | number
    currentUSD?: FloatFieldUpdateOperationsInput | number
    currentSYP?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    ownerId?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutStoreNestedInput
    exchanges?: ExchangeUncheckedUpdateManyWithoutStoreNestedInput
    reports?: ReportUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type ReportCreateWithoutExchangesInput = {
    id?: string
    date?: Date | string
    openingUSD?: number
    closingUSD?: number
    openingSYP?: number
    closingSYP?: number
    openingGold14?: number
    closingGold14?: number
    openingGold18?: number
    closingGold18?: number
    openingGold21?: number
    closingGold21?: number
    openingGold24?: number
    closingGold24?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    priceGold14SYP?: number
    priceGold18SYP?: number
    priceGold21SYP?: number
    priceGold24SYP?: number
    exchangeRateUSDtoSYP?: number
    totalGoldSold?: number
    totalSalesUSD?: number
    totalSalesSYP?: number
    profitUSD?: number
    profitSYP?: number
    notes?: string | null
    status?: $Enums.DayStatus
    createdAt?: Date | string
    store: StoreCreateNestedOneWithoutReportsInput
    sales?: SaleCreateNestedManyWithoutReportInput
    stocks?: StockCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutExchangesInput = {
    id?: string
    date?: Date | string
    openingUSD?: number
    closingUSD?: number
    openingSYP?: number
    closingSYP?: number
    openingGold14?: number
    closingGold14?: number
    openingGold18?: number
    closingGold18?: number
    openingGold21?: number
    closingGold21?: number
    openingGold24?: number
    closingGold24?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    priceGold14SYP?: number
    priceGold18SYP?: number
    priceGold21SYP?: number
    priceGold24SYP?: number
    exchangeRateUSDtoSYP?: number
    totalGoldSold?: number
    totalSalesUSD?: number
    totalSalesSYP?: number
    profitUSD?: number
    profitSYP?: number
    notes?: string | null
    status?: $Enums.DayStatus
    createdAt?: Date | string
    storeId: string
    sales?: SaleUncheckedCreateNestedManyWithoutReportInput
    stocks?: StockUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutExchangesInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutExchangesInput, ReportUncheckedCreateWithoutExchangesInput>
  }

  export type StoreCreateWithoutExchangesInput = {
    id?: string
    name: string
    address?: string | null
    city?: string | null
    logoUrl?: string | null
    primaryPhoneNumber?: string | null
    secondaryPhoneNumber?: string | null
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    currentGold14?: number
    currentGold18?: number
    currentGold21?: number
    currentGold24?: number
    currentUSD?: number
    currentSYP?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    exchangeRateUSDtoSYP?: number
    owner: UserCreateNestedOneWithoutStoresInput
    sales?: SaleCreateNestedManyWithoutStoreInput
    stocks?: StockCreateNestedManyWithoutStoreInput
    reports?: ReportCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutExchangesInput = {
    id?: string
    name: string
    address?: string | null
    city?: string | null
    logoUrl?: string | null
    primaryPhoneNumber?: string | null
    secondaryPhoneNumber?: string | null
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    currentGold14?: number
    currentGold18?: number
    currentGold21?: number
    currentGold24?: number
    currentUSD?: number
    currentSYP?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    exchangeRateUSDtoSYP?: number
    ownerId: string
    sales?: SaleUncheckedCreateNestedManyWithoutStoreInput
    stocks?: StockUncheckedCreateNestedManyWithoutStoreInput
    reports?: ReportUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutExchangesInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutExchangesInput, StoreUncheckedCreateWithoutExchangesInput>
  }

  export type ReportUpsertWithoutExchangesInput = {
    update: XOR<ReportUpdateWithoutExchangesInput, ReportUncheckedUpdateWithoutExchangesInput>
    create: XOR<ReportCreateWithoutExchangesInput, ReportUncheckedCreateWithoutExchangesInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutExchangesInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutExchangesInput, ReportUncheckedUpdateWithoutExchangesInput>
  }

  export type ReportUpdateWithoutExchangesInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    openingUSD?: FloatFieldUpdateOperationsInput | number
    closingUSD?: FloatFieldUpdateOperationsInput | number
    openingSYP?: FloatFieldUpdateOperationsInput | number
    closingSYP?: FloatFieldUpdateOperationsInput | number
    openingGold14?: FloatFieldUpdateOperationsInput | number
    closingGold14?: FloatFieldUpdateOperationsInput | number
    openingGold18?: FloatFieldUpdateOperationsInput | number
    closingGold18?: FloatFieldUpdateOperationsInput | number
    openingGold21?: FloatFieldUpdateOperationsInput | number
    closingGold21?: FloatFieldUpdateOperationsInput | number
    openingGold24?: FloatFieldUpdateOperationsInput | number
    closingGold24?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    priceGold14SYP?: FloatFieldUpdateOperationsInput | number
    priceGold18SYP?: FloatFieldUpdateOperationsInput | number
    priceGold21SYP?: FloatFieldUpdateOperationsInput | number
    priceGold24SYP?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    totalGoldSold?: FloatFieldUpdateOperationsInput | number
    totalSalesUSD?: FloatFieldUpdateOperationsInput | number
    totalSalesSYP?: FloatFieldUpdateOperationsInput | number
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDayStatusFieldUpdateOperationsInput | $Enums.DayStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutReportsNestedInput
    sales?: SaleUpdateManyWithoutReportNestedInput
    stocks?: StockUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutExchangesInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    openingUSD?: FloatFieldUpdateOperationsInput | number
    closingUSD?: FloatFieldUpdateOperationsInput | number
    openingSYP?: FloatFieldUpdateOperationsInput | number
    closingSYP?: FloatFieldUpdateOperationsInput | number
    openingGold14?: FloatFieldUpdateOperationsInput | number
    closingGold14?: FloatFieldUpdateOperationsInput | number
    openingGold18?: FloatFieldUpdateOperationsInput | number
    closingGold18?: FloatFieldUpdateOperationsInput | number
    openingGold21?: FloatFieldUpdateOperationsInput | number
    closingGold21?: FloatFieldUpdateOperationsInput | number
    openingGold24?: FloatFieldUpdateOperationsInput | number
    closingGold24?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    priceGold14SYP?: FloatFieldUpdateOperationsInput | number
    priceGold18SYP?: FloatFieldUpdateOperationsInput | number
    priceGold21SYP?: FloatFieldUpdateOperationsInput | number
    priceGold24SYP?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    totalGoldSold?: FloatFieldUpdateOperationsInput | number
    totalSalesUSD?: FloatFieldUpdateOperationsInput | number
    totalSalesSYP?: FloatFieldUpdateOperationsInput | number
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDayStatusFieldUpdateOperationsInput | $Enums.DayStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storeId?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutReportNestedInput
    stocks?: StockUncheckedUpdateManyWithoutReportNestedInput
  }

  export type StoreUpsertWithoutExchangesInput = {
    update: XOR<StoreUpdateWithoutExchangesInput, StoreUncheckedUpdateWithoutExchangesInput>
    create: XOR<StoreCreateWithoutExchangesInput, StoreUncheckedCreateWithoutExchangesInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutExchangesInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutExchangesInput, StoreUncheckedUpdateWithoutExchangesInput>
  }

  export type StoreUpdateWithoutExchangesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentGold14?: FloatFieldUpdateOperationsInput | number
    currentGold18?: FloatFieldUpdateOperationsInput | number
    currentGold21?: FloatFieldUpdateOperationsInput | number
    currentGold24?: FloatFieldUpdateOperationsInput | number
    currentUSD?: FloatFieldUpdateOperationsInput | number
    currentSYP?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    owner?: UserUpdateOneRequiredWithoutStoresNestedInput
    sales?: SaleUpdateManyWithoutStoreNestedInput
    stocks?: StockUpdateManyWithoutStoreNestedInput
    reports?: ReportUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutExchangesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentGold14?: FloatFieldUpdateOperationsInput | number
    currentGold18?: FloatFieldUpdateOperationsInput | number
    currentGold21?: FloatFieldUpdateOperationsInput | number
    currentGold24?: FloatFieldUpdateOperationsInput | number
    currentUSD?: FloatFieldUpdateOperationsInput | number
    currentSYP?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    ownerId?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutStoreNestedInput
    stocks?: StockUncheckedUpdateManyWithoutStoreNestedInput
    reports?: ReportUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type StoreCreateWithoutReportsInput = {
    id?: string
    name: string
    address?: string | null
    city?: string | null
    logoUrl?: string | null
    primaryPhoneNumber?: string | null
    secondaryPhoneNumber?: string | null
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    currentGold14?: number
    currentGold18?: number
    currentGold21?: number
    currentGold24?: number
    currentUSD?: number
    currentSYP?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    exchangeRateUSDtoSYP?: number
    owner: UserCreateNestedOneWithoutStoresInput
    sales?: SaleCreateNestedManyWithoutStoreInput
    stocks?: StockCreateNestedManyWithoutStoreInput
    exchanges?: ExchangeCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutReportsInput = {
    id?: string
    name: string
    address?: string | null
    city?: string | null
    logoUrl?: string | null
    primaryPhoneNumber?: string | null
    secondaryPhoneNumber?: string | null
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    currentGold14?: number
    currentGold18?: number
    currentGold21?: number
    currentGold24?: number
    currentUSD?: number
    currentSYP?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    exchangeRateUSDtoSYP?: number
    ownerId: string
    sales?: SaleUncheckedCreateNestedManyWithoutStoreInput
    stocks?: StockUncheckedCreateNestedManyWithoutStoreInput
    exchanges?: ExchangeUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutReportsInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutReportsInput, StoreUncheckedCreateWithoutReportsInput>
  }

  export type SaleCreateWithoutReportInput = {
    id?: string
    invoiceNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weight: number
    goldType: $Enums.GoldType
    pricePerGramUSD: number
    pricePerGramSYP: number
    totalUSD: number
    totalSYP: number
    currency: $Enums.CurrencyType
    paymentType: $Enums.PaymentType
    amountPaid: number
    customerName?: string | null
    customerPhone?: string | null
    description?: string | null
    profitUSD: number
    profitSYP: number
    store: StoreCreateNestedOneWithoutSalesInput
  }

  export type SaleUncheckedCreateWithoutReportInput = {
    id?: string
    invoiceNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weight: number
    goldType: $Enums.GoldType
    pricePerGramUSD: number
    pricePerGramSYP: number
    totalUSD: number
    totalSYP: number
    currency: $Enums.CurrencyType
    paymentType: $Enums.PaymentType
    amountPaid: number
    customerName?: string | null
    customerPhone?: string | null
    description?: string | null
    storeId: string
    profitUSD: number
    profitSYP: number
  }

  export type SaleCreateOrConnectWithoutReportInput = {
    where: SaleWhereUniqueInput
    create: XOR<SaleCreateWithoutReportInput, SaleUncheckedCreateWithoutReportInput>
  }

  export type SaleCreateManyReportInputEnvelope = {
    data: SaleCreateManyReportInput | SaleCreateManyReportInput[]
    skipDuplicates?: boolean
  }

  export type StockCreateWithoutReportInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    goldType: $Enums.GoldType
    quantity: number
    type: $Enums.StockType
    balanceAfter: number
    costPerGramUSD?: number | null
    totalCostUSD?: number | null
    totalCostSYP?: number | null
    supplier?: string | null
    invoiceRef?: string | null
    note?: string | null
    store: StoreCreateNestedOneWithoutStocksInput
  }

  export type StockUncheckedCreateWithoutReportInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    goldType: $Enums.GoldType
    quantity: number
    type: $Enums.StockType
    balanceAfter: number
    costPerGramUSD?: number | null
    totalCostUSD?: number | null
    totalCostSYP?: number | null
    supplier?: string | null
    invoiceRef?: string | null
    note?: string | null
    storeId: string
  }

  export type StockCreateOrConnectWithoutReportInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutReportInput, StockUncheckedCreateWithoutReportInput>
  }

  export type StockCreateManyReportInputEnvelope = {
    data: StockCreateManyReportInput | StockCreateManyReportInput[]
    skipDuplicates?: boolean
  }

  export type ExchangeCreateWithoutReportInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fromCurrency?: $Enums.CurrencyType | null
    toCurrency?: $Enums.CurrencyType | null
    exchangeRate?: number | null
    amountFrom?: number | null
    amountTo?: number | null
    balanceUSDAfter: number
    balanceSYPAfter: number
    store: StoreCreateNestedOneWithoutExchangesInput
  }

  export type ExchangeUncheckedCreateWithoutReportInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fromCurrency?: $Enums.CurrencyType | null
    toCurrency?: $Enums.CurrencyType | null
    exchangeRate?: number | null
    amountFrom?: number | null
    amountTo?: number | null
    balanceUSDAfter: number
    balanceSYPAfter: number
    storeId: string
  }

  export type ExchangeCreateOrConnectWithoutReportInput = {
    where: ExchangeWhereUniqueInput
    create: XOR<ExchangeCreateWithoutReportInput, ExchangeUncheckedCreateWithoutReportInput>
  }

  export type ExchangeCreateManyReportInputEnvelope = {
    data: ExchangeCreateManyReportInput | ExchangeCreateManyReportInput[]
    skipDuplicates?: boolean
  }

  export type StoreUpsertWithoutReportsInput = {
    update: XOR<StoreUpdateWithoutReportsInput, StoreUncheckedUpdateWithoutReportsInput>
    create: XOR<StoreCreateWithoutReportsInput, StoreUncheckedCreateWithoutReportsInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutReportsInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutReportsInput, StoreUncheckedUpdateWithoutReportsInput>
  }

  export type StoreUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentGold14?: FloatFieldUpdateOperationsInput | number
    currentGold18?: FloatFieldUpdateOperationsInput | number
    currentGold21?: FloatFieldUpdateOperationsInput | number
    currentGold24?: FloatFieldUpdateOperationsInput | number
    currentUSD?: FloatFieldUpdateOperationsInput | number
    currentSYP?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    owner?: UserUpdateOneRequiredWithoutStoresNestedInput
    sales?: SaleUpdateManyWithoutStoreNestedInput
    stocks?: StockUpdateManyWithoutStoreNestedInput
    exchanges?: ExchangeUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentGold14?: FloatFieldUpdateOperationsInput | number
    currentGold18?: FloatFieldUpdateOperationsInput | number
    currentGold21?: FloatFieldUpdateOperationsInput | number
    currentGold24?: FloatFieldUpdateOperationsInput | number
    currentUSD?: FloatFieldUpdateOperationsInput | number
    currentSYP?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    ownerId?: StringFieldUpdateOperationsInput | string
    sales?: SaleUncheckedUpdateManyWithoutStoreNestedInput
    stocks?: StockUncheckedUpdateManyWithoutStoreNestedInput
    exchanges?: ExchangeUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type SaleUpsertWithWhereUniqueWithoutReportInput = {
    where: SaleWhereUniqueInput
    update: XOR<SaleUpdateWithoutReportInput, SaleUncheckedUpdateWithoutReportInput>
    create: XOR<SaleCreateWithoutReportInput, SaleUncheckedCreateWithoutReportInput>
  }

  export type SaleUpdateWithWhereUniqueWithoutReportInput = {
    where: SaleWhereUniqueInput
    data: XOR<SaleUpdateWithoutReportInput, SaleUncheckedUpdateWithoutReportInput>
  }

  export type SaleUpdateManyWithWhereWithoutReportInput = {
    where: SaleScalarWhereInput
    data: XOR<SaleUpdateManyMutationInput, SaleUncheckedUpdateManyWithoutReportInput>
  }

  export type StockUpsertWithWhereUniqueWithoutReportInput = {
    where: StockWhereUniqueInput
    update: XOR<StockUpdateWithoutReportInput, StockUncheckedUpdateWithoutReportInput>
    create: XOR<StockCreateWithoutReportInput, StockUncheckedCreateWithoutReportInput>
  }

  export type StockUpdateWithWhereUniqueWithoutReportInput = {
    where: StockWhereUniqueInput
    data: XOR<StockUpdateWithoutReportInput, StockUncheckedUpdateWithoutReportInput>
  }

  export type StockUpdateManyWithWhereWithoutReportInput = {
    where: StockScalarWhereInput
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyWithoutReportInput>
  }

  export type ExchangeUpsertWithWhereUniqueWithoutReportInput = {
    where: ExchangeWhereUniqueInput
    update: XOR<ExchangeUpdateWithoutReportInput, ExchangeUncheckedUpdateWithoutReportInput>
    create: XOR<ExchangeCreateWithoutReportInput, ExchangeUncheckedCreateWithoutReportInput>
  }

  export type ExchangeUpdateWithWhereUniqueWithoutReportInput = {
    where: ExchangeWhereUniqueInput
    data: XOR<ExchangeUpdateWithoutReportInput, ExchangeUncheckedUpdateWithoutReportInput>
  }

  export type ExchangeUpdateManyWithWhereWithoutReportInput = {
    where: ExchangeScalarWhereInput
    data: XOR<ExchangeUpdateManyMutationInput, ExchangeUncheckedUpdateManyWithoutReportInput>
  }

  export type StoreCreateManyOwnerInput = {
    id?: string
    name: string
    address?: string | null
    city?: string | null
    logoUrl?: string | null
    primaryPhoneNumber?: string | null
    secondaryPhoneNumber?: string | null
    status?: $Enums.StoreStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    currentGold14?: number
    currentGold18?: number
    currentGold21?: number
    currentGold24?: number
    currentUSD?: number
    currentSYP?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    exchangeRateUSDtoSYP?: number
  }

  export type StoreUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentGold14?: FloatFieldUpdateOperationsInput | number
    currentGold18?: FloatFieldUpdateOperationsInput | number
    currentGold21?: FloatFieldUpdateOperationsInput | number
    currentGold24?: FloatFieldUpdateOperationsInput | number
    currentUSD?: FloatFieldUpdateOperationsInput | number
    currentSYP?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    sales?: SaleUpdateManyWithoutStoreNestedInput
    stocks?: StockUpdateManyWithoutStoreNestedInput
    exchanges?: ExchangeUpdateManyWithoutStoreNestedInput
    reports?: ReportUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentGold14?: FloatFieldUpdateOperationsInput | number
    currentGold18?: FloatFieldUpdateOperationsInput | number
    currentGold21?: FloatFieldUpdateOperationsInput | number
    currentGold24?: FloatFieldUpdateOperationsInput | number
    currentUSD?: FloatFieldUpdateOperationsInput | number
    currentSYP?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    sales?: SaleUncheckedUpdateManyWithoutStoreNestedInput
    stocks?: StockUncheckedUpdateManyWithoutStoreNestedInput
    exchanges?: ExchangeUncheckedUpdateManyWithoutStoreNestedInput
    reports?: ReportUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryPhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentGold14?: FloatFieldUpdateOperationsInput | number
    currentGold18?: FloatFieldUpdateOperationsInput | number
    currentGold21?: FloatFieldUpdateOperationsInput | number
    currentGold24?: FloatFieldUpdateOperationsInput | number
    currentUSD?: FloatFieldUpdateOperationsInput | number
    currentSYP?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
  }

  export type SaleCreateManyStoreInput = {
    id?: string
    invoiceNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weight: number
    goldType: $Enums.GoldType
    pricePerGramUSD: number
    pricePerGramSYP: number
    totalUSD: number
    totalSYP: number
    currency: $Enums.CurrencyType
    paymentType: $Enums.PaymentType
    amountPaid: number
    customerName?: string | null
    customerPhone?: string | null
    description?: string | null
    reportId?: string | null
    profitUSD: number
    profitSYP: number
  }

  export type StockCreateManyStoreInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    goldType: $Enums.GoldType
    quantity: number
    type: $Enums.StockType
    balanceAfter: number
    costPerGramUSD?: number | null
    totalCostUSD?: number | null
    totalCostSYP?: number | null
    supplier?: string | null
    invoiceRef?: string | null
    note?: string | null
    reportId?: string | null
  }

  export type ExchangeCreateManyStoreInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fromCurrency?: $Enums.CurrencyType | null
    toCurrency?: $Enums.CurrencyType | null
    exchangeRate?: number | null
    amountFrom?: number | null
    amountTo?: number | null
    balanceUSDAfter: number
    balanceSYPAfter: number
    reportId?: string | null
  }

  export type ReportCreateManyStoreInput = {
    id?: string
    date?: Date | string
    openingUSD?: number
    closingUSD?: number
    openingSYP?: number
    closingSYP?: number
    openingGold14?: number
    closingGold14?: number
    openingGold18?: number
    closingGold18?: number
    openingGold21?: number
    closingGold21?: number
    openingGold24?: number
    closingGold24?: number
    priceGold14USD?: number
    priceGold18USD?: number
    priceGold21USD?: number
    priceGold24USD?: number
    priceGold14SYP?: number
    priceGold18SYP?: number
    priceGold21SYP?: number
    priceGold24SYP?: number
    exchangeRateUSDtoSYP?: number
    totalGoldSold?: number
    totalSalesUSD?: number
    totalSalesSYP?: number
    profitUSD?: number
    profitSYP?: number
    notes?: string | null
    status?: $Enums.DayStatus
    createdAt?: Date | string
  }

  export type SaleUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    pricePerGramUSD?: FloatFieldUpdateOperationsInput | number
    pricePerGramSYP?: FloatFieldUpdateOperationsInput | number
    totalUSD?: FloatFieldUpdateOperationsInput | number
    totalSYP?: FloatFieldUpdateOperationsInput | number
    currency?: EnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    amountPaid?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    report?: ReportUpdateOneWithoutSalesNestedInput
  }

  export type SaleUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    pricePerGramUSD?: FloatFieldUpdateOperationsInput | number
    pricePerGramSYP?: FloatFieldUpdateOperationsInput | number
    totalUSD?: FloatFieldUpdateOperationsInput | number
    totalSYP?: FloatFieldUpdateOperationsInput | number
    currency?: EnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    amountPaid?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
  }

  export type SaleUncheckedUpdateManyWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    pricePerGramUSD?: FloatFieldUpdateOperationsInput | number
    pricePerGramSYP?: FloatFieldUpdateOperationsInput | number
    totalUSD?: FloatFieldUpdateOperationsInput | number
    totalSYP?: FloatFieldUpdateOperationsInput | number
    currency?: EnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    amountPaid?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
  }

  export type StockUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    quantity?: FloatFieldUpdateOperationsInput | number
    type?: EnumStockTypeFieldUpdateOperationsInput | $Enums.StockType
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    costPerGramUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostSYP?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    report?: ReportUpdateOneWithoutStocksNestedInput
  }

  export type StockUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    quantity?: FloatFieldUpdateOperationsInput | number
    type?: EnumStockTypeFieldUpdateOperationsInput | $Enums.StockType
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    costPerGramUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostSYP?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StockUncheckedUpdateManyWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    quantity?: FloatFieldUpdateOperationsInput | number
    type?: EnumStockTypeFieldUpdateOperationsInput | $Enums.StockType
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    costPerGramUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostSYP?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExchangeUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    toCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    exchangeRate?: NullableFloatFieldUpdateOperationsInput | number | null
    amountFrom?: NullableFloatFieldUpdateOperationsInput | number | null
    amountTo?: NullableFloatFieldUpdateOperationsInput | number | null
    balanceUSDAfter?: FloatFieldUpdateOperationsInput | number
    balanceSYPAfter?: FloatFieldUpdateOperationsInput | number
    report?: ReportUpdateOneWithoutExchangesNestedInput
  }

  export type ExchangeUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    toCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    exchangeRate?: NullableFloatFieldUpdateOperationsInput | number | null
    amountFrom?: NullableFloatFieldUpdateOperationsInput | number | null
    amountTo?: NullableFloatFieldUpdateOperationsInput | number | null
    balanceUSDAfter?: FloatFieldUpdateOperationsInput | number
    balanceSYPAfter?: FloatFieldUpdateOperationsInput | number
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExchangeUncheckedUpdateManyWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    toCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    exchangeRate?: NullableFloatFieldUpdateOperationsInput | number | null
    amountFrom?: NullableFloatFieldUpdateOperationsInput | number | null
    amountTo?: NullableFloatFieldUpdateOperationsInput | number | null
    balanceUSDAfter?: FloatFieldUpdateOperationsInput | number
    balanceSYPAfter?: FloatFieldUpdateOperationsInput | number
    reportId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    openingUSD?: FloatFieldUpdateOperationsInput | number
    closingUSD?: FloatFieldUpdateOperationsInput | number
    openingSYP?: FloatFieldUpdateOperationsInput | number
    closingSYP?: FloatFieldUpdateOperationsInput | number
    openingGold14?: FloatFieldUpdateOperationsInput | number
    closingGold14?: FloatFieldUpdateOperationsInput | number
    openingGold18?: FloatFieldUpdateOperationsInput | number
    closingGold18?: FloatFieldUpdateOperationsInput | number
    openingGold21?: FloatFieldUpdateOperationsInput | number
    closingGold21?: FloatFieldUpdateOperationsInput | number
    openingGold24?: FloatFieldUpdateOperationsInput | number
    closingGold24?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    priceGold14SYP?: FloatFieldUpdateOperationsInput | number
    priceGold18SYP?: FloatFieldUpdateOperationsInput | number
    priceGold21SYP?: FloatFieldUpdateOperationsInput | number
    priceGold24SYP?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    totalGoldSold?: FloatFieldUpdateOperationsInput | number
    totalSalesUSD?: FloatFieldUpdateOperationsInput | number
    totalSalesSYP?: FloatFieldUpdateOperationsInput | number
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDayStatusFieldUpdateOperationsInput | $Enums.DayStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUpdateManyWithoutReportNestedInput
    stocks?: StockUpdateManyWithoutReportNestedInput
    exchanges?: ExchangeUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    openingUSD?: FloatFieldUpdateOperationsInput | number
    closingUSD?: FloatFieldUpdateOperationsInput | number
    openingSYP?: FloatFieldUpdateOperationsInput | number
    closingSYP?: FloatFieldUpdateOperationsInput | number
    openingGold14?: FloatFieldUpdateOperationsInput | number
    closingGold14?: FloatFieldUpdateOperationsInput | number
    openingGold18?: FloatFieldUpdateOperationsInput | number
    closingGold18?: FloatFieldUpdateOperationsInput | number
    openingGold21?: FloatFieldUpdateOperationsInput | number
    closingGold21?: FloatFieldUpdateOperationsInput | number
    openingGold24?: FloatFieldUpdateOperationsInput | number
    closingGold24?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    priceGold14SYP?: FloatFieldUpdateOperationsInput | number
    priceGold18SYP?: FloatFieldUpdateOperationsInput | number
    priceGold21SYP?: FloatFieldUpdateOperationsInput | number
    priceGold24SYP?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    totalGoldSold?: FloatFieldUpdateOperationsInput | number
    totalSalesUSD?: FloatFieldUpdateOperationsInput | number
    totalSalesSYP?: FloatFieldUpdateOperationsInput | number
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDayStatusFieldUpdateOperationsInput | $Enums.DayStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sales?: SaleUncheckedUpdateManyWithoutReportNestedInput
    stocks?: StockUncheckedUpdateManyWithoutReportNestedInput
    exchanges?: ExchangeUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateManyWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    openingUSD?: FloatFieldUpdateOperationsInput | number
    closingUSD?: FloatFieldUpdateOperationsInput | number
    openingSYP?: FloatFieldUpdateOperationsInput | number
    closingSYP?: FloatFieldUpdateOperationsInput | number
    openingGold14?: FloatFieldUpdateOperationsInput | number
    closingGold14?: FloatFieldUpdateOperationsInput | number
    openingGold18?: FloatFieldUpdateOperationsInput | number
    closingGold18?: FloatFieldUpdateOperationsInput | number
    openingGold21?: FloatFieldUpdateOperationsInput | number
    closingGold21?: FloatFieldUpdateOperationsInput | number
    openingGold24?: FloatFieldUpdateOperationsInput | number
    closingGold24?: FloatFieldUpdateOperationsInput | number
    priceGold14USD?: FloatFieldUpdateOperationsInput | number
    priceGold18USD?: FloatFieldUpdateOperationsInput | number
    priceGold21USD?: FloatFieldUpdateOperationsInput | number
    priceGold24USD?: FloatFieldUpdateOperationsInput | number
    priceGold14SYP?: FloatFieldUpdateOperationsInput | number
    priceGold18SYP?: FloatFieldUpdateOperationsInput | number
    priceGold21SYP?: FloatFieldUpdateOperationsInput | number
    priceGold24SYP?: FloatFieldUpdateOperationsInput | number
    exchangeRateUSDtoSYP?: FloatFieldUpdateOperationsInput | number
    totalGoldSold?: FloatFieldUpdateOperationsInput | number
    totalSalesUSD?: FloatFieldUpdateOperationsInput | number
    totalSalesSYP?: FloatFieldUpdateOperationsInput | number
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDayStatusFieldUpdateOperationsInput | $Enums.DayStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SaleCreateManyReportInput = {
    id?: string
    invoiceNumber: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weight: number
    goldType: $Enums.GoldType
    pricePerGramUSD: number
    pricePerGramSYP: number
    totalUSD: number
    totalSYP: number
    currency: $Enums.CurrencyType
    paymentType: $Enums.PaymentType
    amountPaid: number
    customerName?: string | null
    customerPhone?: string | null
    description?: string | null
    storeId: string
    profitUSD: number
    profitSYP: number
  }

  export type StockCreateManyReportInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    goldType: $Enums.GoldType
    quantity: number
    type: $Enums.StockType
    balanceAfter: number
    costPerGramUSD?: number | null
    totalCostUSD?: number | null
    totalCostSYP?: number | null
    supplier?: string | null
    invoiceRef?: string | null
    note?: string | null
    storeId: string
  }

  export type ExchangeCreateManyReportInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fromCurrency?: $Enums.CurrencyType | null
    toCurrency?: $Enums.CurrencyType | null
    exchangeRate?: number | null
    amountFrom?: number | null
    amountTo?: number | null
    balanceUSDAfter: number
    balanceSYPAfter: number
    storeId: string
  }

  export type SaleUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    pricePerGramUSD?: FloatFieldUpdateOperationsInput | number
    pricePerGramSYP?: FloatFieldUpdateOperationsInput | number
    totalUSD?: FloatFieldUpdateOperationsInput | number
    totalSYP?: FloatFieldUpdateOperationsInput | number
    currency?: EnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    amountPaid?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
    store?: StoreUpdateOneRequiredWithoutSalesNestedInput
  }

  export type SaleUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    pricePerGramUSD?: FloatFieldUpdateOperationsInput | number
    pricePerGramSYP?: FloatFieldUpdateOperationsInput | number
    totalUSD?: FloatFieldUpdateOperationsInput | number
    totalSYP?: FloatFieldUpdateOperationsInput | number
    currency?: EnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    amountPaid?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    storeId?: StringFieldUpdateOperationsInput | string
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
  }

  export type SaleUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    invoiceNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: FloatFieldUpdateOperationsInput | number
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    pricePerGramUSD?: FloatFieldUpdateOperationsInput | number
    pricePerGramSYP?: FloatFieldUpdateOperationsInput | number
    totalUSD?: FloatFieldUpdateOperationsInput | number
    totalSYP?: FloatFieldUpdateOperationsInput | number
    currency?: EnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    amountPaid?: FloatFieldUpdateOperationsInput | number
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    storeId?: StringFieldUpdateOperationsInput | string
    profitUSD?: FloatFieldUpdateOperationsInput | number
    profitSYP?: FloatFieldUpdateOperationsInput | number
  }

  export type StockUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    quantity?: FloatFieldUpdateOperationsInput | number
    type?: EnumStockTypeFieldUpdateOperationsInput | $Enums.StockType
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    costPerGramUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostSYP?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    store?: StoreUpdateOneRequiredWithoutStocksNestedInput
  }

  export type StockUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    quantity?: FloatFieldUpdateOperationsInput | number
    type?: EnumStockTypeFieldUpdateOperationsInput | $Enums.StockType
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    costPerGramUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostSYP?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    storeId?: StringFieldUpdateOperationsInput | string
  }

  export type StockUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    goldType?: EnumGoldTypeFieldUpdateOperationsInput | $Enums.GoldType
    quantity?: FloatFieldUpdateOperationsInput | number
    type?: EnumStockTypeFieldUpdateOperationsInput | $Enums.StockType
    balanceAfter?: FloatFieldUpdateOperationsInput | number
    costPerGramUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostUSD?: NullableFloatFieldUpdateOperationsInput | number | null
    totalCostSYP?: NullableFloatFieldUpdateOperationsInput | number | null
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    storeId?: StringFieldUpdateOperationsInput | string
  }

  export type ExchangeUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    toCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    exchangeRate?: NullableFloatFieldUpdateOperationsInput | number | null
    amountFrom?: NullableFloatFieldUpdateOperationsInput | number | null
    amountTo?: NullableFloatFieldUpdateOperationsInput | number | null
    balanceUSDAfter?: FloatFieldUpdateOperationsInput | number
    balanceSYPAfter?: FloatFieldUpdateOperationsInput | number
    store?: StoreUpdateOneRequiredWithoutExchangesNestedInput
  }

  export type ExchangeUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    toCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    exchangeRate?: NullableFloatFieldUpdateOperationsInput | number | null
    amountFrom?: NullableFloatFieldUpdateOperationsInput | number | null
    amountTo?: NullableFloatFieldUpdateOperationsInput | number | null
    balanceUSDAfter?: FloatFieldUpdateOperationsInput | number
    balanceSYPAfter?: FloatFieldUpdateOperationsInput | number
    storeId?: StringFieldUpdateOperationsInput | string
  }

  export type ExchangeUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    toCurrency?: NullableEnumCurrencyTypeFieldUpdateOperationsInput | $Enums.CurrencyType | null
    exchangeRate?: NullableFloatFieldUpdateOperationsInput | number | null
    amountFrom?: NullableFloatFieldUpdateOperationsInput | number | null
    amountTo?: NullableFloatFieldUpdateOperationsInput | number | null
    balanceUSDAfter?: FloatFieldUpdateOperationsInput | number
    balanceSYPAfter?: FloatFieldUpdateOperationsInput | number
    storeId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}