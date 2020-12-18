export class AppConfig {
    private static localPath = 'http://localhost:3000';
    private static hostPath = 'https://cabpooltaxi.herokuapp.com';

    public static getLocalPath(): string {
        return AppConfig.localPath;
    }

    public static getHostPath(): string {
        return AppConfig.hostPath;
    }
}
