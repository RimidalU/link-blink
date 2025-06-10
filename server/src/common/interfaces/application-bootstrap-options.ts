export type DRIVER_TYPE = 'orm' | 'in-memory'

export interface ApplicationBootstrapOptions {
    driver: DRIVER_TYPE
}
