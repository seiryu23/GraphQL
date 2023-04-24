export type Payload = {
    email: string;
    sub : number;
    iat: number;        //トークンが作成されたタイミング
    exp: number;        //トークン利用可能期間
}