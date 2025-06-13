export type DB_DRIVER_TYPE = 'orm' | 'in-memory'
export type CACHE_DRIVER_TYPE = 'in-memory' | 'redis' | 'nest'

export interface ApplicationBootstrapOptions {
    DBdriver: DB_DRIVER_TYPE
    cacheDriver: CACHE_DRIVER_TYPE
}
