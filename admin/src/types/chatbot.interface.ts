export interface ChatNode {
  language: Language[];
  name: null | string;
}

export interface Language {
  buttons: any[];
  conditions: any[];
  lang: string;
  regex: string;
  text: string;
}
