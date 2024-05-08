export interface CaesarCipherProps {
  caesarkey: number;
  phrase: string;
}
export interface KeywordProps {
  keyword: string;
  phrase: string;
}

export interface SubstitutionProps {
  phrase: string;
}

export abstract class Cipher {
  static displayName: string;
  abstract encode(
    props: CaesarCipherProps | KeywordProps | SubstitutionProps
  ): string;
  abstract decode(
    props: CaesarCipherProps | KeywordProps | SubstitutionProps
  ): string;
  abstract type: CipherType;
}

export enum CipherType {
  Caesar = 'caesar',
  Keyword = 'keyword',
  Substitution = 'substitution'
}
