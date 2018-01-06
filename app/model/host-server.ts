export interface ISshHostServer {
  id: string;
  title: string;
  hostAddress: string;
  hostPort: number;
  publicKey: string;
  keyTrusted: boolean;
}
