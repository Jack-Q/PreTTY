export interface ISshHostServer {
  id: string;
  title: string;
  hostAddress: string;
  publicKey: string;
  keyTrusted: boolean;
}
