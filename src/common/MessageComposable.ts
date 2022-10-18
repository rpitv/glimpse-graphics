export class MessageComposable {

	public channel: string;
	public namespace: string;

	public constructor(channel: string, namespace?: string) {
		this.channel = channel;
		this.namespace = namespace ?? "";
	}

	public async send(argument?: any): Promise<any> {
		// @ts-ignore
		return await nodecg.sendMessage(this.namespace + '.' + this.channel, argument);
	}

	public listen(callback: (argument?: any, ack?: (returnVal: any) => void) => void): void {
		// @ts-ignore
		nodecg.listenFor(this.namespace + '.' + this.channel, callback)
	}
}
