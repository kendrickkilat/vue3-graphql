export interface SearchOptions {
    query: string,
    limit: number | null,
    after: string | null,
    before: string | null,
}

export interface UserOptions {
    login: string,
    after: string | null,
    before: string | null,
    start: number | null,
    last: number | null,
}
