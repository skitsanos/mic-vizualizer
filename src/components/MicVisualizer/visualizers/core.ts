export interface VisualizationParams
{
    ctx: CanvasRenderingContext2D;
    dataArray: Uint8Array;
    bufferLength: number;
    canvas: HTMLCanvasElement;
    volume: number;
}

export type VisualizerFunction = (params: VisualizationParams) => void;

export type VisualizationType = 'bars' | 'wave' | 'spiral' | 'particles' | 'frequencySpectrum' | 'circularWaveform' | 'radialWave';