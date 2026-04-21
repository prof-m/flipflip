export default class WebcamManager {
  private static cachedStream: MediaStream | null = null;
  private static streamRequests: number = 0;

  public static async requestWebcam(): Promise<MediaStream> {
    this.streamRequests++;
    if (this.cachedStream) {
      return this.cachedStream;
    }
    try {
      this.cachedStream = await navigator.mediaDevices.getUserMedia({ video: true });
      return this.cachedStream;
    } catch (error) {
      this.streamRequests--;
      throw error;
    }
  }

  public static releaseWebcam() {
    this.streamRequests--;
    if (this.streamRequests <= 0) {
      this.streamRequests = 0;
      if (this.cachedStream) {
        this.cachedStream.getTracks().forEach((track) => track.stop());
        this.cachedStream = null;
      }
    }
  }
}
