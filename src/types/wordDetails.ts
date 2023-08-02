export interface DictionaryEntry {
  meta: {
    id: string;
    uuid: string;
    src: string;
    section: string;
    stems: string[];
    offensive: boolean;
  };
  hwi: {
    hw: string;
    prs: {
      mw: string;
      sound: {
        audio: string;
      };
    }[];
  };
  fl: string;
  def: {
    sseq: [
      [
        [
          string,
          {
            sn: string;
            dt: [string, string][];
            lbs?: string[];
          }
        ]
      ]
    ];
  }[];
  et: [string, string][];
  shortdef: string[];
}