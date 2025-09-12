export default class AssetManager {
    private static instance: AssetManager;
    private assets: Map<string, HTMLImageElement> = new Map();

    private constructor() {}

    public static getInstance(): AssetManager {
        if (!AssetManager.instance) {
            AssetManager.instance = new AssetManager();
        }
        return AssetManager.instance;
    }

    public loadImage(name: string, src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                this.assets.set(name, img);
                resolve(img);
            };
            img.onerror = () => reject(`Error loading image: ${src}`);
        });
    }

    public async loadAll(images: Record<string, string>): Promise<void> {
        const promises: Promise<HTMLImageElement>[] = [];

        for (const [name, src] of Object.entries(images)) {
            promises.push(this.loadImage(name, src));
        }

        await Promise.all(promises);
    }

    public get(name: string): HTMLImageElement {
        const asset = this.assets.get(name);
        if (!asset) {
            throw new Error(`Resource '${name}' has not been found.`);
        }
        return asset;
    }
}