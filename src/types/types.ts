export interface Account {
  id: number,
  metka: { text: string }[],
  type: string,
  login: string,
  password: string | null,
}
